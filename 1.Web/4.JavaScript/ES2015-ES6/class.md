### ES6的class可以看作只是一个语法糖, 它的绝大部分功能, ES5都可以做到

```js
// ES6类
let methodName = 'getAA';
class Point1 {
  // !!! 实例属性的新写法
  // 实例属性除了定义在 constructor() 方法里的 this 上, 也可以定义在类的最顶层
  _count = 0;

  // 构造方法
  // !!! 通过 new 命令生成对象实例时, 自动调用该方法
  // 一个类必须有 constructor 方法, 没有显式定义, 一个空的 constructor 方法会被默认添加
  // constructor 默认返回实例对象(即 this)
  constructor(x, y) {
    // !!! 实例的属性除非显示定义在其自身(即定义在this对象上),否则都是定义在原型上(即定义在class上)
    // Object.getOwnPropertyNames(p1) // [ 'x', 'y' ]
    // p1.hasOwnProperty('toString') // false
    // p1.__proto__.hasOwnProperty('toString') // true
    this.x = x;
    this.y = y;
  }
  // 原型方法
  toString() {
    return `[${this.x}, ${this.y}]`;
  }
  // !!! 取值函数(getter)与存值函数(setter)
  // 存取值函数是设置在属性的 Descriptor对象上
  // Object.getOwnPropertyDescriptor(Point1, 'html)
  get html() {
    return 3;
  }
  set html(x) {}
  // !!! 属性表达式
  // 类的属性名, 可以使用表达式
  [methodName]() {

  }
  // !!! Generator 方法
  // 如果某个方法之前加上星号, 就表示该方法是一个Generator函数
  // for (const v of new Point1()) console.log(v);
  // Symbol.iterator 方法会返回一个 Point1 的默认遍历器, for...of 循环会自动调用这个遍历器
  * [Symbol.iterator]() {
    for (let i = 1; i <= 3; i++) {
      yield i;
    }
  }
  // !!! 静态方法
  // 类相当于实例的原型, 所有在类中定义方法, 都会被实例继承
  // 如果一个方法前, 加上 static 关键字, 就表示该方法不会被实例继承, 而是直接通过类来调用
  // Point1.classMethod()
  // 静态方法中 this 指的是类, 而不是实例
  // 静态方法可以与非静态方法重名
  // 父类的静态方法, 可以被子类继承
  static classMethod() {
    return 'hello';
  }
}
// !!! 静态属性
// 静态属性指的是 Point1 本身的属性,即 Class.propName, 而不是定义在实例对象(this) 上的属性
Point1.staticProp = 1;
// !!! 类的方法定义在prototype对象上, 可以通过 Object.assign 直接添加
Object.assign(Point1.prototype, {
  getArea() {
    return this.x * this.y;
  },
});
let p1 = new Point1(3, 4);
console.log(p1.hasOwnProperty('toString'));
console.log(p1.__proto__.hasOwnProperty('toString'));
console.log(Object.getOwnPropertyNames(p1));
// Point1 === Point1.prototype.constructor // true
// p1.getArea(); // 12
// !!! 类内部定义的方法都是不可枚举的, 这一点与ES5的行为不一致
// Object.keys(Point1.prototype) // [ 'getArea' ] 自身+仅可枚举的
// Object.getOwnPropertyNames(Point1.prototype) // [ 'constructor', 'toString', 'getArea' ] 自身
// !!! p1是Point1的实例, 它的原型是 Point1.prototype, p1.__proto__ === Point1.prototype
// 可以通过 __proto__ 属性为 `类` 添加方法
// __proto__ 并不是语言本身的特性, 是各大厂商具体实现时添加的私有属性, 虽然很多现代浏览器都提供这个私有属性
// 但不建议在生产中使用该属性,避免对环境产生依赖
// 生产环境中, 可以使用 Object.getPrototypeOf 方法获取实例对象对原型
```

```js
// ES5函数
function Point2(x, y) {
  // !!! new.target 属性
  // ES6为 new 命令引入了一个 new.target 属性, 一般用在构造函数中, 返回 new 命令作用于的那个构造函数
  // 如果不是通过 nwe 命令或 Reflect.construct() 调用的, new.target 会返回 undefined
  if (new.target === Point2) {
    throw new Error('本类不能实例化');
  }
  this.x = x;
  this.y = y;
};
Point2.prototype = {
  constructor: Point2,
  toString() {
    return `[${this.x}, ${this.y}]`;
  },
};
Object.assign(Point2.prototype, {
  getArea() {
    return this.x * this.y;
  },
});
let p2 = new Point2(3, 4);
console.log(p2);
console.log(Object.keys(p2));
// Point2 === Point2.prototype.constructor // true
// p2.getArea(); // 12
// Object.keys(Point1.prototype) // [ 'constructor', 'toString', 'getArea' ]
// Object.getOwnPropertyNames(Point1.prototype) // [ 'constructor', 'toString', 'getArea' ]
```