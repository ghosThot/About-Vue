<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld @add-feature="addFeature" msg="Welcome to Your Vue.js + TypeScript App"/>
    <TsxComp msg="tsx transform"></TsxComp>
    <p @click="asyncAdd">{{ count }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld, { FeatureAndSelect } from './components/HelloWorld.vue';
import TsxComp from './components/TsxComp';
import CounterModule from '@/store/counter'

@Component({
  components: {
    HelloWorld,
    TsxComp
  },
})
export default class App extends Vue {
  get count() {
    return CounterModule.count
  }

  addFeature(feature: FeatureAndSelect) {
    console.log(feature.name);
    
  }

  asyncAdd() {
    CounterModule.asyncAdd()
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
