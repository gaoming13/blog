#### 变量的解构赋值
- *只要数据结构具有 Iterator 接口, 都可采用数组形式赋值*

```js
// 1.数组的解构赋值
let [a, b, c = 3] = [1, 2];
let [ , b] = [1, 2, 3];
let [a, ...b] = [1, 2, 3];
let [a, [b1, b2]] = [1, [4, 5, 6]];
let [x, y, z] = new Set(['a', 'b', 'c']);

// 2.具有 Iterator 接口
function* fibs() {
  let a = 0, b = 1;
  while(true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
let [a1, a2, a3, a4] = fibs();

// 3.对象的解构赋值(:前的只是模式,值赋给了后面的)
let { p1, p2 } = { p1: 'a', p2: 'b' };
let { p1: {p2} } = { p1: { p2: 'c' }, p2: 'b' };

// 4.字符串的解构复制
const [a, b, c] = 'hello';
const [...f] = 'hello';
const {length: len} = 'hello';

// 5.函数参数的解构赋值
function add([x, y, z = 0]) { return x + y + z; }
add([1, 2]);

[[1, 2], [3, 4]].map(([a, b]) => a + b);
```

#### 实际应用

```js
// 1.变量交换值
let x = 1, y = 2;
[x, y] = [y, x];

// 2.从函数返回多个值
function ajax() { return { code: 0, message: '' } }
const { code: resCode, message } = ajax();

// 3.遍历Map解构
const map = new Map();
map.set('a', 'dog');
map.set('b', 'pig');
for (const [key, value] of map) {
  console.log({ key, value });
}
```