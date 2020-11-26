## Webpack4

```js
module.exports = {
  optimization: {
    // 是否压缩,默认true
    minimize: false,
    // 压缩器,默认TersePlugin
    minimizer: [
      new CssMiniizer(),
      // 默认压缩器
      '...',
    ],
    // 模块拆封策略
    splitChunks: [
      /* 拆封模块的范围
        async: 只把异步加载的模块单拎出来(异步模块间复用)
          - 非异步模块 => 原始chunk(entry1.x.js)
          - 共同异步模块 => 新增共用chunk(1.x.js)
          - 非共同异步模块 => 新增单独chunk(3.x.js)
        initial: 只把入口不同的相同同步加载模块单独拎出来(非异步模块间复用)
          - 异步模块 => 新增单独chunk(4.x.js)
          - 共同非异步模块 => 新增共用chunk(vendors~entry1~entry2.x.js)
          - 非共同非异步模块 => 原始chunk(vendors~entry1.x.js)
        all: 以上两者
          - 能复用的非异步模块 => 新增共用chunk(vendors~entry1~entry2.x.js)
          - 能复用的异步模块 => 新增共用chunk(1.x.js)
          - 不能复用的模块 => 新增单独chunk(3.x.js)
      */
      chunks: 'async',
    ],
    // 拆封runtime(按entry),3种表示法含义相同
    runtimeChunk: true,
    runtimeChunk: 'multiple',
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`
    },
    // 共用runtime,2种表示法含义相同
    runtimeChunk: 'single',
    runtimeChunk: {
      name: 'runtime'
    },
  },
};
```