### ECMAScript
- ECMAScript是一种脚本在语法和语义上的标准
  - ECMAScript 5 (2009-12发布)
  - 2012年所有现代浏览器都完整的支持 ECMAScript 5.1, 旧版本的浏览器至少支持 ECMAScript 3
  - ECMAScript 6 (ECMAScript 2015,ES6) (2015-06发布)
  - 至此, ESMAScript 每年发布一次新标准 (最新 ECMAScript2020)
- 指定ES版本检查代码兼容性：https://www.npmjs.com/package/es-check
- ECMAScript兼容性表: http://kangax.github.io/compat-table/es6/

### JavaScript
- Javascript、JScript和ActionScript等脚本语言都是基于ECMAScript标准实现的，其声明变量、操作数组等语法完全一样
- JavaScript 内置了一些对象的标准库(Array、Date、Math等)，JavaScript 的核心部分可以通过添加对象来扩展语言以适应不同用途
  - 客户端的 JavaScript 提供控制浏览器及其文档对象模型(DOM)的对象,来改变网页(DOM)的外观与样式
  - 服务端的 Node.Js 提供操作数据库,通信等对象,来对客户端的请求作出响应

### 变量

#### 变量声明
- var 变量
  - `if(true){ var x = 10; } console.log(x);` OK
- let 块作用域变量
  - `if(true){ let x = 10; } console.log(x);` ERROR
- const 块作用域只读变量
  - 对象属性 与 数组内值 不受只读保护

#### 变量提升
- `console.log(x === undefined); var x = 2; => true` OK
- 变量先用，后 var 声明，不会引发异常，但用的时候变量还是为 undefined

#### 变量类型(7种基本数据类型+对象)
- Boolea, 布尔值 true 和 false
- null, 一个表明 null 值的特殊关键字
- undefined, 一个表明变量未定义的特殊关键字
- Number, 整数或浮点数, 42 或 42.123 或 Infinity
- BigInt, 任意精度整数, 可安全的存储和操作大整数, 甚至可以超过数字的安全整数限制
- String, 字符串
- Symbol, 代表, ES6 新加的类型, 一种实例是唯一且不可改变的数据类型
- Object, 对象

#### String 转换为 Number
- parseInt(字符串, 进制) 只返回整数部分
- parseFloat(字符串)

#### 函数提升
- `f1(); function f1(){}` OK
- `f1(); var f1 = function(){}` ERROR(f2 is not a function)
- 只有函数声明会被提升到顶部，而函数表达式不会

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Loops_and_iteration

- fetch vs XMLHttpRqeuest
- `function` 是对象, `object` 是实例