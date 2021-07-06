#### 概念
- `<!DOCTYPE html>` 不是HTML标签，它告诉浏览器页面由HTML哪个版本编写，对大小写不敏感; HTML5 必须以 `<!DOCTYPE html>` 作为首行
- `<script>` 阻塞后面的执行;
- `<script async>` 不阻塞后面的执行,下载完立马执行
- `<script defer>` 不阻塞后面的执行,下载完等渲染结束才执行
- HTTP单域名最大链接数 最大不超过8 http://www.stevesouders.com/blog/2008/03/20/roundup-on-parallel-connections/

#### XHTML与HTML
- XHTML、HTML、SVG、MathML 都是命名空间规范
- 语言基础不同
  - XHTML基于可扩展标记语言(XML)
  - HTML基于标准通用语言(SGML)
- XHTML重写了HTML规范，比HTML更加严格
  - 存在DTD定义规则
  - 标记必须有结束标签
  - 元素和属性的名字必须小写
  - 属性必须用双引号
  - 元素必须正确嵌套
  - 所有特殊符号"<&"用编码表示
  - 不能在注释中使用"--"
- HTML5只需写 `<!DOCTYPE html>`，不需要对DTD进行引用
  - 因为HTML5不是基于SGML的，因此不需要对DTD进行引用
  - 而HTML4是基于SGML的，因此需要对DTD进行引用

#### 怪异模式与标准模式
- 1.怪异模式(Quirks mode) 排版会模拟 Navigator 4 与 Internet Explorer 5 的非标准行为
- 2.接近标准模式(Almost standards mode) HTML标准,只有少数的怪异行为被实现
- 3.标准模式(Standards mode) HTML标准
- 标准盒模型与怪异盒模型(低版本ie)
  - 怪异盒模型的内容区 padding 和 border 会包进去(box-sizing:border-box;)

#### 跨域属性 crossOrigin
`<audio>、<img>、<link>、<script>、<video>` 均有一个跨域属性，允许你配置元素获取数据的 CORS 请求。
- 1.没有该属性 表示非CORS请求
- 2.`crossOrigin=''` / `crossOrigin='anonymous'` CORS 请求头不带cookie
- 3.`crossOrigin='use-credentials'` CORS 请求头带cookie
> 参考：https://developer.mozilla.org/zh-CN/docs/Web/HTML/CORS_settings_attributes

#### 焦点管理
- 1.DOM属性 `document.activeElement` 获取当前焦点的DOM
- 2.DOM方法 `$0.hasFocus()` 当前节点是否获取了焦点

#### 内容预加载
- 1.`rel='preload'` 优先级最高,在浏览器的主渲染机制介入前就进行预加载
- 1.`rel='prefetch'` 优先级低,供之后的页面使用

#### 图片懒加载
- `<img src="demo.jpg" loading="lazy" />`

#### 输入提示
```html
<input list="countries" name="country">
<datalist id="countries">
  <option value="选项1">
  <option value="选项2">
</datalist>
```

#### 图片适配
```html
<picture>
  <source media="(min-width:768px)" srcset="middle.jpg">
  <source media="(min-width:495px)" srcset="small.jpg">
  <img style="width: auto;" />
</picture>
```

#### 全局属性
- accesskey 表示聚焦当前元素的快捷键`control+option+accesskey` `HTMLElement.accesskey`
- class 元素类型
- contenteditable 表示元素是否可被用户编辑(true/false) `HTMLElement.contentEditable`
  - 1.`HTMLElement.isContentEditable` (true/false)
  - 2.Chrome DOM方法 `document.designMode` ('on'/'off')
- id 元素ID
- inputmode 表示编辑元素内容时虚拟键盘的类型(none/text/decimal/numeric/tel/search/email/url) `HTMLElement.inputmode`
- data-* 自定义属性,名字只允许[a-z0-9-.:]
  - 1.`HTMLElement.dataset` 获取所有自定义属性值 => `DOMStringMap`
- draggable 表示元素能否拖动(true/false) `HTMLElement.draggable`
- hidden 表示元素是否渲染(true/false) `HTMLElement.hidden`
- style 表示元素的样式 `HTMLElement.style` => `CSSStyleDeclaration`
- tabindex 表示元素获取焦点的顺序值
- title 表示元素的咨询信息文本 `HTMLElement.title`

#### b/strong、i/em区别
- 都可加粗，strong强调语义
- 都可倾斜，em强调语义

#### 为什么img是行内元素确还能设置高属性
- img是行内元素，也同时是置换元素，置换元素一般内置宽高属性
- 置换元素会根据标签属性来显示元素，繁殖就是非置换元素了