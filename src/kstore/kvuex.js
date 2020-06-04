// import store from "../store";
let Vue

//暗号：first blood


// 声明Store类
class Store {
  constructor(options) {
    //借鸡生蛋 data中的值都会做响应式处理
    //data里面的值都会做一层代理挂载到vue实例里
    // this.state = new Vue({
    //   data() {
    //     return options.state
    //   },
    // })

    //源码中实现
    //_vm 变成一个内部变量，希望用户不要访问
    this._vm = new Vue({
      data: {
        //不希望发生代理，$$
        $$state: options.state
      },

      //作业 options.getter
      computed: {
        doubleCounter: function (state) {
          return options.getters.doubleCounter(state)
        } 
      },
    })

    //保存mutations
    this._mutations = options.mutations
    //保存actions
    this._actions = options.actions
    //getters
    options.getters && this.handlerGetters(options.getters)

    // 锁死commit、dispatch的this指向，防止dispatch中异步操作,嵌套导致this指向错误
    const store = this
    const {commit, dispatch} = store
    this.commit = function boundCommit(type, payload) {
      commit.call(store, type, payload)
    }
    this.dispatch = function boundDispatch(type, payload) {
      dispatch.call(store, type, payload)
    }
  }

  //对外暴露一个属性 存取器使之只读
  get state() {
    return this._vm._data.$$state
  }
  set state(v) {
    console.error('please use replaceState to reset state');
  }



  //修改状态 commit
  commit(type, payload) {
    // 1.获取mutations
    const entry = this._mutations[type]

    if (!entry) {
      console.error('没有这个mutation');
      return;
    }

    entry(this.state, payload)
  }

  //执行异步任务或复杂逻辑 dispatch
  dispatch(type, payload) {
    // 1.获取actions
    const entry = this._actions[type]

    if (!entry) {
      console.error('没有这个action');
      return;
    }

    entry(this, payload)
  }

  handlerGetters(getters) {
    this.getters = {} //让外面访问
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return getters[key](this.state)
        }
      })
    })
  }
}




// install方法
function install(_Vue) {
  Vue = _Vue

  // 挂载
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}


//导出一个对象，作为Vuex    new Vuex.store()
export default {Store, install}