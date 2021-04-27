### REC:命名空间(Namespaces) Levle 3
- @namespace规则通常在处理包含多个namespaces的文档才有用，比如HTML5里内联的 SVG / MathML / 混合多个词汇表的XML
- 在 HTML5 中，已知的外语元素(比如SVG/Math)将被自动加上命名空间
- 默认命名空间 `@namespace "http://www.w3.org/1999/xhtml";` = `@namespace url(http://www.w3.org/1999/xhtml);`
- 命名空间前缀 `@namespace svg "http://www.w3.org/2000/svg";` = `@namespace svg url(http://www.w3.org/2000/svg);`
- `svg|path:nth-child(odd) { fill: red; }`