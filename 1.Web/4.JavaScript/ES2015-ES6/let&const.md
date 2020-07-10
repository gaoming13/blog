### let & const

#### 暂时性死区
- *在代码块内,在let命令声明之前,变量都是不可用的*
```js
var a = 123;
if (true) {
  // ReferenceError: Cannot access 'tmp' before initialization
  a = 456;
  // ReferenceError: Cannot access 'tmp' before initialization
  console.log(typeof a); // 不声明var反倒不会报错
  let a = 343;
}
```

#### 引入了块级作用域
- *let实际上为JavaScript新增了块级作用域*
- *es5只有全局作用域、函数作用域, es6开始才有了块级作用域*
- 执行作用域隔离
```js
// es5使用 IIFE(立即调用的函数表达式)
(function() {
  var tmp = ...;
})();

// es6
{
  let tmp = ...;
}
```