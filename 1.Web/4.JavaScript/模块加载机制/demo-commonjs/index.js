// node index.js
// CommonJs模块输出的一个值的拷贝
const lib = require('./lib');

console.log(lib); // 0
setTimeout(() => {
  console.log(lib); // 10
}, 2000);