<template>
  <div class="fc-block-preview fc-block fc-layout" :class="'fc-layout-' + block.layout.id" v-html="html"></div>
</template>

<script>
export default {
  props: { block: Object, zoom: Number },
  computed: {
    html: function() {
      return this.block.layout.templateFunc(this.block.values);
    }
  }
};
</script>

<style lang="scss" scoped>
.fc-block-preview {
  flex: 0 0 0;
  width: 100%;
  border: 2px dashed fuchsia;
}
</style>
