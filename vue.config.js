// nodejs 执行
const path = require('path')
const port = 7077

console.log(process.env.navCount);
console.log(process.env.VUE_APP_TESTCC);


module.exports = {
  publicPath: '/practice',
  devServer: {
    port
  },
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       comps: path.join(__dirname, 'src/components')
  //     }
  //   },
  //   name: 'vue best practice'
  // },

  // 函数形式
  configureWebpack: config => {
    config.resolve.alias.comps = path.join(__dirname, 'src/components')
    // 根据环境变量
    if (process.env.NODE_ENV === 'development') {
      config.name = 'vue 最佳实践'
    } else {
      config.name = 'vue best practice'
    }
  },

  // 链式配置
  chainWebpack(config) {
    // icon目录绝对路径
    const iconsPath = path.join(__dirname, 'src/icons')
    // 1.禁用默认svg的rules，使他忽略icons目录
    config.module.rule('svg')
      .exclude.add(iconsPath)
    
    // 2.启用 svg-sprite-loader,使他启用icons目录
    config.module.rule('icons')
      .test(/\.svg$/)
      .include.add(iconsPath).end()
      .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({symbolId: 'icon-[name]'})
  }

}