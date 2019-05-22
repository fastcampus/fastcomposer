<template>
  <div class="fc-block__utils">
    <button class="fc-block__utils__btn" @click="$emit('toggle', block)">
      <i class="material-icons">&#xE417;</i>
    </button>
    <button class="fc-block__utils__btn" @click="$emit('remove', block)">
      <i class="material-icons">&#xE872;</i>
    </button>
    <button class="fc-block__utils__btn" @click="$emit('up', block)">
      <i class="material-icons">&#xE5D8;</i>
    </button>
    <button class="fc-block__utils__btn" @click="$emit('down', block)">
      <i class="material-icons">&#xE5DB;</i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    block: Object
  }
};
</script>
