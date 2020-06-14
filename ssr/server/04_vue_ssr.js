// 脚手架版本

const express = require('express')

const app = express()

// 1. 静态文件服务
const path = require('path')

// 将当前的相对路径转为绝对路径
const resolve = dir => path.resolve(__dirname, dir)
app.use(express.static(resolve('../dist/client'), {index:false}))

// 2. 获取渲染器实例
// bundleRenderer, 它可以获取前面生成的两个json文件
const {
  createBundleRenderer
} = require('vue-server-renderer')
// 得到一个渲染器可以直接渲染vue实例
const bundle = resolve('../dist/server/vue-ssr-server-bundle.json')

const renderer = createBundleRenderer(bundle, {
  runInNewContext: false, // https://ssr.vuejs.org/zh/api/#runinnewcontext
  // 宿主文件
  template: require('fs').readFileSync(resolve("../public/index.html"), "utf-8"), // 宿主文件
  clientManifest: require(resolve("../dist/client/vue-ssr-client-manifest.json")) // 客户端清单
})

// 路由和同构
app.get('*', async (req, res) => {

  // {url: req.url}
  const context = {
    url: req.url
  }

  // 3. 用渲染器渲染vue实例
  try {
    const html = await renderer.renderToString(context)
    res.send(html)
  } catch (error) {
    res.status(500)
    res.send('Internal Server Error 500')
  }
})

app.listen(3030, () => {
  console.log('server is running, listen 3030');
})