[babel]
- Babel核心功能 `@babel/core`
- Babel命令行工具 `@babel/cli`
- 配置文件 `.babelrc.js`
[@babel/cli]
- 执行: `npx babel 1.js -o 2.js`
- 执行: `npx babel ./a/ -d ./b/ --no-comments --minified --verbose`
[@babel/preset-env]
- target: 目标运行环境,eg: `targets: {node: '11'}` `targets: "> 0.25%, not dead"`,可覆盖 `.browserslistrc`
- useBuiltIns: 如何处理垫片,`entry`:完整的垫片引用,只在一个文件里,`usage`:按照每个文件的使用情况,`false`:不处理
- corejs: corejs的版本,useBuiltIns非false的时候需要引入
- debug: 是否开启调试模式
[core-js]
- ECMAScript垫片

### babel-standalone
- Babel的独立版本,可在非Node.js环境(包括浏览器)中使用
- 直接加载：https://unpkg.com/babel-standalone@6/babel.min.js
- 暴露 Babel.transform 等接口
  - `Babel.transform('class C1 extends React.Component {);', { presets: ['react'] }).code`
- 自动转换 script 标签内容
  - `<script type="text/jsx" src="./app.js"></script>`
