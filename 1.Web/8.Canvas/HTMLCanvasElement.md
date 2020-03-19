> https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API

- Canvas `Prototype：HTMLCanvasElement > HTMLElement > Element > Node > EventTarget > Object`
  - `c.width` 元素所占空间的宽度
  - `c.height` 元素所占空间的高度
  - `c.toDataURL(optional DOMString type, any ...args) => DOMString` 返回DataURL
    - 默认值 `image/png`
    - type值为 `image/jpeg`/`image/webp`,且第二个参数值在0-1之间的话,会被当作图片质量参数
  - `c.toBlob(Function callback, optional DOMString type, any ...args) => Blob`
    - 返回Blob对象,这个文件可能缓存在硬盘上,也可能存储在内存中
    - 默认type `image/png`
  - `c.getContext(DOMString contextId) => object` 返回canvas绘制上下文,一个绘制上下文可以在canvas上绘图
    - `getContext('2d')` 返回 `CanvasRenderingContext2D` 对象
    - `getContext('webgl')` 返回 `WebGLRenderingContext` 对象
- `CanvasRenderingContext2D` `Prototype：CanvasRenderingContext2D > Object`
  - `ctx.fillStyle` 填充色,默认值 `#000`
    -
  - `ctx.cleanRect(x, y, width, height)` 擦除指定矩形区域内容
  - `ctx.fillRect(x, y, width, height)` 绘制填充矩形
    - `fillStyle`
