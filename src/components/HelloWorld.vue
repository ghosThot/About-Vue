<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p><input type="text" @keyup.enter="addFeature"></p>
    <ul>
      <li :class="{selected: feature.selected}" v-for="feature in features" :key="feature.id">{{ feature.name }}</li>
      <li>{{ count }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
// 方式一
// class-style组件
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

type Feature = {
  id: number;
  name: string;
}

type Select = {
  selected: boolean
}

export type FeatureAndSelect = Feature & Select

@Component({
  // props: {//方法2
  //   msgs: {
  //     type: Number,
  //     default: 0
  //   },
  // },
})
export default class HelloWorld extends Vue {

  // 装饰器
  @Prop({
    type: String, // 写给vue
    required: true
  }) 
  private msg!: string; // 方法1 string 写给ts的

  features: FeatureAndSelect[] = []

  // 声明周期同名方法作为同名钩子使用
  async created() {
    // this.features = [
    //   { id: 1, name:'first-nanme', selected: true },
    //   { id: 2, name: 'second-nanme', selected: false},
    // ]

    // 用泛型约束数据类型
    const resp = await this.$axios.get<FeatureAndSelect[]>('/api/list')
    this.features = resp.data
  }

  @Emit()  // 以方法名做事件名，返回值做参数
  addFeature(e: KeyboardEvent) {
    // 如果用户特别确定类型，可以做类型断言
    const inp = e.target as HTMLInputElement
    const val = inp.value
    const feature: FeatureAndSelect = {
      id: this.features.length + 1,
      name: val,
      selected: false
    }
    this.features.push(feature)
    inp.value = ''
    return feature
  }

  // 存取器作为计算属性存在
  get count() {
    return this.features.length
  }

}


// 方式二
// options-style
// export default Vue.extend({
//   props: ['msg'],
//   mounted () {
//     this.msg;
//   },
// })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
.selected {
  background-color: #774413;
}
a {
  color: #42b983;
}
</style>
