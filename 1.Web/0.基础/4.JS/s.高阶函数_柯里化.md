## 高阶函数
- 高阶函数英文叫 Higher-order function, f = (f1, f2) => f3
  - *接收一个或多个函数作参数* 或 *输出一个函数*
- 接收一个或多个函数作参数: Array.prototype.map / Array.prototype.filter / Array.prototype.reduce
- 输出一个函数:
  - isType函数
    ```js
    const isType = (type) => (obj) => Object.prototype.toString.call(obj) == '[object ' + type + ']';
    isType('String')('abc'); // true
    isType('Null')(null); // true
    ```
  - add函数
    ```js
    const add = (a) => {
      const sum = (b) => {
        a += b;
        return sum;
      };
      sum.toString = () => a;
      return sum;
    };
    add(1)(2)(3); // 6
    ```

## 柯里化
- 柯里化又叫部分求值, 只传递给函数一部分参数来调用它, 让它来返回一个新函数来处理剩下的参数
- 应用1: 延迟计算:
  ```js
  const add = (...arg) => arg.reduce((a, b) => a + b);

  const currying = (func) => {
    let argArr = [];
    const f = (...args) => {
      if (args.length == 0) {
        return func(...argArr);
      }
      argArr.push(...args);
      return f;
    };
    return f;
  };

  const sum = currying(add);
  console.log(sum(1, 2)(3)());
  ```
- 应用2: 动态创建函数:
  ```js
  function addEvent (type, el, fn, capture = false) {
    if (window.addEventListener) {
      addEvent = function (type, el, fn, capture) {
        el.addEventListener(type, fn, capture);
      }
    } else if (window.attachEvent){
      addEvent = function (type, el, fn) {
        el.attachEvent('on' + type, fn);
      }
    }
    addEvent(type, el, fn, capture);
  }
  addEvent();
  ```