> [参考](https://hackernoon.com/the-art-of-naming-variables-52f44de00aad)

> 好的命名至关重要，尤其在动态类型的语言中，可以提高可读性，帮助理解变量

### Arrays

数组大都是多个，变量名使用复数是有意义的

```js
// bad
const fruit = ['apple', 'banana', 'cucumber'];
// okay
const fruntArr = ['apple', 'banana', 'cucumber'];
// good
const frunts = ['apple', 'banana', 'cucumber'];
// great
const fruntNames = ['apple', 'banana', 'cucumber'];
const frunt = [
  {name: 'apple', genus: 'malus'},
  {name: 'banana', genus: 'musa'},
  {name: 'cucumber', genus: 'cucumis'},
];
```

### Booleans

布尔类型只能包含2个值，即 `true` 或 `false`

使用 `is`,`has`,`can`之类的谓词前缀将有助于读者推断变量类型

```js
// bad
const open = true;
const write = true;
const fruit = true;
// good
const isOpen = true;
const canWrite = true;
const hasFruit = true;
```

当使用谓词命名 返回布尔值的函数 时，命名函数的返回值x就变得很棘手

```js
const user = {
  fruits: ['apple'],
};
const hasFruit = (user, fruitName) => user.fruits.includes(fruitName);
const x = hasFruit(user, 'apple');
```

在这种情况下，可以给谓词加上 `check` 或 `get` 前缀

```js
const user = {
  fruits: ['apple'],
};
const checkHasFruit = (user, fruitName) => user.fruits.includes(fruitName);
const hasFruit = checkHasFruit(user, 'apple');
```

### Numbers

对于数字，可以考虑描述数字的单词。例如：`min` `max` `total` `sum`

```js
// bad
const pugs = 3;
// good
const minPugs = 1;
const maxPugs = 2;
const totalPugs = 10;
```

### Functions

函数应使用动词+名词来命名。当函数对资源执行某种类型的操作时，从其命名就能看出来。

一个很好的格式是 `actionResource`，例如：`getUser`

```js
// bad
userData(userId)
userDataFUnc(userId)
// good
totalOfItems(items)
getUser(userId)
calculateTotal(items)
```

转换值类的函数 的常见写法是在函数名前添加 `to`

```js
// 我喜欢这种命名
toDollars('enros', 20);
toUppercase('a string');
```

另外一个常见命名模式是在项目上进行迭代。在函数内部接收参数时，请使用数组名称的单数形式。

```js
// bad
const newFruits = fruits.map(x => {
  return doSomething(x);
});
// good
const newFruits = fruits.map(fruit => {
  return doSomething(fruit);
});
```

### 总之

你如何命名变量并不比一致的命名变量重要。

如果能保持一致的命名规则，那么代码库更容易推论，下一个开发者也可以减少思考。