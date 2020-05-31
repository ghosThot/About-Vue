import Vue from 'vue'
/**
 * 实现一个create方法，能够创建指定组件的实例
 * 并将其挂载在body上
 */
export default function create(Component, props) {

  // 方案一
  const Ctor = Vue.extend(Component);
  
  const comp = new Ctor({propsData:props});

  comp.$mount()

  document.body.appendChild(comp.$el)
  
  comp.remove = () => {
    document.body.removeChild(comp.$el)
  }

  // 方案二
  // const vm = new Vue({
  //   render(h) {
  //     return h(Component, {props})
  //   }
  // }).$mount()

  // document.body.appendChild(vm.$el)

  // const comp = vm.$children[0]
  // comp.remove = () => {
  //   document.body.removeChild(vm.$el)
  //   comp.$destroy()
  // }

  return comp
}