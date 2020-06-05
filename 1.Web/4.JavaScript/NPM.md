> https://docs.npmjs.com/cli-documentation/cli

【NPM】
- 安装：`curl -L https://www.npmjs.org/install.sh | sh`
- `npm -l` 显示帮助信息概况
- `npm help <command>` 显示某个命令的帮助信息
- `npm list -g -depth 0 -long` 全局包列表
- `npm install -g <package>@ver` 安装全局包
- `npm uninstall -g <package>` 卸载全局包
- `npm view lodash@4.17.13`、`npm view lodash@4.17.13 keywords` 显示某个包的详情
- `npm outdated` 查看哪些包需要更新
- `^1.5.1` 限制主版本号，允许安装 大于`1.5.1`且小于`2.0.0`
- `~1.5.1` 限制次版本号，允许安装 大于`1.5.1`且小于`1.6.0`
- `1.5.1` 精确版本号
- `npm shrinkwrap` 生成npm-shrinkwrap.json锁定依赖
[修改源]
- `npm config get registry` 获取源的配置
- `npm config set registry https://registry.npm.taobao.org` 修改源为淘宝镜像
- `npm config set registry https://registry.npmjs.com/` 修改源为官方(用于发包)
[更新npm]
- `npm view npm` 查看npm最新版本
- `npm -v` 查看当前版本
- `npm install npm -g` 安装最新版本
[发布包]
- `npm adduser` 注册新用户
- `npm login` 登录
- `npm owner ls` 列出当前的所有者
- `npm version 1.2.2-beta.0` 更新package.json,同时创建一个git标签
- `npm publish` 发布正式版本
- `npm publish --tag beta` 发布测试版本
- `npm info` 查看已发布的 beta与latest版本
[发布的包.忽略文件]
- 白名单方式：`package.json files字段`
- 黑名单方式：`.npmignore` 没有该文件默认使用.gitignore文件
[NPX]
- `npx node@9.2.0 -v` 使用任意版本的软件执行命令
- `npx -p node@6 node -v`
- `npx browserslist`
[升级本机node至最新稳定版]
```sh
# 安装n工具,这个工具是专门用来管理node.js版本的
sudo npm install -g n
# 安装最新稳定版
sudo n stable
# 查看当前版本
node -v
```
[NPM的CDN]
- https://unpkg.com/
- 知乎：unpkg.zhimg.com
  - https://unpkg.zhimg.com/workbox-cdn@4.3.1/workbox/workbox-sw.js
- 饿了么：npm.elemecdn.com
- https://www.jsdelivr.com/features

【mocha】
- `mocha` 默认执行第一层 `test/*.js`
- `mocha test/1.js test/2.js` 多个测试脚本
- `mocha spec/{my,awesome}.js`  `mocha test/unit/*.js` 使用通配符
- `mocha --recursive` 递归执行所有测试脚本
- `mocha test/1.js --watch` 检测脚本变化
- `mocha test/1.js --reporter tap` 指定测试报告格式(默认spec)
- `mocha test/1.js --reporter mochawesome` `npm i mochawesome` HTML测试报告格式
- `mocha test/1.js -R markdown > spec.md` 生成MD规格文件
- `mocha --bail` 只要一个测试用例没有通过，后面停止执行
- `mocha -t 5000` 设置每个测试用例最多执行时间(默认2000ms)，超时就报错

【Codecov】
- 配置token `codecov.yml`
```yml
codecov:
  token: baf29639-6f83-4e58-ae29-e1c86f7b8db9
```
- 上传测试结果 `"codecov": "cat coverage/lcov.info | codecov"`
