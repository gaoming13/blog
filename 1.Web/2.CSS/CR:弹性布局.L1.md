### CR:弹性布局(Flexible Box Layout) Level 1
- 父元素使用 `display:flex` 或 `display:inline-flex` 来定义 `弹性盒子(Flexbox)`
- 此时，父元素为 flex容器(Flex Container), 子元素为 flex子元素(Flex item)
- 此时，会产生 伸缩格式化上下文FFC(flex formatting context)
- 主轴(向右) →，交叉轴(向下) ↓, 位置和方向由 flex-direction 定义

#### flex容器属性
- flew-flow: <flex-direction> <flex-wrap>
  - flex-direction: <row | row-reverse | column | column-reverse> 主轴的方向(默认row, 水平向右)
  - flex-wrap: <nowrap | wrap | wrap-reverse> 子元素是否允许换行(默认 nowrap, 不换行)
  - 例：
    - flex-flow:column wrap; = flex-direction:column; flex-wrap:wrap;
- align-items: stretch / flex-start / flex-end / center, 控制元素在交叉轴 ↓ 上对齐方式(默认 stretch, 撑满)
- justify-content: flex-start / flex-end / center / space-around / space-between, 控制元素在主轴 → 上对齐方式(默认 flex-start)
- align-content: stretch / flex-start / flex-end / center / space-around / space-between, 控制多行元素在交叉轴  ↓  上的对齐方式(默认 stretch)
  - 只有换行才能看到该属性 (默认 stretch, 撑满)

#### flex子元素属性
- flex: <flex-grow> <flex-shrink> <flex-basis>
  - flex-grow: 0 / 2, 有可用空间,伸张的比例(默认0),分割权重=flex-grow
  - flex-shrink: 0 / 2, 空间不够,收缩的比例(默认0),收缩权重=flex-shrink*flex-basis
  - flex-basis: auto / 100px, 空间原始宽度(默认auto,自身的宽度)
  - 例：
    - flex:auto = flex-gow: 1; flex-shrink: 1; flex-basis:auto;
    - flex:1 = flex-grow:1
    - flex:2 1 200px = flex-grow:2; flex-shrink:1; flex-basis:200px;
- align-self: <同align-items> 单独控制元素在交叉轴  ↓  上对齐方式

#### 技巧
- 可用 `margin` 占用剩余空间,实现左右布局