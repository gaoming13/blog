### REC:用户界面属性(Basic User Interface) Level 3
- 用来定义与用户界面相关的功能
- 1.`cursor` 自定义鼠标样式
- 2.`-moz-appearance (-webkit-appearance): none/button/checkbox/...` 浏览器渲染所用的主题
- 3.`outline: 宽度 样式 颜色;` 用来设置一个或多个单独的轮廓属性；轮廓不占用空间，描绘在内容之上；`outline-offset` 边距
- 4.`box-sizing: content-box|borer-box;` content | content+padding+border
- 5.`resize: none|both|horizontal|vertical` 控制元素可调整大小性，任意元素加上`overflow:scroll`可调大小
- 6.`text-overflow: clip|ellipsis|<string>` 块级元素溢出的内容有效，需与 `white-space:nowrap; overflow:hidden;` 配合使用
- 7.`user-select: auto|none|text|all|contain` 控制用户能否选中文本; 双击子元素选中全部(all)