<template>
  <div>
    <p>Say somthing</p>
    <p>
      <span>me: </span><span>{{ answer }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'demo',
  data() {
    return {
      answer: 'not received'
    }
  },
  created() {
    const broadcastChannel = new BroadcastChannel('broadcastChannel')
    broadcastChannel.onmessage = e => {
      this.answer = e.data
    }
  }
};
</script>

<style scoped>
  
 p {
   width: 100%;
   height: 30px;
   background-color: red;
   color: white;
   font-size: 2rem;
 } 
  
  
</style>
