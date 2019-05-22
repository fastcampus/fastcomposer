<template>
  <header class="fc-composer__header">
    <h1 class="fc-composer__header__h">Fastcomposer</h1>

    <div class="fc-composer__header__utils">
      <button
        type="button"
        class="fc-utils__btn"
        :class="{ 'fc-utils__btn--active': mode === 'flush' }"
        @click="$emit('toggle', 'flush')"
      >
        <i class="material-icons">&#xE3C2;</i>
      </button>
      <button
        type="button"
        class="fc-utils__btn"
        :class="{ 'fc-utils__btn--active': mode ? '' : 'landscape' }"
        @click="$emit('toggle', 'landscape')"
      >
        <i class="material-icons">&#xE3C1;</i>
      </button>
      <button
        type="button"
        class="fc-utils__btn"
        :class="{ 'fc-utils__btn--active': mode === 'portrait' }"
        @click="$emit('toggle', 'portrait')"
      >
        <i class="material-icons">&#xE3C5;</i>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'composer-header',
  props: {
    mode: String
  }
};
</script>
