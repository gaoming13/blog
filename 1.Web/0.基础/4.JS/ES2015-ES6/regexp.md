### 正则扩展
> https://es6.ruanyifeng.com/?search=%E7%AE%AD%E5%A4%B4&x=0&y=0#docs/regex
- 1.RegExp构造函数,第一个参数是正则对象,第二个参数也可以指定修饰符(es5不支持)
  - `new RegExp(/abc/ig, 'i')`
- 2.字符串的正则方法(match、replace、search、split)
  - ES6将这四个方法,在语言内全部调用 RegExp 的实例方法,做到与正则相关的方法,都定义在RegExp对象上
  - String.prototype.math 调用 RegExp.prototype[Symbol.match]
  - String.prototype.replace 调用 RegExp.prototype[Symbol.replace]
  - String.prototype.search 调用 RegExp.prototype[Symbol.search]
  - String.prototype.split 调用 RegExp.prototype[Symbol.split]
  ```js
  // 原理
  class A {
    constructor(value) { this.value = values; }
    [Symbol.replace](s) { return '123'; }
  }
  'foo'.replace(new A('a'), 'b')
  ```
- 3.修饰符
  - u修饰符：用来处理大于 \uFFFF 的Unicode 字符 `/\u{20BB7}/u.test('𠮷')`
    - RegExp.prototype.unicode: 表示是否设置了u修饰符
  - y修饰符
    - RegExp.prototype.sticky: 是否设置了y修饰符
  - s修饰符：dotAll模式
  - RegExp.prototype.flags: 返回正则表达式的修饰符