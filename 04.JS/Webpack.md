## Webpack4
- hash 所有文件相同
- chunkhash 跟chunk走
- contenthash 跟单文件走

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

    /**
     * 模块拆封策略
     * 基于以下条件自动分割块：
     * 1.模块能被共享或来自 `node_moudle` 文件夹
     * 2.新模块应大于20kb(压缩前)
     * 3.按需加载模块的最大并行请求数 <= 30
     * 4.初始页面加载模块的最大并行请求数 <= 30
     * 注：单试图满足最后2个条件的时候,偏好生成更大体积的块
     * 选择默认配置以适合Web性能最佳实践
     */
    splitChunks: [
      // 块的来源和块名称的定界符(vendors~main.js)(默认:~)
      automaticNameDelimiter: '~',

      /* 将选择哪些块进行拆封(默认:async)
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

      // 按需加载模块的最大并行请求数(默认30)
      maxAsyncRequests: 30,
      // 初始页面模块的最大并发请求数(默认30)
      maxInitialRequests: 30,

      // 多少个相同的小块才拆分(默认1)
      minChunks: 1,
      // 生成模块的最小大小(B)(默认20000,即20KB)
      minSize: 20000,

      // 强制分割阀值(默认50000,即50kB)
      // 忽略：minRemainingSize, maxAsyncRequests, maxInitialRequests
      enforceSizeThreshold: 50000,

      // 拆封后剩余块的最小大小限制
      minRemainingSize: 0,

      // 尝试将大于maxSize的模块,拆分为多个较小的模块
      // 小模块 >= minSize
      // 优先级：minSize > maxSize > maxAsyncRequests / maxInitialRequests
      maxSize: 0,
      // 只针对按需加载模块
      maxAsyncSize: 0,
      // 只针对初始加载模块
      maxInitialSize: 0,

      /**
       * 分割块的名称(默认false)
       * 给不同分割块相同的名字，将会合并文件
       */
      name: false,

      // 模块名称的前缀
      automaticNamePrefix: '',

      // 缓存组
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      },
    ],

    /*
      - 拆封runtime(按entry),3种表示法含义相同
        - runtimeChunk: true
        - runtimeChunk: 'multiple'
        - runtimeChunk: { name: entrypoint => `runtime~${entrypoint.name}` }
      - 共用runtime,2种表示法含义相同
        - runtimeChunk: 'single'
        - runtimeChunk: { name: 'runtime' }
     */
    runtimeChunk: true,
  },
};
```