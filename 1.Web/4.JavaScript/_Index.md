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
- 变量声明
  - var 变量
    - `if(true){ var x = 10; } console.log(x);` OK
  - let 块作用域变量
    - `if(true){ let x = 10; } console.log(x);` ERROR
  - const 块作用域只读变量 (注：对象属性 与 数组内值 不受只读保护)
- 变量提升
  - `console.log(x === undefined); var x = 2; => true` OK
  - 变量先用，后 var 声明，不会引发异常，但用的时候变量还是为 undefined
- 变量类型(7种基本数据类型+对象)
  - `Boolea` 布尔值 true 和 false
  - `null` 一个表明 null 值的特殊关键字
  - `undefined` 一个表明变量未定义的特殊关键字
  - `Number` 整数或浮点数, 42 或 42.123 或 Infinity
  - `BigInt` 任意精度整数, 可安全的存储和操作大整数, 甚至可以超过数字的安全整数限制
  - `String` 字符串
  - `Symbol` 代表, ES6 新加的类型, 一种实例是唯一且不可改变的数据类型
  - `Object` 对象
- String 转换为 Number
  - parseInt(字符串, 进制) 只返回整数部分
  - parseFloat(字符串)

### 循环与迭代
- label 语句
```js
label1:
for (var i = 0; i < 100; i++) {
  for (var j = 0; j < 100; j++) {
    if (i === 5) continue label1; // 停止本次循环,跳转到label1下的循环继续
  }
}

label2:
for (var i = 0; i < 100; i++) {
  for (var j = 0; j < 100; j++) {
    if (i === 5) break label2; // 停止本次循环,跳出到label1下的循环
  }
}
```
- for:
- for...in: 以任意顺序遍历对象的除Symbol以外的可枚举属性名(数组对象会返回 数组下标 + 自定义属性名!!!)
  - 通常，在迭代过程中最好不要对对象属性进行添加、修改、删除的操作
  - 不应该用于迭代一个Array,不能保证索引顺序
  - 仅迭代自身的属性，只考虑对象本身的属性，而不是它的原型：`Object.getOwnPropertyNames(obj)` 或 `obj.hasOwnProperty('a')`
  - `var obj = {a:1, b:2}; function C() { this.c = '3'; }; C.prototype = obj; var obj1 = new C();`
  - `for (var i in obj1) { if (obj1.hasOwnProperty(i)) console.log(i); }` => `c`
  - `let obj = {a: 1, b: 2}; obj.__proto__.c = 3; for (let i in obj) { console.log(i); }` => `a b c`
- for...of: 在可迭代对象(Array、Map、Set、String、TypedArray、arguments)上创建一个迭代循环
  - `break / throw / continue / return` 可跳出循环
  - 迭代Array: `for (let v of [1, 2, 3]) { console.log(v) }`
  - 迭代String: `for (let v of 'abc') { console.log(v) }`
  - 迭代TypedArray: `for (let v of (new Uint8Array([0x00, 0xff]))) { console.log(v) }`
  - 迭代Map: `for (let [k, v] of (new Map([['a', 1]]))) { console.log({k, v}) }`
  - 迭代Set: `for (let v of (new Set([1, 2, 3]))) { console.log(v) }`
  - 迭代arguments `(function() { for (let v of arguments) { console.log(v) } })(1, 2, 3);`
  - 迭代DOM集合 `for (let v of document.querySelectorAll('p')) { console.log(v) }`
  - 迭代生成器 `function* f() { i = 0; while(true) { i += 1; yield(i); } }; for (let v of f()) { console.log(v) }`
  - for...in 与 for...of 对比
    - `Object.prototype.p1 = '123'; Array.prototype.p2 = '456';`
    - `let obj1 = [1, 2, 3]; obj1.a = '123';`
    - `for (let k in obj1) { console.log(k); }` => `0 1 2 a p2 p1`
    - `for (let k in obj1) { if (obj1.hasOwnProperty(k)) console.log(k); }` => `0 1 2 a`
    - `for (let v of obj1) { console.log(v); }` => `1 2 3`
    - `let obj2 = {a: '123'};`
    - `for (let k in obj2) { console.log(k); }` => `a p1`
    - `for (let k in obj2) { if (obj2.hasOwnProperty(k)) console.log(k); }` => `a`

### 函数
- 包含 函数声明 与 函数表达式
  - 函数声明 `function f1() {}`
  - 函数表达式 `const f1 = function f2() { console.log(f1 === f2); }` // 在函数体内 f1 与 f2 等价
  - 函数表单式(匿名) `const f1 = function() {}`
- 函数提升
  - 函数声明,有函数提升 `f1(); function f1(){}` OK
  - 函数表达式,没函数提升 `f1(); var f1 = function(){}` ERROR(f2 is not a function)
