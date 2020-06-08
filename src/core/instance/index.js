import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// Vue构造函数
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 初始化方法
  this._init(options)
}

// 实现实例的属性和方法
initMixin(Vue) // _init()
stateMixin(Vue)  // $set/$delete/$watch
eventsMixin(Vue)  // $on/$emit/$off/$once
lifecycleMixin(Vue)  // $destory/$forceUpdate/_update等
renderMixin(Vue)  // _render/$nextTick

export default Vue
