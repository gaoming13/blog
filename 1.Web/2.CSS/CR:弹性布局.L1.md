### CR:弹性布局(Flexible Box Layout) Level 1
- 父元素使用 `display:flex` 或 `display:inline-flex` 来定义 `弹性盒子(Flexbox)`
- 此时，父元素为 `flex容器(Flex Container)`, 子元素为 `flex子元素(Flex item)`
- 此时，会产生 `伸缩格式化上下文FFC(flex formatting context)`
- 水平向右为`主轴(Main Axis)`,垂直向下为`交叉轴(Cross Axis)`,主轴和交叉轴位置与方向由 `flex-direction` 定义,默认 `row`

#### flex容器属性
- flew-flow 是 flex-direction、flex-wrap 的缩写,控制主轴的方向与换行
  - `flex-flow:column wrap;` 等价于 `flex-direction:column; flex-wrap:wrap;`
  - 1.flex-direction: <row | row-reverse | column | column-reverse>, 定义了主轴的方向
  - 2.flex-wrap: <nowrap | wrap | wrap-reverse>, 定义子元素是否允许换行
- align-items: <stretch | flex-start | flex-end | center> 控制元素在交叉轴上对齐方式
- justify-content: <stretch | flex-start | flex-end | center | space-around | space-between> 控制元素在主轴上对齐方式
- align-content: <noraml | start | end | flex-start | flex-end | center |  space-around | space-between> 控制多行元素在交叉轴上的对齐方式

#### flex子元素属性
- flex 是伸缩项目属性 flex-grow、flex-shrink、flex-basis 的缩写,控制可用空间如何分配
  - `flex:1;` = `flex-grow:1;`
  - `flex:2 1 200px;` = `flex-grow:2; flex-shrink:1; flex-basis:200px;`
  - 1.flex-grow:<正整数> 若有可用空间,则伸张的比例(默认0)
  - 2.flex-shrink:<正整数> 若空间不够,则收缩的比例(默认0)
  - 3.flex-basis 未伸张和收缩前的空间大小(默认auto,max-content作为flex-basis)
- align-self: <同align-items> 单独控制元素在交叉轴上对齐方式

#### 技巧
- 可用 `margin` 占用剩余空间,实现左右布局