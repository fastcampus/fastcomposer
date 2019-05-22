<template>
  <button class="fc-sidebar__item" @click="$emit('select', layout)">
    <img :src="layout.icon" alt="" />
    <span class="fc-sidebar__item__info">
      <strong class="fc-sidebar__item__name">{{ layout.id }}</strong>
      {{ layout.description }}
    </span>
  </button>
</template>

<script>
export default {
  name: 'layout-item',
  props: {
    layout: Object,
  },
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
    border: none;
    padding: 0.25rem;

    img {
      float: left;
      margin-right: 0.25rem;
      width: 50px;
      height: 50px;
    }
  }
}
</style>
