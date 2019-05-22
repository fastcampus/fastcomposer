<template>
  <div class="fc-preview">
    <header>
      <h3>preview</h3>
      <div class="btn-group">
        <button type="button" @click="toggleLayerKits"><i class="fas" v-bind:class="[isLayerKits ? 'fa-toggle-on' : 'fa-toggle-off']"></i></button>
        <button type="button" @click="toggleLayers"><i class="fas" v-bind:class="[isLayers ? 'fa-toggle-on' : 'fa-toggle-off']"></i></button>
      </div>
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
  props: ['blocks', 'isLayers', 'isLayerKits'],
  data() {
    return {
      activeBlock: null,
      zoom: 1,
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
    toggleLayerKits() {
      this.$emit('toggleLayerKits');
    },
    toggleLayers() {
      this.$emit('toggleLayers');
    }
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
