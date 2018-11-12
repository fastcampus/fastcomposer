<template>
  <div class="fc-sidebar">
    <header>
      <h3>layouts</h3>
    </header>
    <ul>
      <li v-for="layout in layouts">
        <LayoutItem :layout="layout" @select="$emit('select', layout)"></LayoutItem>
      </li>
    </ul>
  </div>
</template>

<script>
import LayoutItem from './layout-item.vue';

export default {
  props: { layouts: Array },
  components: { LayoutItem }
};
</script>

<style lang="scss" scoped>
.fc-sidebar {
  display: flex;
  flex-direction: column;
  flex: 0 0 15rem;
  width: 15rem;

  header {
    display: flex;
    flex: 0 0 2rem;
    height: 2rem;
    h3 {
      flex: 1 1 0;
      margin: 0;
      padding: 0;
    }
  }

  ul {
    flex: 1 1 0;
    list-style: none;
    margin: 0;
    padding: 0;
    overflow-y: scroll;
  }
}
</style>
