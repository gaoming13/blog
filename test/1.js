function A() {
  this.color = ['a', 'b', 'c']; // 实例属性
  this.addColor = (color) => this.color.push(color); // 实例方法
}
A.prototype.getColor = function() { return this.color; }; // 原型方法
function B() {
  A.apply(this);
  this.age = [1, 2, 3]; // 实例属性
  this.addAge = (age) => this.age.push(age); // 实例方法
}

// 寄生式组合继承
const a = Object.create(A.prototype);
a.constructor = A;
B.prototype = a;

// 寄生式组合继承后的原型链
// __proto__         ... B.prototype
//   constructor: A()
//   getAge
//   __proto__       ... A.prototype
//     constructor: A()
//     getColor
//     __proto__     ... Object.prototype


B.prototype.getAge = function() { return this.age; }; // 原型方法

const b = new B();
b.addColor('d');
console.log(b);