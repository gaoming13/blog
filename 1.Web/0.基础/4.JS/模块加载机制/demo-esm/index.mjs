// node --experimental-modules index.mjs
// ES6模块输出的是值的引用
import { count } from './lib.mjs';
console.log(count); // 0

setTimeout(() => {
  console.log(count); // 10
}, 2000);