const express = require('express')

const server = express()

// 1. 创建vue实例
const Vue = require('vue')

// 2. 获取渲染器实例
const {
  createRenderer
} = require('vue-server-renderer')

const renderer = createRenderer()

server.get('/', async (req, res) => {

  const vm = new Vue({
    template: '<p>{{ msg }}</p>',
    data() {
      return {
        msg: 'vue ssr'
      }
    },
  })



  // 3. 用渲染器渲染vue实例
  try {
    const html = await renderer.renderToString(vm)
    res.send(html)
  } catch (error) {
    res.status(500)
    res.send('Internal Server Error 500')
  }
})

server.listen(3030, () => {
  console.log('server is running, listen 3030');
})