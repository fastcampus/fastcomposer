<template>
  <div
    class="fc-block__item"
    :class="[
      'fc-layout-' + block.layout.id,
      { active: active },
      { hidden: this.block.hidden }
    ]"
    v-html="html"
  ></div>
</template>

<script>
import marked from 'marked';
import debounce from 'lodash/debounce';
import FileUpload from './__preview-edit.vue';

export default {
  name: 'block-preview',
  components: {
    FileUpload
  },
  props: {
    block: Object,
    zoom: Number,
    active: Boolean
  },
  computed: {
    html() {
      return this.block.layout.templateFunc({
        $markdown: marked,
        ...this.block.values
      });
    }
  },
  watch: {
    active(value) {
      if (value) {
        this.$el.scrollIntoViewIfNeeded();
      }
    }
  },
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      values: this.block.values // ref. for live-update
      // view: Object.assign({}, this.block.value) // clone for manual apply/reset
    };
  },
  methods: {
    resize: debounce(event => {
      event.target.style.height = 'auto';
      event.target.style.height = `${event.target.scrollHeight}px`;
    }, 100),
    upload(name, url) {
      this.values[name] = url;
    },
    removeBlock() {
      console.log('[removeBlock]');
    }
    // apply() {
    //   this.block.values = Object.assign({}, this.values);
    // },
    // reset() {
    //   this.values = Object.assign({}, this.block.values);
    // }
  }
};
</script>

<style lang="scss" scoped>
.fc-block-preview {
  flex: 0 0 0;
  width: 100%;
  outline: 1px dashed lightgray;

  &.active {
    outline: 1px dashed fuchsia;
  }

  &.hidden {
    opacity: 0.5;
    background-color: olive;
  }
}
</style>
