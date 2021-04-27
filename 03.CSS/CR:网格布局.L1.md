### CR:网格布局(Grid Layout) Level 1
- 网格容器(Grid), 网格单元(Grid cell), 网格线(Grid lines), 网格区域(Grid area)

#### grid(网格容器.属性缩写)
- 包含：grid-template-* (显式属性) grid-auto-* (隐式属性) grid-*-gap (间距属性)
- 语法：
  - 1.grid-template 语法
  - 2.<grid-template-rows> / auto-flow dense? <grid-auto-columns>?
    - `100px 1fr / auto-flow`
    - `repeat(2, 50px 1fr) / auto-flow dense`
    - `100px 1fr / auto-flow dense 100px`
  - 3.auto-flow dense? <grid-auto-rows>? / <grid-teplate-columns>?
    - `auto-flow 100px / repeat(4, 100px)`

#### grid-template(显式网格容器.模版属性缩写)
- 包含：grid-template-* (显式属性)
- 语法：
  - 1.默认值：`none` => 默认值，行列隐式生成
  - 2.`<grid-template-rows> / <grid-template-columns>` 形式
    - `40% 60% / 50px 1fr 2fr` => 行1高 行2高 / 列1宽 列2宽 列3宽
    - `repeat(2, 50px) / repeat(auto-fill, 20px)` => 行1和2高 / 自建列宽
  - 3.area形式：
    - `'a b' 30% 'a b' 1fr 'a b' minmax(100px, 1fr)` => 行1 高 行2 高 行3 高
    - `'a .' 50px 'a b' 50px / 1fr 2fr` => 行1 高 行2 高 / 列1宽 列2宽
- grid-template-rows(定义网格容器行的数量宽度)
  - 1.`<length>` `10px 20px` 少了空白,多了溢出
  - 2.`<percentage>` `40% 60%`
  - 3.`<flex>` `1fr 2fr`
  - 4.`minmax(min, max)`
  - 5.`repeat(2, 1fr)`
  - 5.组合
    - `10px 1fr 1fr`
    - `20px repeat(2, 1fr) repeat(1, 10px)`
    - `repeat(2, 1fr 2fr)`
    - `repeat(auto-fill, 200px)` 根据容器宽度创建最多的列
    - `repeat(auto-fill, minmax(200px, 1fr))` 先按200px拆分，然后往每个cell上匀
- grid-template-columns(定义网格容器列的数量宽度)
- grid-template-areas(使用点字符串定义行与列)
  - 子元素标示 `grid-area='a'`

#### 隐式网格容器.属性
- 包含：grid-auto-* (隐式属性)
- grid-auto-rows (定义行的宽度,行数无法控制)
  - 1.`<length>` `10px 10px` 数值尺寸
  - 2.`<percentage>` `40% 60%` 相对于容器尺寸百分比，若容器尺寸不确定会被当作auto
  - 3.`<flex>` `1fr 2fr` 按伸缩系数占据剩余的可用空间
  - 4.`minmax(min, max)` 最大值可设为1fr,表示最大尺寸
- grid-auto-columns (定义列的高度,列数无法控制)
- grid-auto-flow (控制自动布局算法怎样运作)
  - 1.`row` 默认值,逐行增加元素
  - 2.`column` 逐列增加元素
  - 3.`dense` 稠密堆积算法,后面出现小元素,会试图填充前面的空白

#### grid-gap(网格单元间.距属性缩写)
- `<grid-row-gap> <grid-column-gap>` 形式
- grid-row-gap 行间距
- grid-column-gap 列间距
- 间距使用的空间会在计算fr前被留出来

#### grid-area(网格区域.属性缩写)
- `<grid-row-start> / <grid-column-start> / <grid-row-end> / <grid-column-end>` 形式
- grid-row
  - `<grid-row-start> / <grid-row-end>` 形式
- grid-column
  - `<grid-column-start> / <grid-column-end>` 形式
- 1.`auto` 默认值,等价于 `span 1`
- 2.`<值>` 第几根网格线,负值表示倒数第几根
- 3.`span 2` 往后跨几个单元格

#### 网格区域的层级(z-index)
- `z-index` 控制网格区域的层级，默认按照元素顺序排列

#### 网格区域内对齐
- 网格容器 `align-items: end;`
- 网格区域 `align-self: stretch;` `align-self: start;`

#### 网格与绝对定位元素
- 1.网格容器`position:relative`,网格单元`position:absolute`:该项目脱离文档流，定位上下文为原网络单元
- 2.网格单元`position:absolute`:该项目脱离文档流，定位上下文为当前视口

#### 网格布局(Grid) vs 弹性盒布局(flexbox)
- 一纬布局 vs 二维布局：只需按照行或列控制布局，用flexbox；需同时按照行或列控制布局，用grid
- 从内容出发 vs 从布局出发：使用弹性盒并禁用了一些特性特性，这种情况，grid可能是更好的选择
- 2种布局对响应式的处理不同。拖拽浏览器，弹性布局会根据空间适当的调整整行中的项目个数；网格布局每行项目个数不变