### 1.unicode引用

- 兼容性最好，支持ie6+ 以及现代浏览器
- 至此好按字体方式调整图标大小，颜色等
- 只能使用单色图标

```css
@font-face {
  font-family: "iconfont";
  src: url("iconfont.eot"); /* IE9 */
  src: url("iconfont.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
  url("iconfont.woff") format("woff"), /* chrome、firefox */
  url("iconfont.ttf") format("truetype"), /* chrome、firefox、opera、Safari, Android, iOS 4.2+ */
  url("iconfont.svg#uxfonteditor") format("svg"); /* iOS 4.1- */
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
```

```html
<i class="iconfont">&#x33;</i>
```

### 2.font-class引用

- 兼容性好，支持ie8+ 以及所有现代浏览器
- 相比 unicode 语意明确，更容易分辨这个icon是什么

```css
.icon-xxx:before {
  content: "\e7d5";
}
```

```html
<i class="iconfont icon-xxx"></i>
```

### 3.symbol引用

- 兼容性较差，支持 ie9+ 以及现代浏览器
- 浏览器渲染svg的性能一般，还不如 png
- 支持多色图标，不再受到单色限制
- 通过技巧，支持像字体那样，通过 `font-size`,`color` 来调整样式

```css
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
```

```html
<svg style="position: absolute; width: 0; height: 0;" width="0" height="0" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <symbol id="icon-xxx" viewBox="0 -128 1024 1024"></symbol>
    <symbol id="icon-yyy" viewBox="0 -128 1024 1024"></symbol>
  </defs>
</svg>
<svg class="icon" aria-hidden="true">
  <use xlink:href="#icon-xxx"></use>
</svg>
```