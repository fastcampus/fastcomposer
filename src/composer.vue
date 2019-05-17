<template>
  <div class="fc-composer">
    <sidebar-pane v-if="!whole" :layouts="layoutArray" @select="onSelectLayout"></sidebar-pane>
    <editor-pane v-if="!whole" :blocks="blocks" ref="editor" @select="onSelectBlock" @save="save"></editor-pane>
    <preview-pane v-if="loadDone" ref="preview" :layouts="layoutArray"></preview-pane>
  </div>
</template>

<script>
import { template, cloneDeep } from 'lodash';

import SidebarPane from './sidebar-pane.vue';
import EditorPane from './editor-pane.vue';
import PreviewPane from './preview-pane.vue';

export default {
  name: 'composer',
  components: {
    SidebarPane,
    EditorPane,
    PreviewPane,
  },
  props: {
    value: {
      type: String,
      default: '[]',
    },
    layouts: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      layoutArray: [],
      layoutMap: {},
      blocks: [],
      whole: false,
      loadDone: false,
    };
  },
  methods: {
    nextBlockId() {
      const seq = (this._blockIdSeq = this._blockIdSeq ? ++this._blockIdSeq : 1);
      const nonce = Math.random()
        .toString(36)
        .substr(2, 9);
      return `fc-block-${seq}-${nonce}`;
    },
    onSelectLayout(layout) {
      const block = {
        id: this.nextBlockId(),
        layout: layout,
        values: cloneDeep(layout.values) || {}, // clone!! not ref!
      };
      this.$refs.editor.addBlock(block);
    },
    onSelectBlock(block) {
      this.$refs.preview.selectBlock(block);
    },
    save(html) {
      // replace layout object => layout id
      const blocks = this.blocks.map(block => {
        return Object.assign({}, block, { layout: block.layout.id });
      });
      const json = JSON.stringify(blocks, null, 2);
      // TODO: save html only!
      // AS-IS: save generated html with source json
      this.$emit('save', html, json);
    },
    openLayouts(layouts) {
      console.log('open layouts', layouts);
      return Promise.resolve(layouts)
        .then(layouts => {
          // precompile all layout templates
          this.layoutArray = layouts.map(layout => {
            return Object.assign(layout, { templateFunc: template(layout.template) });
          });
          // lookup table for layout id => layout object
          this.layoutMap = this.layoutArray.reduce((layoutMap, layout) => {
            layoutMap[layout.id] = layout;
            return layoutMap;
          }, {});
        })
        .catch(err => {
          console.error('bad or missing layouts', err);
          this.layoutArray = [];
          this.layoutMap = {};
        });
    },
    openJson(json) {
      console.log('open json', json);
      return Promise.resolve(json)
        .then(json => {
          // TODO: parse html!
          // AS-IS: parse source json string
          // replace layout id => layout object, give id if absent
          this.blocks = JSON.parse(json).map(block => {
            return Object.assign({ id: this.nextBlockId() }, block, { layout: this.layoutMap[block.layout] });
          });

          if (!this.$data.whole) {
            this.inputLocal();
          }

          console.log('open', this.blocks);
        })
        .catch(err => {
          console.error('bad or missing value', err);
          this.blocks = [];
        });
    },
    inputLocal() {
      const mapped = this.$data.blocks.map((e, i) => ({ order: i, values: e.values, id: e.layout.id }));
      const json = JSON.stringify(mapped);
      window.localStorage.setItem('refresh', json);
    },
  },
  async created() {
    const wholeViewTest = /^\?wholeview$/;
    const wholeViewTrue = wholeViewTest.test(window.location.search);

    if (wholeViewTrue) {
      this.$data.whole = true;
      window.onstorage = e => {
        if (e.key === 'refresh') {
          console.log('refresh!!!');
        } else {
          console.log('something changed');
        }
      };
    } else {
      const interval = setInterval(this.inputLocal, 100);
    }

    return Promise.all([this.openLayouts(this.layouts), this.openJson(this.value)])
      .then(() => {
        this.loadDone = true;
      })
      .catch(err => console.log('initial load err: ', err));
  },
};
</script>

<style lang="scss" scoped>
.fc-composer {
  display: flex;
  overflow: hidden;
  height: 100vh;
}
</style>
