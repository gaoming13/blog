### WD:多列布局(Multi-column Layout) Level 1
- 多列布局(通常称为multicol)，将内容布置到一组列框中，就像报纸中的列一样
- multicol容器创建了一个新的块格式化上下文(BFC)

#### columns(多列布局.属性缩写)
- 语法：`<column-count> <column-width>` 形式
  - column-count 列数
  - column-width 单列宽度
- 同时使用 column-count 和 column-width, column-width 表示单列最小宽度

#### column-gap(列间距)
- 默认 normal = 1em

#### column-rule(列边框.属性缩写)
- 语法：`<column-rule-width> <column-rule-style> <column-rule-color>` 形式
- `column-rule: 10px solid red`

#### column-fill(内容填充方式)
- 1.`balance` 所有列内容尽可能平均
- 2.`auto` 所有内容顺序填充，后面的列可能有空白

#### 子元素.属性
- `break-inside: avoid` 防止该元素被同时分到2列中
- `break-before: column` 该元素头部新列开始排版
- `break-after: column` 该元素尾部新列开始排版
- `column-span: all` 该元素横跨所有的列
- `widow&orphan` ???搞不明白