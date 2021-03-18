### object扩展
- 1.属性的简洁表示法 `let person = { age, name }`
- 2.属性名表达式
  - 1.JavaScript定义对象属性,有2中方法
    - 1.`obj.foo = true`
    - 2.`obj['f' + 'oo'] = true`
  - 2.使用字面量定义对象
    ```js
    let obj = { ['a'+'bc']: 123 };
    ```
#### 属性的可枚举性和遍历

1.可枚举性
- *对象的每个属性都有一个描述对象(Descriptor),来控制属性的行为*
- Object.getOwnPropertyDescriptor() 可以获取该属性的描述对象
  - `Object.getOwnPropertyDescriptor(obj, 'foo')`
  - `{value: 123, writable: true, enumerable: true, configurable: true}`
- enumerable 属性, 可枚举性, 如果该属性为 false, 某些操作会忽律该属性
  - for...in: 遍历对象自身和继承的可枚举属性
  - Object.keys(): 对象自身的所有可枚举属性的键名
  - JSON.stringify(): 只串行化对象自身的可枚举的属性
  - Object.assign(): 只拷贝对象自身的可枚举属性 // es6

2.属性的遍历
- 1.for..in: 遍历对象自身和继承的可枚举属性
- 2.Object.keys(): 对象自身的所有可枚举属性的键名
- 3.Object.getOwnPropertyNames(): 对象自身的所有属性的键名
- 4.Object.getOwnPropertySymbols(): 对象自身的所有 Symbol 属性的键名
- 5.Reflect.ownKeys(): 对象自身的(不含继承的)所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举
- 遍历次序规则：
  - 1.首先遍历所有数值键，按照数值升序排列。
  - 2.其次遍历所有字符串键，按照加入时间升序排列。
  - 3.最后遍历所有 Symbol 键，按照加入时间升序排列。

#### super 关键字
- es6 又新增了一个关键字supper, 指向当前对象的原型对象