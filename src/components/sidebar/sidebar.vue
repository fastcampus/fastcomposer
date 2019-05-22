<template>
  <div class="fc-sidebar">
    <ul class="fc-sidebar__list">
      <li v-for="layout in layouts" :key="layout.id">
        <layout-item
          :layout="layout"
          @select="$emit('select', layout)"
        ></layout-item>
      </li>
    </ul>
    <button type="button" class="fc-sidebar__btn">
      <i class="material-icons">&#xE3E8;</i>
    </button>
  </div>
</template>

<script>
import LayoutItem from './__sidebar-item.vue';

export default {
  name: 'sidebar-pane',
  components: {
    LayoutItem
  },
  props: {
    layouts: Array
  }
};
</script>
