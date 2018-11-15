<template>
  <div class="fc-layout-item">
    <button @click="$emit('select', layout)">
      {{layout.id}}
    <div class="icon" v-bind:style="icon"></div>
      <small>({{layout.description}})</small>
    </button>
  </div>
</template>

<script>


export default {
  props: { layout: Object },
  computed: { icon: function () {
    let num = parseInt(this.layout.id) - 1
    let left = Math.floor(num/5) * (50 + 20) + 10
    let top = num%5 * (50 + 20) + 10
    if ( num  + 1 && num < 19 ) {
    return { backgroundPosition: `-${top}px -${left}px` } 
    } else {
      return { display: 'none'}
    }
  }
  }
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

  .icon {
    width: 50px;
    height: 50px;
    background-image: url(../public/icon-editor.png);
    
  }
}
</style>
