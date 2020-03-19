## PWA(Progressive Web App) 渐进式网络应用，是一种理念，使用多种技术来增强web app的功能。

### Manifest(Web应用程序清单)
- 文档：https://developer.mozilla.org/zh-CN/docs/Web/Manifest
- 示例：
  - https://m.weibo.cn/
  - https://h5.ele.me/
  - https://www.instagram.com/
  - https://mobile.twitter.com/
- 在一个JSON文件中提供有关应用程序的信息
- 目的是将Web应用程序安装到设备的主屏幕，为用户提供更快的访问和更丰富的体验
- Web应用程序清单是PWA的Web技术集合的一部分

### Service Worker(一种 JavaScript Worker, 浏览器在后台独立于网页运行的脚本)
- 文档：[https://developers.google.com/web/fundamentals/primers/service-workers
- `chrome://inspect/#service-workers` 查看 Service Worker 详情
- `navigator.serviceWorker.register` 参数 `updateViaCache` 忽略缓存表头选项
  - imports(默认) imports使用缓存表头
  - all 全部使用缓存表头
  - none 都不使用缓存表头
- 用 `/dir1/sw.js` 当 Worker，`sw.js` 只能看到 `/dir1/` 开头页面的 `fetch` 事件
- Service Worker 只能控制作用域内的客户端；可以通过 `navigator.serviceWorker.controller` 检测客户端是否受控制
- 开发过程中可以用 `localhost` 使用 Service Worker，网站部署需要 HTTPS
- 流程1：首次打开：`sw.js` `v1.install` -> `v1.activate`
- 流程2：检测到 `sw.js` 更新：`v2.install` -> `v1 activated and is running,v2 waiting to activate`
- 流程3：关闭后后台运行：`v2.activate`
- 在成功安装并处于`活动状态`之前，Service Workder 不会收到 `fetch/push` 等事件
- `self.skipWaiting()` 可跳过等待，在安装完后立即激活
- 激活 Service Worker 后，您可以通过在其中调用 `clients.claim()` 控制未受控制的客户端
- 在执行导航和功能事件后，浏览器将自动检查更新，但也可手动触发更新 `reg.update()`
- devTool `Update on reload` 重新获取sw.js,即使与之前的相同也运行install,并跳过wait

### 类库 Workbox (https://developers.google.com/web/tools/workbox/guides/get-started)