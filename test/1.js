// 特权方法(privileged method)是能够访问函数私有变量/函数的公有方法
// 在对象上有2种方式创建特权方法
// 1.在构造函数中实现
  // - 这样之所以可行,是因为定义在构造函数中的特权方法其实是个闭包,它具有访问构造函数中定义的所有变量和函数的能力
  // function F1(a, b) {
  //   // 私有变量
  //   let sum = a + b;
  //   // 私有函数
  //   function f1() { return sum; }
  //   // 特权方法1
  //   console.log(this);
  //   this.f2 = function() {
  //     sum++;
  //     return f1();
  //   };
  // }
  // const obj = new F1(1, 2);


// 2.通过私有作用域定义变量和函数来实现
(function() {
  // 私有变量
  let sum;
  // 私有函数
  function f1() { return sum; }
  // 构造函数
  F1 = function(a, b) {
    sum = a + b;
  }
  F1.prototype.f2 = function() {
    sum++;
    return f1();
  }
})();
const obj = new F1(1, 2);
const obj1 = new F1(1, 2);
console.log(obj.f2());
console.log(obj1.f2());
