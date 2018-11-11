<template>
  <form class="fc-block-form" @submit="$emit('apply', block)">
    <fieldset v-for="param in block.layout.params">
      <label>{{param.name}}<small>({{param.type}})</small></label>
      <template v-if="param.type === 'text'">
        <input type="text" :name="param.name"
               :placeholder="param.description"
               v-model="block.values[param.name]">
      </template>
      <template v-if="param.type === 'textarea'">
        <textarea :name="param.name"
                  :placeholder="param.description"
                  v-model="block.values[param.name]" @keyup="resize"></textarea>
      </template>
      <template v-if="param.type === 'url'">
        <input type="url" :name="param.name"
               :placeholder="param.description"
               v-model="block.values[param.name]">
      </template>
      <template v-if="param.type === 'number'">
        <input type="number" :name="param.name"
               :placeholder="param.description"
               v-model="block.values[param.name]">
      </template>
      <template v-if="param.type === 'image'">
        <input type="url" :name="param.name"
               :placeholder="param.description"
               v-model="block.values[param.name]">
        <FileUpload :name="param.name" accept="image/*" @upload="upload"></FileUpload>
      </template>
    </fieldset>
    <!--
    <button type="reset" @click="$emit('reset', block)">reset</button>
    <button type="submit">apply</button>
    -->
  </form>
</template>

<script>
import debounce from 'lodash/debounce';
import FileUpload from './file-upload.vue';

export default {
  props: { block: Object },
  methods: {
    resize: debounce(function(event) {
      console.log(event.target);
      event.target.style.height = 'auto';
      event.target.style.height = `${event.target.scrollHeight}px`;
    }, 50),
    upload: function(name, url) {
      this.block.values[name] = url;
    }
  },
  components: {
    FileUpload
  }
};
</script>

<style lang="scss" scoped>
.fc-block-form {
  flex: 1 1 0;
  width: 100%;

  fieldset {
    border: none;
    & + fieldset {
      border-top: 1px solid red;
    }
    label {
      display: block;
    }
    input {
      display: block;
      width: 100%;
      height: 2em;
    }
    textarea {
      display: block;
      width: 100%;
      min-height: 5em;
      overflow: hidden;
    }
  }
}
</style>
