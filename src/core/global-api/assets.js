/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */

  // ASSET_TYPES 是数组，里面有 ['component', 'directive', 'filter']
  ASSET_TYPES.forEach(type => {

    // Vue.component = function() {}
    // id 使用：Vue.component = function() {'comp', {...}}
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id)
        }

        // 组件相关代码声明
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id

          // _base 是Vue构造函数
          // Vue.extend 返回组件的构造函数
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }

        // 注册到组件的选项中去，
        // 在Vue原始选项中添加组件配置, 将来的其他组件会继承， 它们都会有这些注册组件
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
