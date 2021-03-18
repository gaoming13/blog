let obj1 = { a: 1 };
let obj2 = { b: 2 };
let obj3 = { c: 3 };
obj1.__proto__ = obj2;
obj2.__proto__ = obj3;
console.log(obj1);