- 函数改变外部变量值
  - 基础数据类型作为参数传给函数，函数改变了这个参数，外部变量不变 `function f1(v){v=1;}; let a=0; f1(a);` a=0
  - 对象作为参数传给函数，函数改变了这个参数的属性，外部变量也会变 `function f1(v){v.push(1);}; let a=[]; f1(a);` a=[1]
- 函数参数
  - 函数的实际参数保存在一个类似数组的 arguments 对象中 `function f() { for (const v of arguments) { console.log(v); } }; f(1, 2, 3);`
  - 默认参数(es6) `function f(a = 0) {}`
  - 剩余参数(es6) `function f(a, ...b) {}`
- 闭包: 当内部函数以某一种方式被任何一个外部函数作用域访问时，一个闭包就产生了
  - 内部函数只能在外部函数中访问
  - 内部函数形成了一个闭包：内部函数可以访问外部函数的参数和变量，但外部函数却不能使用它的参数和变量
```js
// 闭包1
function out(x, y) {
  function in(x) { return x * x; }
  return in(x) + in(y);
}
// 闭包2
function pet(name) {
  let sex = '';
  return {
    getSex: () => sex,
    setSex: (sex) => { sex = sex },
    getName: () => name,
  };
};
const dog = pet('dog');
dog.getName();
dog.setSex('girl');
dog.getSex();
```

### 顶级内建函数(全局方法,不与任何对象有关系)
- decodeURI(uri)
- decodeURIComponent(uri)
- encodeURI(uri) 把字符串编码为URL
- encodeURIComponent(uri) 把字符串编码为URL组件
- eval(str)
- isFinite(val) 是否为有穷大数
- isNaN(val) 是否为数字
- Number(val) 转换为数字
- parseFloat(val) 转换为浮点数
- parseInt(val, radix) 转换为整数

### 原型链
- prototype 是函数(function)的原型，定义了一类对象共有的属性
- 对象的 __proto__ 指向继承函数(function)的原型
- constructor 是对象的构造函数，当通过声明一个构造函数来创建“类”时，constructor 被隐形的添加到该“类”的 prototype 上，指向构造函数自己
- `hasOwnProperty` 只查找对象或函数的自有属性(而不用遍历原型链的方法)
- `'a' in obj` 查找对象或函数的自有属性与继承属性
- `undefined` 不能够判断属性是否存在
```
const obj1 = new Array(); obj1.p1 = '123';

      obj1(object)
      - p1: '123
      - length: 0
      - {__proto__}·············
                               ·
 ···> Array(function)          ·
 ·    - name: 'Array'          ·
 ·    - isArray: f             ·
 ·    - from: f                ·
 ·    - {prototype} <···········
 ······ - {constructor}
        - push: f
        - indexOf: f
        - toString: f
      - {__proto__}·············
                               ·
 ···> Object(function)         ·
 ·    - name: 'Object'         ·
 ·    - {prototype} <···········
 ·······- {constructor} ··· Object
        - hasOwnProperty: f
        - propertyIsEnumerable: f
```

#### 创建对象与生成原型链
- 1.使用语法结构构建的对象
  - `let a = "123";`
  - `let a = ['123'];`
  - `function a() {}`
- 2.使用构造器创建的对象(构造器其实就是一个普通函数,当使用new操作符时,它就可以被称为构造方法)
  - `function a() {}; let b = new a();`
- 3.使用 Object.create 创建的对象(es5引入的新方法)
  - `let a = {}; let b = Object.create(a);`
  - `let a = Object.create(null);`
    - `a.__proto__                  --->  undefined`
- 4.使用 class 关键字创建对象(es6引入的新方法)
  - `class A {}; class B extends A {};`

### 严格模式(es5)
- 1.通过抛出错误来消除一些原有静默错误
  - 八进制语法: `var n = 023; var s = "\047"` // ES6 `var n = Oo23`
  - with语句
  - 使用delete删除变量名(而非属性名) `delete a`
  - 删除一个不可配置的属性 `delete Object.prototype`
  - 使用`eval`或`arguments`作为变量名或函数名
  - 对象字面量中使用相同的属性名：`{a:1, b:2, a:3}`
  - 函数形参中使用相同的参数名：`function f(a, b, b) {}`
  - 给一个未声明的变量赋值 `a = 123`
- 2.修复了一些导致Javascript引擎难以执行优化的缺陷,有时候相同代码严格模式执行更快.
  - 在语句块中使用函数声明 `if (a > b) { function f() {} }`
  - 访问 `arguments.callee, arguments.caller, anyFunction.caller以及anyFunction.arguments`
  - 普通函数调用f()中,this指向全局变量;严格模式中,this指向undefined,使用call或apply可传入this参数
  - 严格模式下arguments对象会以形参变量的拷贝形式被创建和初始化，因此arguments对象的改变不会影响形参
  - 严格模式下eval不会在当前的作用域内创建新变量,传入eval的字符串参数也会按照严格模式去解析
