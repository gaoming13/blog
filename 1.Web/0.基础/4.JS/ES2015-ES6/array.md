### array扩展
- 1.扩展运算符(spread),好比 rest 参数的逆运算
  - console.log(...[1, 2, 3])
  - add(...numbers); function add(x, y) {}
- 2.替代函数的apply方法
  - *由于扩展运算符可以展开数组,所以不再需要apply方法,将数组转换为参数了*
  - function f(x, y) {}; f.apply(null, [1, 2]); // es5
  - function f(x, y) {}; f(...[1, 2]); // es6
- 3.实现了 Iterator 接口的对象
  - *任何定了遍历器(Iterator)接口的对象,都可以用扩展运算符转换为真正的数组*
  ```js
  let a = {};
  a[Symbol.iterator] = function*(){
    for (let i = 1; i <= 3; i++) yield i;
  };
  [...a]
  ```
- 4.新增静态方法 Array.from() 用于将两类对象转换为真正的数组
- 5.新增静态方法 Array.of() 用于将一组值转换为数组
- 6.新增 Array.prototype.copyWithin() 复制替换
- 7.新增 Array.prototype.find() / Array.prototype.findIndex() 查找符合条件的成员
- 8.新增 Array.prototype.fill() 填充数组
- 9.新增 Array.prototype.entries() / Array.prototype.keys() / Array.prototype.values()
- 10.Array.prototype.includes()
- 11.Array.prototype.flat() / Array.prototype.flatMap()
- 12.es6明确数组空位转 undefined