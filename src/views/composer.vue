<template>
  <div
    class="fc-composer"
    :class="[
      viewport
        ? { ['fc-composer--' + viewport]: viewport }
        : 'fc-composer--landscape',
      visible && 'fc-composer--openmenu'
    ]"
  >
    <ComposerHeader @toggle="toggleViewport" :mode="viewport" />

    <composer-preview
      ref="preview"
      :blocks="blocks"
      @save="save"
      @select="onSelectBlock"
    ></composer-preview>

    <composer-sidebar
      :layouts="layoutArray"
      @visible="onToggleMenu"
      @select="onSelectLayout"
    ></composer-sidebar>
  </div>
</template>

<script>
import { template, cloneDeep } from 'lodash';

import ComposerHeader from '../components/header/header.vue';
import ComposerPreview from '../components/preview/preview.vue';
import ComposerSidebar from '../components/sidebar/sidebar.vue';

export default {
  name: 'composer',
  components: {
    ComposerHeader,
    ComposerPreview,
    ComposerSidebar
  },
  props: {
    value: {
      type: String,
      default: '[]'
    },
    layouts: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      layoutArray: [],
      layoutMap: {},
      blocks: [],
      viewport: '',
      visible: false
    };
  },
  methods: {
    toggleViewport(mode) {
      this.viewport = mode;
    },
    onToggleMenu() {
      this.visible = !this.visible;
    },
    nextBlockId() {
      const seq = (this._blockIdSeq = this._blockIdSeq
        ? ++this._blockIdSeq
        : 1);
      const nonce = Math.random()
        .toString(36)
        .substr(2, 9);
      return `fc-block-${seq}-${nonce}`;
    },
    onSelectLayout(layout) {
      const block = {
        id: this.nextBlockId(),
        layout: layout,
        values: cloneDeep(layout.values) || {} // clone!! not ref!
      };
      this.$refs.preview.addBlock(block);
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
            return Object.assign(layout, {
              templateFunc: template(layout.template)
            });
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
            return Object.assign({ id: this.nextBlockId() }, block, {
              layout: this.layoutMap[block.layout]
            });
          });
          console.log('open', this.blocks);
        })
        .catch(err => {
          console.error('bad or missing value', err);
          this.blocks = [];
        });
    }
  },
  async created() {
    return Promise.all([
      this.openLayouts(this.layouts),
      this.openJson(this.value)
    ]);
  }
};
</script>

<style lang="scss">
@import '../assets/scss/style.scss';

.fc-composer {
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  padding-top: $header-size;
  padding-bottom: 2rem;
  max-width: percentage(1);
  width: percentage(1);
  height: 100vh;
  font-size: $font-size;
  @include transition(null, 0.3s);

  &--flush {
    padding: 0;

    .fc-preview {
      margin-left: 0;
      margin-right: 0;
    }
  }

  &--landscape {
    padding-right: 0;
  }

  &--openmenu {
    padding-right: $sidebar-size;
  }

  &--portrait {
    width: percentage(1);
    max-width: $w-mobile;
    padding-right: 0;
  }

  &__header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 101;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 1.8rem;
    padding-right: 1.8rem;
    width: percentage(1);
    height: $header-size;

    &__h {
      font-size: 1.8rem;
      color: $white;
    }

    &__utils {
      display: flex;

      .fc-utils__btn {
        flex: 1;
        align-items: center;
        display: flex;
        margin-left: 0.8rem;
        color: $white;
      }
    }
  }
}
</style>
