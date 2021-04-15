function A() {
  this.a = 1;
}
function B() {}
B.prototype = new A();

const obj1 = new B();
obj1.__proto__.a = 2;
// console.log(obj1.a);
console.log(obj1);
const obj2 = new B();
// console.log(obj2.a);
console.log(obj2);