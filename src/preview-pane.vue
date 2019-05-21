<template>
  <div class="fc-preview">
    <header>
      <h3>preview</h3>
      <a href="/?wholeview" target="_blank">new_page_view</a>
      <button @click="zoomIn"><i class="fas fa-search-plus"></i></button>
      <button @click="zoomOut"><i class="fas fa-search-minus"></i></button>
    </header>
    <main :style="{ zoom }">
      <block-preview
        v-for="(block, blockIndex) in blocks"
        :key="'block-' + blockIndex"
        :block="block"
        :active="activeBlock === block"
      ></block-preview>
    </main>
  </div>
</template>

<script>
import BlockPreview from './block-preview.vue';

export default {
  name: 'preview-pane',
  components: {
    BlockPreview,
  },
  props: {
    layouts: Array,
    broadcast: BroadcastChannel,
    // just proty type? no way...
  },
  created() {
    const wholeViewTest = /^\?wholeview$/;
    const wholeViewTrue = wholeViewTest.test(window.location.search);

    const parseLocal = json => {
      const data2 = JSON.parse(json);
      const layoutArray = this.$props.layouts;

      this.$data.blocks = data2.map(e => {
        const layout = layoutArray.filter(ele => e.id === ele.id)[0];

        const result = Object.assign({}, { layout }, { values: e.values });
        return result;
      });
    };

    if (wholeViewTrue) {
      this.$props.broadcast.onmessage = e => parseLocal(e.data);
    }
  },
  data() {
    return {
      activeBlock: null,
      zoom: 1,
      blocks: [],
    };
  },
  methods: {
    selectBlock(block) {
      this.activeBlock = block;
    },
    zoomIn() {
      this.zoom = Math.min(this.zoom + 0.25, 2);
    },
    zoomOut() {
      this.zoom = Math.max(this.zoom - 0.25, 0.25);
    },
  },
};
</script>

<style lang="scss">
.fc-preview {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;

  > header {
    display: flex;
    flex: 0 0 2rem;
    height: 2rem;
    h3 {
      flex: 1 1 0;
      margin: 0;
      padding: 0;
    }
    button {
      flex: 0 0 2rem;
      width: 2rem;
      height: 2rem;
      text-align: center;
    }
  }

  > main {
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
    overflow: scroll;
    padding: 1rem;
    transform-origin: top left;
  }
}
</style>
