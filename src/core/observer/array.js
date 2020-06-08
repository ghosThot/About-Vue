/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {

    // 数组方法的默认行为
    const result = original.apply(this, args)

    // 进行其他操作，变更通知，获取小管家
    const ob = this.__ob__

    // 插入操作：会导致新元素进入，它们需要进行社会主义教育
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted) //社会主义教育

    // 小管家dep通知更新
    // notify change
    ob.dep.notify()
    return result
  })
})
