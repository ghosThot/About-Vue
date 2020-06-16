// 声明文件
import {Store} from 'vuex'

// Store 泛型，约束下{counter: 0}
declare const store: Store<{
  counter: number
}>

export default store