<template>
  <div class="fc-block-item">
    <button @click="$emit('select', block)">{{block.layout.id}}</button>
    <button @click="$emit('remove', block)"><i class="fas fa-trash-alt"></i></button>
    <button @click="$emit('up', block)"><i class="fas fa-arrow-up"></i></button>
    <button @click="$emit('down', block)"><i class="fas fa-arrow-down"></i></button>
  </div>
</template>

<script>
export default {
  props: { block: Object },
  computed: {
    html: function() {
      return this.block.layout.templateFunc(this.block.values);
    }
  }
};
</script>

<style lang="scss" scoped>
.fc-block-item {
  flex: 0 0 2em;
  display: flex;
  flex-wrap: wrap;

  button {
    flex: 0 0 2rem;
    width: 2rem;
    text-align: center;
  }

  button:first-child {
    flex: 1 1 0;
    text-align: left;
  }
}
</style>
