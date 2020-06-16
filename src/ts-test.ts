let vars: string

// 类型别名
type foobb = {
  foo: string,
  bb: string
}
const aliasFoo: foobb = {
  foo: '123',
  bb: 'abc'
}

// 联合类型
let union: string | number
union = 1
union = 'abcd'

// 交叉类型
type First = {first: number}
type Second = {Second: number}
type FirstAndSecond = First & Second
