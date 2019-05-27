<template>
  <pane :title="`layer`" :width="width" :height="'50%'">
    <div v-for="(layer, index) in layers" :key="index">
      <list-item
        :title="__layer.layout.id"
        :description="__layer.layout.description"
        :icon="__layer.layout.icon"
        :active="selectedLayer.id === __layer.id"
        @onClick="selectLayer(__layer)"
      >
        <button v-if="__layer.hidden" @click="toggleLayer(index, false)">
          <i class="fas fa-eye-slash"></i>
        </button>
        <button v-if="!__layer.hidden" @click="toggleLayer(index, true)">
          <i class="fas fa-eye"></i>
        </button>
        <button @click="removeLayer(__layer, index)">
          <i class="fas fa-trash-alt"></i>
        </button>
        <button @click="upLayer(__layer, index)">
          <i class="fas fa-arrow-up"></i>
        </button>
        <button @click="downLayer(__layer, index)">
          <i class="fas fa-arrow-down"></i>
        </button>
      </list-item>
    </div>
  </pane>
</template>

<script>
  import Pane from './common/pane.vue';
  import ListItem from './list-item.vue';

  export default {
    name: 'layer',
    components: {
      Pane,
      ListItem,
    },
    props: {
      layers: {
        type: Array,
        default() {
          return [];
        },
      },
      width: {
        type: String,
        default: '100%',
      },
      selectedLayer: {
        type: Object,
        default() {
          return {};
        },
      },
    },
    methods: {
      selectLayer(layer) {
        this.$emit('select', __layer);
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>
