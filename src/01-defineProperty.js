// 数组响应式
// 1、替换数组原型中的7个方法
const orginalProto = Array.prototype
// 备份一份，修改备份
const arrayProto = Object.create(orginalProto);

['push', 'pop', 'shift', 'unshift'].forEach(method => {
  arrayProto[method] = function () {
    orginalProto[method].apply(this, arguments)
    // 覆盖操作，通知更新
    console.log('数组执行' + method + '操作' + JSON.stringify(arguments));
  }
})








// 对象数据响应式
// vue1.0
// defineProperty 第三个参数 属性描述符
function defineReactive(obj, key, val) {

  //递归调用，传入的val如果还是一个obj，能获取到下面的abc
  observe(val)

  Object.defineProperty(obj, key, {
    //get set 没办法拦截到新进来的属性
    get() {
      console.log('get', key);
      return val
    },
    set(newVal) {
      if (val !== newVal) {
        console.log('set', key, newVal);
        observe(newVal)
        val = newVal
      }
    }
  })
}

// 使一个对象的所有属性都被拦截
function observe(obj) {
  if (typeof obj !== 'object' || obj == null) {
    return
  }

  // 判断传入obj类型
  if (Array.isArray(obj)) {
    // 覆盖实例原型，替换七个变更操作
    obj.__proto__ = arrayProto
    // 对数组内部元素执行响应化
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      observe(obj[i])
    }
  }

  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}

// 由于新增属性无法被拦截，所以必须有特定的api做对应的响应式拦截
function set(obj, key, val) {
  defineReactive(obj, key, val)
}

// const obj = {}
const obj = {
  foo: 123,
  bar: 'bar',
  mmm: {
    abc: 'abc'
  },
  arr: [1,2,3,4,5,6,7]
}

// defineReactive(obj, 'abc', 'bar-begin')
observe(obj)

// obj.bar
// obj.bar = 'endding'
// obj.mmm.abc
// obj.mmm.abc = 'abc-endding'

// obj.mmm = {abc: 200}
// obj.mmm.abc

set(obj, 'nnn', 'nnn')

// obj.nnn = 'nnn'
// obj.nnn

obj.arr.push(321)


// Object.defineProperty()对数组无效，如何实现对数组响应式
//  分析：改变数组方法只有7个
// 解决方案：
// 1、找到数组原型，覆盖那些能够修改数组的原型方法，使其可以通知更新
// 2、将得到的新的原型设置到数组实例原型上