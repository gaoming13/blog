> 浏览器与Node.js环境对es6的支持情况 https://kangax.github.io/compat-table/es6/
> ES6 New feature: https://github.com/lukehoban/es6features
- 从 Node v13.2 开始, 默认打开 ESM 的支持

arrows
enhanced object literals
template strings
destructuring
default + rest + spread
iterators + for..of
generators
unicode
map + set + weakmap + weakset
proxies
symbols
subclassable built-ins
promises
math + number + string + array + object APIs
binary and octal literals
reflect api
tail calls

- let + const
  - 暂时性死区
  - 块级函数作用域/IIFE
- classes(类)
  - *语法糖,绝大部分功能,ES5都可以做到*
  - 0.继承
  - 1.构造函数
    - 1.增加了构造函数
    - 2.new.target
  - 2.实例属性
    - 1.定义实例属性新写法
    - 2.实例属性的遍历方法(* [Symbol.iterator])
  - 3.实例方法
    - 1.取值函数/存值函数
    - 2.函数名使用表达式
  - 3.静态方法(新)
- modules(模块)
  - *node默认不支持,node有自己的模块加载机制CommonJS*
  - export
    - export let a1 = 123
    - export function f1(x) {}
    - export default {}
    - export default function() {}
    - exprot * from 'math'
  - import
    - import * as math from 'math'
    - import {a1, f1} from 'math'
    - import l1, {a1, f1} from 'math'
  - 浏览器中模块加载
