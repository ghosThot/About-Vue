import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import { createStore } from './store'

Vue.config.productionTip = false

// 添加一个全局混入：beforeMount钩子在服务器端不会触发，所以这个钩子只会在客户端触发
Vue.mixin({
  beforeMount() {
    const {asyncData} = this.$options
    if (asyncData) {
      // 如果存在则执行异步调用
      asyncData({
        store: this.$store,
        route: this.$route
      })
    }
  }
})
      

// 工厂函数
// 每一个请求一个实例
// 调用者是entry-server
export default function createApp(context) {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    context,
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
  return {app, router, store}
}

