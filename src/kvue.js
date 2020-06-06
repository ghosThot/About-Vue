// 数据响应式
// Dep 和 key 一一对应， key 和 watcher 一对多关系
// vue1.0
// defineProperty 第三个参数 属性描述符
function defineReactive(obj, key, val) {

  //递归调用，传入的val如果还是一个obj，能获取到下面的abc
  observe(val)

  // 创建一个Dep实例
  const dep = new Dep()

  Object.defineProperty(obj, key, {
    //get set 没办法拦截到新进来的属性
    get() {
      console.log('get', key);  

      // 依赖收集，把watch和dep关联
      // 希望Watcher实例化时，访问以下对应key，同时把这个实例设置到Dep.target上面
      Dep.target && dep.addDep(Dep.target)

      return val
    },
    set(newVal) {
      if (val !== newVal) {
        console.log('set', key, newVal);
        observe(newVal)
        val = newVal

        // 通知更新
        dep.notify()
      }
    }
  })
}

// 使一个对象的所有属性都被拦截
function observe(obj) {
  if (typeof obj !== 'object' || obj == null) {
    return
  }

  // 创建Observer实例：以后出现一个对象，就会有一个Observer实例
  new Observer(obj)
  
}

// 代理$data中的数据
function proxy(vm) {
  Object.keys(vm.$data).forEach(key => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key]
      },
      set(value) {
        vm.$data[key] = value
      }
    })
  })
}



// kvue:
// 响应式操作
class KVue {
  constructor(options) {
    // 保存选项
    this.$options = options
    this.$data = options.data

    // 响应化处理
    observe(this.$data)

    // 代理
    proxy(this)

    // 编译器
    new Compiler('#app', this)
  }
}

//做数据响应化
class Observer {
  constructor(value) {
    this.value = value
    this.walk(value)
  }

  //遍历对象做响应式
  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}


// Compiler 解析模板，找到依赖，并和前面拦截的属性关联起来
class Compiler {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)

    // 执行编译
    this.compile(this.$el)
  }

  compile(el) {
    //遍历所有节点
    el.childNodes.forEach(node => {
      //是否是元素
      if (node.nodeType === 1) {
        console.log('编译元素', node.nodeName);
        this.compileElement(node)
        
      } else if(this.isInter(node)) {
        console.log('编译文本', node.textContent);
        this.compileText(node)
      }


      //递归
      if (node.childNodes) {
        this.compile(node)
      }
    })
  }

  // 编译元素
  compileElement(node) {
    // 处理元素上的属性 典型：k- v- @开头
    const attrs = node.attributes
    
    Array.from(attrs).forEach(attr => {
      // attr: { name: 'k-text', value: 'counter' }
      const attrName = attr.name
      const exp = attr.value
      if (attrName.indexOf('k-') === 0) {
        const dir = attrName.substring(2)
        // 对应的方法是否存在
        this[dir] && this[dir](node, exp)
      }

      // 事件处理
      if (this.isEvent(attrName)) {
        // @click="onClick"
        const dir = attrName.substring(1) // click
        // 事件监听
        this.eventHandler(node, exp, dir)
      }
    })
    
  }

  // 解析绑定表达式
  compileText(node) {
    // node.textContent = this.$vm[RegExp.$1]
    this.update(node, RegExp.$1, 'text')
  }

  // k-text
  text(node, exp) {
    // node.textContent = this.$vm[exp]
    this.update(node, exp, 'text')
  } 

  // k-html
  html(node, exp) {
    // node.innerHTML = this.$vm[exp]
    this.update(node, exp, 'html')
  } 

  textUpdater(node, val) {
    node.textContent = val
  }

  htmlUpdater(node, val) {
    node.innerHTML = val
  }

  // 事件监听
  isEvent(dir) {
    return dir.indexOf('@') === 0
  }

  eventHandler(node, exp, dir) {
    // methods: { onClick: function (params) {} }
    const fn = this.$vm.$options.methods && this.$vm.$options.methods[exp]
    node.addEventListener(dir, fn.bind(this.$vm))
  }

  // k-model="xxx"
  model(node, exp) {
    // update 方法只需完成赋值和更新
    this.update(node, exp, 'model')
    node.addEventListener('input', e => {
      this.$vm[exp] = e.target.value
    })
  }

  // 表单赋值
  modelUpdater(node, val) {
    node.value = val
  }

  // dir：要做的指令名称
  // 一旦发现一个动态绑定，都要做两件事，1、解析动态值 2、创建更新函数
  // 未来如果对应的exp的值发生变化，执行这个watcher的更新函数
  update(node, exp, dir) {
    //初始化
    const fn = this[dir + 'Updater']
    fn && fn(node, this.$vm[exp])

    //更新，创建一个Watcher实例
    new Watcher(this.$vm, exp, val => {
      fn && fn(node, val)
    })
  }


  // 文本节点 且 符合 {{xxx}}
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
}

// 管理一个依赖，未来执行更新
class Watcher {
  constructor(vm, key, updateFn) {
    this.vm = vm
    this.key = key
    this.updateFn = updateFn

    // 读一下当前key，触发依赖收集
    Dep.target = this
    vm[key]
    Dep.target = null
  }

  // 未来会被dep调用
  update() {
    this.updateFn.call(this.vm, this.vm[this.key])
  }
}


// Dep: 保存所有Watcher实例，当某个key发生变化，通知他们执行更新
class Dep {
  constructor() {
    this.deps = []
  }

  addDep(watcher) {
    this.deps.push(watcher)
  }

  notify() {
    this.deps.forEach(dep => dep.update())
  }
}