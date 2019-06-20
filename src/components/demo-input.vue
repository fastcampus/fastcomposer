<template>
  <div class="demo-input">
    <label>
     i said
    <input type="text" @change="onChange"/>
    </label>
  </div>
</template>

<script>
export default {
  name: 'demo-input',
  methods: {
    onChange(e) {
      this.bc.postMessage(e.target.value);
    },
  },
  data() {
    return {
      bc: {},
    };
  },
  created() {
    this.bc = new BroadcastChannel('broadcastChannel');
  },
};
</script>

<style scoped>
.demo-input {
  /*width: 300px;*/
  /*height: 100px;*/
  background-color: yellow;
  position: fixed;
  top: 0px;
  left: 50vw;
  z-index: 10000;
}
</style>
