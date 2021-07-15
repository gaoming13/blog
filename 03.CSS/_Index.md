#### CSS3是层叠样式表(Cascading Style Sheets)语言的最新版本，旨在扩展CSS2.1
- CSS被分为不同等级：CSS1 现已废弃，CSS2.1 是推荐标准，CSS3 分为多个小模块且正在标准化中
- CSS3模块状态：W3C会定期发布 CSS 标准的快照，列出 CSS 2.1 和 成熟的模块
- CSS规格说明：https://www.w3.org/Style/CSS/current-work
- CSS浏览器兼容性查询: http://caniuse.com/

### 浏览器的内核
- 浏览器的内核分为两部分：渲染引擎(Layout Engine 或 Rendering Engine) 和 JS引擎
- 随着JS引擎越来越独立，内核也成了渲染引擎的代称
- 渲染引擎包括：
  - HTML解释器、CSS解释器、布局、网络、存储、图形、音视频、图片解码的等
- 常见的浏览器内核(webkit/trident/gecho/presto)
  - 1.Chrome(谷歌): webkit(新版后变成了blink,与Opera)
    - -webkit-xxx
  - 2.IE: Trident内核
    - -ms-xxx
  - 3.Edge: Webkit内核->Blink内核
  - 4.Firefox(火狐): Gecho内核
    - -moz-xxx
  - 5.Safari: Webkit内核
    - -webkit-xxx
  - 6.Opera(欧朋): Presto(改为blink)
    - -o-xxx