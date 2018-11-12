<template>
  <div class="fc-composer">
    <Sidebar :layouts="layoutArray" @select="selectLayout"></Sidebar>
    <Editor :blocks="blocks" ref="editor" @save="save"></Editor>
    <Preview :blocks="blocks" ref="preview"></Preview>
  </div>
</template>

<script>
import template from 'lodash/template';
import Sidebar from './sidebar.vue';
import Editor from './editor.vue';
import Preview from './preview.vue';

export default {
  props: {
    value: {
      type: String,
      default: '[]'
    },
    layouts: {
      type: Array,
      default: function() {
        return [];
      }
    },
  },
  data: () => ({
    layoutArray: [],
    layoutMap: {},
    blocks: []
  }),
  methods: {
    selectLayout: function(layout) {
      this.$refs.editor.addBlock(layout);
    },
    save: function(html) {
      // replace layout object => layout id
      const json = JSON.stringify(
        this.blocks.map(block => Object.assign({}, block, { layout: block.layout.id })),
        null,
        2
      );
      // TODO: save html only!
      // AS-IS: save generated html with source json
      this.$emit('save', html, json);
    }
  },
  created: function() {
    try {
      // precompile all layout templates
      this.layoutArray = this.layouts.map(layout => {
        layout.templateFunc = template(layout.template);
        return layout;
      });
      // lookup table for layout id => layout object
      this.layoutMap = this.layoutArray.reduce((layoutMap, layout) => {
        layoutMap[layout.id] = layout;
        return layoutMap;
      }, {});
    } catch (err) {
      console.error('bad or missing layouts', err);
      this.layoutArray = [];
      this.layoutMap = {};
    }

    try {
      // TODO: parse html!
      // AS-IS: parse source json string
      // replace layout id => layout object
      this.blocks = JSON.parse(this.value).map(block =>
        Object.assign({}, block, { layout: this.layoutMap[block.layout] })
      );
    } catch (err) {
      console.error('bad or missing value', err);
      this.blocks = [];
    }
  },
  mounted: function() {
    console.log('mounted');
  },
  components: {
    Sidebar,
    Editor,
    Preview
  }
};
</script>

<style lang="scss" scoped>
.fc-composer {
  display: flex;
  overflow: hidden;
  height: 100vh;
}
</style>
