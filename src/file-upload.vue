<template>
  <div class="fc-file-upload">
    <template v-if="isReady">
      <form enctype="multipart/form-data">
        <div>업로드할 파일을 끌어다 놓거나<br>찾아보기 버튼을 누르세요.</div>
        <input type="file" :name="name" :accept="accept" @change="upload($event.target.files)">
      </form>
    </template>
    <template v-if="isUploading">
      <div>업로드 중...</div>
      <button type="button" @click="cancel">취소</button>
    </template>
    <template v-if="isError">
      <div>업로드 실패</div>
      <button type="button" @click="cancel">취소</button>
    </template>
    <template v-if="isUploaded">
      <div>업로드 완료</div>
      <button type="button" @click="cancel">취소</button>
    </template>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    name: String,
    accept: String
  },
  data: function() {
    return {
      assetId: null,
      assetUrl: null
    };
  },
  computed: {
    isReady: function() {
      return !this.assetId && !this.assetUrl;
    },
    isUploading: function() {
      return this.assetId && !this.assetUrl;
    },
    isError: function() {
      return this.assetId && this.assetUrl === 'ERROR';
    },
    isUploaded: function() {
      return this.assetId && this.assetUrl;
    }
  },
  methods: {
    upload: function(files) {
      // TODO: robust & secure way! plugin?
      // TODO: support multi upload
      if (files.length !== 1) {
        return;
      }
      const file = files[0];
      const asset = {
        alias: 'uploads/composer/' + file.name,
        mimeType: file.type,
        size: file.size
      };
      // step1: create asset id with signed url
      axios
        .post('/api/v2/assets', asset)
        .then(res1 => {
          console.log('upload step1 ok: ', res1);
          this.assetId = res1.data.id;
          this.assetUrl = null;
          // step2: direct upload with signed url
          return axios
            .put(res1.data.signedUrl, file, {
              headers: {
                'content-type': file.type
              }
            })
            .then(res2 => {
              console.log('upload step2 ok: ', res2);
              this.assetUrl = res1.data.url;
              this.$emit('upload', this.name, this.assetUrl);
            });
        })
        .catch(err => {
          this.assetUrl = 'ERROR';
          console.error('upload error:', err);
        });
    },
    cancel: function() {
      if (typeof this.assetId === 'number') {
        axios.delete(`/api/v2/assets/${this.assetId}`);
      }
      // 삭제 요청이 성공하던 실패하던 상관없이...
      this.assetId = null;
      this.assetUrl = null;
    }
  }
};
</script>

<style lang="scss" scoped>
.fc-file-upload {
  display: flex;

  > div {
    flex: 1 1 0;
  }

  > button {
    flex: 0 0 5rem;
    width: 5rem;
  }

  > form {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    > div {
      padding: 1rem;
      border: 2px dotted darkgray;
      background: lightgray;
    }
  }
}
</style>
