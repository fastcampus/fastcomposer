<template>
  <div class="fc-preview">
    <header>
      <h3>preview</h3>
      <button @click="zoomIn"><i class="fas fa-search-plus"></i></button>
      <button @click="zoomOut"><i class="fas fa-search-minus"></i></button>
    </header>
    <main>
      <BlockPreview v-for="block in blocks" :block="block" :style="{zoom: zoom+'%'}"></BlockPreview>
    </main>
  </div>
</template>

<script>
import BlockPreview from './block-preview.vue';

export default {
  props: {
    blocks: Array
  },
  data: function() {
    return {
      zoom: 100
    };
  },
  methods: {
    zoomIn: function() {
      this.zoom = Math.min(this.zoom + 25, 200);
    },
    zoomOut: function() {
      this.zoom = Math.max(this.zoom - 25, 25);
    }
  },
  components: {
    BlockPreview
  }
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
  }
}
</style>
