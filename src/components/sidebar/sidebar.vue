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

    <button type="button" class="fc-sidebar__btn" @click="$emit('visible')">
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

<style lang="scss">
@import '../../assets/scss/utils/utilities.scss';

.fc-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  box-sizing: border-box;
  padding-top: $header-size;
  padding-bottom: 2rem;
  width: percentage(1);
  max-width: $sidebar-size;
  color: $white;
  transform: translate3d(100%, 0, 0);
  @include transition(null, 0.3s);

  .fc-composer--flush & {
    padding-top: 0;
    padding-bottom: 0;
  }

  .fc-composer--openmenu & {
    transform: translate3d(0, 0, 0);
  }

  &__list {
    overflow: scroll;
    box-sizing: border-box;
    padding: 1.2rem 0.9rem;
    height: percentage(1);
    background-color: $secondary;

    li {
      & + li {
        margin-top: 1rem;
      }
    }
  }

  &__item {
    display: flex;
    flex-direction: row;
    width: percentage(1);
    color: $white;

    &__info {
      flex: 1;
      padding-top: 0.5rem;
      padding-left: 1rem;
      padding-bottom: 0.5rem;
      text-align: left;
    }

    &__name {
      display: block;
      margin-bottom: 0.5rem;
    }
  }

  &__btn {
    position: absolute;
    top: 50%;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.8rem 0 1.8rem 0.6rem;
    background-color: $secondary;
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    color: $white;
    transform: translate3d(-100%, -50%, 0);
  }
}
</style>
