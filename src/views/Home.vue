<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <!-- <svg>
      <use xlink:href="#icon-order" />
    </svg> -->
    <svg-icon icon-class="order"></svg-icon>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from 'comps/HelloWorld.vue'
// import '@/icons/svg/order.svg'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
