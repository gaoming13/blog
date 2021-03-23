


(() => {
  function A(list) {
    this.list = list;
    this.name = 1;
  }
  A.prototype.getList = function() {
    return this.list;
  }
  function B(list) {
    this.list = list;
  }

  /*
  New的实现：等价于：
  1.一个继承自 A.prototype 的新对象被创建：let t1 = new Object(); t1.__proto__ = A.ptototype;
    - 或者：let t1 = new Object(); Object.setPrototypeOf(t1, A.prototype);
  2.使用指定的参数调用构造函数 A，将 this 绑定到新创建的对象：A.apple(t1, [['a']]);
  3.由构造函数返回的对象就是 new 表达式的结果；若没有显式返回一个对象，则使用1创建的对象
  */
  const t1 = new A(['a']);
  // New 2
  // let t1 = new Object();
  // Object.setPrototypeOf(t1, A.prototype);
  // A.apply(t1, [['a']]);

  /*
  原型链继承：本质是重写原型对象，代之以一个新类型的实例
  - B的新原型 不仅有了 new A() 实例的全部属性和方法，并且还指向了 A 的原型，所以还继承了 Animal 原型上的属性和方法
  1. B.prototype.__proto__ = A.prototype;
  2. A.apply(B.prototype, [['c', 'd']]);
  原型链继承方案有以下缺点：
  1. 多个类型对引用类型的操作会被篡改
  2. 子类型的原型上的 constructor 属性被重写了
  3. 给子类型原型添加属性和方法必须在替换原型之后
  4. 创建子类型的实例无法向父类型的构造函数传参
  */
  B.prototype = t1;
  B.prototype.constructor = B;

  const a1 = new A(['a']);
  a1.list.push('c');
  console.log(a1);

  const b1 = new B([1, 2]);
  b1.list.push(3);
  b1.name = 2;
  console.log(b1);

  const b2 = new B([3, 4]);
  console.log(b2);

  console.log(B.prototype.__proto__ === A.prototype);
});

console.log('------------------------------');

(() => {
  class A {
    list = [];
    name = 1;
    constructor (list) {
      this.list = list;
    }
  }
  class B extends A {
  }

  const a1 = new A(['a']);
  console.log(a1);
  a1.list.push('c');
  a1.name = 2;

  const b1 = new B([1, 2]);
  b1.name = 10;
  console.log(b1);

  const b2 = new B([1, 2]);
  console.log(b1);
});
