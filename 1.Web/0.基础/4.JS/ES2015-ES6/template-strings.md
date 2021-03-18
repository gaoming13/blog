### 模版字符串
- 模版字符串是增强版的字符串, 用反引号(`)标示
- 大括号内可以放任意的 JavaScript 表达式
- 模版字符串可以紧跟在一个函数名后面, 该函数将被调用来处理模版字符串
- String.raw(): 还原模版字符串的处理方法

```js
// 多行表示,引入函数
let name = '小米';
let sex = 1;
let getSexLabel = (sex) => sex === 1 ? 'boy' : 'girl';
console.log(`
Hello ${name}
I'm a ${getSexLabel(sex)}.
`.trim());

// 嵌套
let animals = ['dog', 'cat', 'hourse'];
console.log(`<ul>${animals.map(animal => `<li>${animal}</li>`)}</ul>`);

// 标签模版
let a = 5;
let b = 10;
tag`Hello ${ a + b } world ${ a * b }`;
// 等同于
tag(['Hello ', ' world ', ''], 15, 50);
```