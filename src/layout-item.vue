<template>
  <div class="fc-layout-item">
    <button @click="$emit('select', layout)">{{layout.id}}
      <small>({{layout.description}})</small>
    </button>
  </div>
</template>

<script>
export default {
  props: { layout: Object }
};
</script>

<style lang="scss" scoped>
.fc-layout-item {
  display: flex;
  min-height: 2rem;

  button {
    flex: 1 1 0;
    display: block;
    text-align: left;
  }
}
</style>
