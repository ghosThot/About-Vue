<template>
  <div>
    <h3>grandson</h3>
    <p>{{foo}}</p>
    <p>{{bar}}</p>
    <button @click="$emit('some-event', 'info to grandpa')">给grandpa发送消息</button>
  </div>
</template>

<script>
  export default {
    inject: ['bar'],
    props: {
      foo: {
        type: String,
        default: ''
      },
    },
  }
</script>

<style scoped>

</style>