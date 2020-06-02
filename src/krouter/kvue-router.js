let Vue

// VueRouter 类
class VueRouter {
  constructor(options) {

    this.$options = options

    // 处理route 优化（不至于每次重新渲染都会遍历一次） 做一个映射表缓存
    this.routeMap = {}
    this.$options.routes.forEach(route => {
      this.routeMap[route.path] = route
    })


    //保存当前的url
    //为了使current的组件重新渲染 应该是响应式的
    // 方式一：new Vue() 把data值设置成current
    // 方式二：Vue.util.defineReactive() 给一个对象的指定一个属性为响应式
    Vue.util.defineReactive(this, 'current', '/')
    // this.current = '/' 

    window.addEventListener('hashchange', this.onHashChange.bind(this))
  }

  onHashChange() {

    this.current = window.location.hash.slice(1)

    console.log(this.current)
  }
}

// new Vue 根实例
// App 根组件
// 单例模式


// 实现install方法 静态的
//参数1：Vue构造函数，Vue.use()执行的是install方法
VueRouter.install = function (_Vue) {
  Vue = _Vue


  //1.挂在VueRouter实例
  //只有在生命周期里面才能获取组件实例，并且获取选项
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })


  //2.注册 router-view router-link
  Vue.component('router-view', {
    render(h) {
      // console.log('router-view render', this.$router.current);
      const {routeMap, current} = this.$router
      const component = routeMap[current] ? routeMap[current].component : null
      // const {$options, current} = this.$router
      // const route = $options.routes.find(route => route.path === current)
      // if (route) {
      //   component = route.component
      // }
      
      // return h('div', 'router-view: nothing is there')
      return h(component)
    }
  })
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        default: ''
      },
    },
    render(h) {
      return h('a', {
        attrs: {
          href: '#' + this.to
        }
      }, this.$slots.default)

      //jsx 写法
      // return <a href = {
      //   '#' + this.to
      // }>{this.$slots.default}</a>
    }

  })



}

  







export default VueRouter