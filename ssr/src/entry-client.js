import createApp from "./main";

// 客户端激活，在客户端执行
// 创建vue实例
const {app, router, store} = createApp()

// 恢复state
if (window.__INITIAL_STATE__) {
  console.log(window.__INITIAL_STATE__);
  
  store.replaceState(window.__INITIAL_STATE__)
}

// 等待router就绪
router.onReady(() => {
  // 激活挂载
  app.$mount('#app')
})