import createApp from "./main"

// 首屏渲染，在服务端执行
// 创建Vue实例
// 调用者是将来的渲染器renderer
export default context => {
  // 为了让renderer可以处理异步结果，这里应该返回Promise
  return new Promise((resolve, reject) => {
    // 创建vue实例和路由实例
    const {
      app,
      router,
      store,
    } = createApp(context)

    // 获取用户请求url, 从而知道要渲染哪个页面
    // 跳转到首屏
    router.push(context.url)

    // 监听路由ready事件，确保异步任务都完成
    router.onReady(() => {

      // 首先处理异步数据请求
      // 获取当前匹配组件
      const matchedComponents = router.getMatchedComponents()

      // 404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      Promise.all(matchedComponents.map(comp => {
        if (comp.asyncData) {
          // asyncData 需要参数：store，route
          return comp.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        // 所有预期钩子resolve后
        // store已经填充了当前数据状态
        // 这些数据需要同步到前端
        // 做一个序列化操作，前端使用window.__INITIAL_STATE__获取
        // 此处赋值给context.state 这是约定
        context.state = store.state
        resolve(app)
      })
    }, reject)
  })
  
}