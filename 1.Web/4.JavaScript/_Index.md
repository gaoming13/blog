[ECMAScript]
- ECMA-262
  - ECMAScript 5 (2009-12发布)
  - ECMAScript 6 (ECMAScript 2015) (2015-06发布)
- ECMAScript是一种脚本在语法和语义上的标准
- Javascript、JScript和ActionScript等脚本语言都是基于ECMAScript标准实现的
- Javascript、JScript和ActionScript中声明变量、操作数组等语法完全一样，因为都是ECMAScript
- Javascript 是由 ECMAScript、DOM 和 BOM 三者组成的
- 在操作浏览器对象等方面有各自独特的方法，都是各自语言的扩展
- 环境兼容检查：https://www.npmjs.com/package/es-check
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
[npx]
- npx命令,不污染本机
- npx -p node@6 node -v
- npx browserslist
[browserslist]
- https://github.com/browserslist/browserslist
- https://github.com/browserslist/browserslist-example
- npx browserslist --coverage "defaults,> 1% in CN"
- npx browserslist --coverage "defaults and last 2 chrome versions"
- npx browserslist "defaults or cover 90% in CN"
- 配置文件：`.browserslistrc` 或 `package.json`中`browserslist`字段
- https://caniuse.com/ web技术浏览器支持查询
[compat-table]
- ECMAScript兼容性表
- http://kangax.github.io/compat-table/es6/

__proto__和prototype到底有什么区别 https://www.jianshu.com/p/80bcf8b2004e



