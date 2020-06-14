import Vue from 'vue'
import App from './App.vue'
import router from './router'
import createRouter from './router'

Vue.config.productionTip = false

// 工厂函数
// 每一个请求一个实例
// 调用者是entry-server
export default function createApp(context) {
  const router = createRouter()
  const app = new Vue({
    context,
    router,
    render: h => h(App)
  }).$mount('#app')
  return {app, router}
}