- 3.禁用了ECMAScript在未来版本中可能用到的语法
  - 使用未来保留字作为变量名或函数名(implements/interface/let/package/private/procted/public/static/yield)

### this:
- 在绝对多数情况下,函数的调用方式决定了`this`的值。`this`不能在执行期间被赋值，每次函数被调用时`this`的值也有可能不同。
- ES5引入了`bind`方法来设置函数的`this`值，而不用考虑函数如何被调用的
- ES2015引入了支持`this`词法解析的箭头函数(它在闭合的执行环境内设置`this`的值)
- 1.全局环境中: this指向全局对象 `console.log(this);` => `window`
- 2-1.函数简单调用,非严格模式: this指向全局对象 `(function() { console.log(this); })();` => `window`
- 2-2.函数简单调用,严格模式: this保持他进入执行环境时的值,如果this没有被执行环境(execution context)定义,那它将保持为`undefined`
  - `(function() { 'use strict'; console.log(this); })();` => `undefined`
  - 如果想把this的值从一个环境传到另一个,可用`call`或`apply`方法
    - `(function() { 'use strict'; console.log(this); }).call({ a: 123 })` => `{a: 123}`
  - 当一个函数在其主体内使用this关键字时,可以使用函数继承自`Function.prototype`的`call`或`apply`将this绑定到调用中的特定对象
    - `(function(c, d) { console.log(this.a + this.b + c + d); }).call({ a: '1', b: '2' }, '3', '4')` => `1234`
    - `(function(c, d) { console.log(this.a + this.b + c + d); }).apply({ a: '1', b: '2' }, ['3', '4'])` => `1234`
- 3.bind方法：ES2015引入的`Function.prototype.bind`,调用`f.bind(obj)`会创建一个与f具有相同函数体和作用域的函数,this永久被绑定到obj,无论函数如何被调用
  - `function f() { console.log(this); }; var f1 = f.bind({a: '123'}); var f2 = f1.bind({a: '456'}); var obj = { f1, f2 };`
  - `console.log(obj.f1()); console.log(obj.f2());` => `{a: '123'}  {a: '123'}`
- 4.对象的方法: 函数作为对象中的方法被调用时，this是调用该函数的对象; 这样的行为不受函数定义方式或位置的影响
  - `var obj = {a: '123', obj1: { b: '345', f: function() { return this } }}` => `{b: '345', f}`
  - `function f() { return this }; var obj = {a: '123', f}; obj.f()` => `{a: '123', f}`
- 5.原型链中的方法：同上, 如果方法存在于对象的原型链上，那么this是调用这个方法的对象
  - `var obj = {f: function() { return this; }}; var obj1 = Object.create(obj); obj1.a = '123'; obj1.f()` => `{a: '123'}`
- 6.getter与setter中：同上，this是设置或获取属性的对象
  - `var obj = {a: '123', b: {c: '456'}}; Object.defineProperty(obj.b, 'd', {get: function() { return this }}); obj.b.d` => `{c: '456'}`
- 7.构造函数：当一个函数用作构造函数时(使用new关键字), this是正在构造的新对象；虽然构造器默认返回this指的对象,但可手动返回其它对象
  - `function C() { this.a = '123'; console.log(this); return {b: '456'}; }; new C()` => `C {a: "123"} {b: "456"}`
- 8.dom事件处理函数：
  - `$0.addEventListener('click', function() { console.log(this); })` => `当前元素`
  - `$0.addEventListener('click', function() { (function() { console.log(this); })(); })` => `window`
- 9.内联事件处理函数
  - `onclick="console.log(this);"` => `当前元素`
  - `onclick="(function() { console.log(this); })()"` => `window`
- 10.箭头函数: this与封闭词法环境的this保持一致,即被设置为创建他时的环境; 如果通过`call/apply/bind`传递this,它将被忽略;
  - `(() => this)() === this` => `true`
  - `(() => this).call({a: 123}) === this` => `true`
  - `var obj = {f: function() { return () => this }}; (obj.f())() === obj` => `true`
  - `var obj = {f: function() { return () => this }}; var obj1 = {a: 123, f: obj.f}; (obj1.f())() === obj` => `false`
  - 箭头函数不能用作构造器,和 new 一起用会抛出错误 `var C = () => {}; new C();` // // TypeError: Foo is not a constructor
  - 箭头函数没有 prototype 属性 `var f = () => {}; f.prototype;` // undefined
  - 箭头函数也可以使用闭包
    - 标准闭包函数: `function f() { var i = 0; return function() { return ++i; } }; var a = f(); a(); a();`
    - 箭头函数的闭包：`var f = (i = 0) => () => ++i; var a = f(); a(); a();`
