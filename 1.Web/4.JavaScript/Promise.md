```js
let promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([1, 2, 3])
  }, 1000)
}).then(res => {
  console.log(res)
}).catch(res => {
  console.log(res)
}).finally(() => {
  console.log('finally')
})
```

// Promise.resolve(value)方法返回一个以给定值解析后的Promise对象
```js
let promise2 = Promise.resolve([1, 2, 3]).then(res => {
  console.log(res)
}).catch(res => {
  console.log(res)
}).finally(() => {
  console.log('finally')
})
```

// Promise.all(iterable) 方法返回一个 Promise 实例，此实例在 iterable 参数内所有的 promise 都“完成（resolved）”或参数中不包含 promise 时回调完成（resolve）
```js
Promise.all([promise1, promise2]).then(res => {
  console.log('then')
}).catch(res => {
  console.log('catch')
})
```

// Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。
```js
Promise.race([promise1, promise2]).then(res => {
  console.log('then')
}).catch(res => {
  console.log('catch')
})
```

// 链式调用
```js
Promise.resolve('hello').then(res => {
  return new Promise((resolve, reject) => {
    setTimeout(() => { resolve(res + ' word') }, 1000)
  })
}).then(res => {
  console.log(res)
})
```

// 优先级
// setTimeout: 下一轮"事件循环"开始时执行
// Promise.resolve(): 本轮"事件循环"结束时执行
// console.log: 立即执行
```js
setTimeout(() => {
  console.log(3)
}, 0);

Promise.resolve().then(() => {
  console.log(2)
})

for (let i = 0; i < 10000; i++) {
  console.log(1)
}
```