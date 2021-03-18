#### export 与 import

```js
// lib/math.js
export function sum(x, y) {
  return x + y;
}
export var pi = 3.141583;

// lib/mathplus.js
export * from 'lib/math';
export var e = 2.718;
export default function() {
  console.log('default');
}

// import1
import * as math from 'lib/math';
// import2
import {sum, pi} from 'lib/math;
// import3
import ln, {pi, e} from 'lib/mathplus';
```

#### 浏览器中模块加载

```html
<!-- 都是异步加载(默认defer, 也可以是async) -->
<script type="module" src="./foo.js"></script>
<!-- 等同于(异步加载,页面渲染完才执行) -->
<script type="module" src="./foo.js" defer></script>
```