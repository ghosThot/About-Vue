import createApp from "./main";

// 客户端激活，在客户端执行
// 创建vue实例
const {app, router} = createApp()

// 等待router就绪
router.onReady(() => {
  // 激活挂载
  app.$mount('#app')
})