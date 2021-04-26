- SVG介绍
  - SVG 指可伸缩矢量图形(Scaleble Vector Graphics)
  - SVG 使用 XML 格式定义图形
  - SVG 与诸如 DOM 和 XSL 之类的 W3C 标准是一个整体
  - 2003年1月, SVG 1.1 被确立为 W3C 标准
- HTML中使用
  - `<embed src="dog.svg" type="image/svg+xml" />` 允许使用脚本
  - `<object data="dog.svg" type="image/svg+xml"></object>` 不允许使用脚本
  - `<iframe src="dog.svg"></iframe>` 允许使用脚本
- `<svg>`
  - width/height 文档宽度/高度(默认百分百)
  - viewBox 最小x轴值, 最小y轴值, 宽度, 高度(相当于在原有图上裁剪后放大)
- `<rect>` 定义矩形
  - x/y x轴,y轴坐标
  - rx/ry x轴,y轴的圆角半径
  - width/height 宽度/高度
- `<circle>` 定义圆形
  - cx/cy 圆心x轴,y轴坐标
  - r 圆的半径
- `<ellipse>` 定义椭圆
  - cx/cy 圆心x轴,y轴坐标
  - rx/ry 沿x轴/y轴的半径
- `<line>` 定义直线
  - x1,y1,x2,y2 起始终止坐标
- `<polygon>` 定义多边形
  - points="x1,y1 x2,y2 x3,y3"
- `<polyline>` 定义直线
  - points="x1,y1 x2,y2 x3,y3"
- `<path>` 定义路径
  - d 路径数据
- `<text>` 定义文本
- `<textPath>`

- `<stroke>` 轮廊
  - stroke 颜色
  - stroke-width 厚度
  - stroke-linecap 风格 butt/round/square
  - stroke-dasharray 虚线
- `<g>` 用来组合容器,添加到g元素的属性会被所有子元素继承,可以被<use>元素来引用

```xml
<!-- XML声明 -->
<?xml version="1.0" encoding="utf-8"?>
<!-- 引用外部SVG的DTD,该DTD位于W3C,包含所有允许的SVG元素 -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<!-- SVG代码以<svg>元素开始,与html类似 -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200" viewBox="0 0 200 200">
<rect width="200" height="200" fill="#ffffff" cx="0" cy="0" />
<defs>
  <rect id="p" width="12" height="12" />
</defs>
<g fill="#000000">
  <use x="12" y="12" xlink:href="#p" />
</g>
</svg>
```