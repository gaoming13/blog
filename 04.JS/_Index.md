### JavaScript
- ECMAScript是一种脚本在语法和语义上的标准
  - ECMAScript 5 (2009-12发布)
  - 2012年所有现代浏览器都完整的支持 ECMAScript 5.1, 旧版本的浏览器至少支持 ECMAScript 3
  - ECMAScript 6 (ECMAScript 2015,ES6) (2015-06发布)
  - 至此, ESMAScript 每年发布一次新标准
  - 最新 ECMAScript2020
- Javascript、JScript和ActionScript等脚本语言都是基于ECMAScript标准实现的，其声明变量、操作数组等语法完全一样
- JavaScript 内置了一些对象的标准库(Array、Date、Math等)
  - JavaScript 的核心部分可以通过添加对象来扩展语言以适应不同用途
  - 客户端的 JavaScript 提供控制浏览器及其文档对象模型(DOM)的对象,来改变网页(DOM)的外观与样式
  - 服务端的 Node.Js 提供操作数据库,通信等对象,来对客户端的请求作出响应
  - JS的三大组成部分
    - 1.ECMAScript规范,内置标准库
    - 2.BOM(Browser Object Model):浏览器对象模型
    - 3.DOM(Document):文档对象模型
- JavaScript是基于原型的语言，Java是基于类的语言
  - 基于原型的语言具有原型对象(prototypical object)的概念
  - 任何对象都可作为另一个对象的原型(prototype),从而允许后者共享前者的属性
  - ES6中引入的类定义，实际上是已有原型继承方式的语法糖而已
  - JavaScript 无法动态地从多个原型链中继承

### 兼容性总结
```js
// 获取滚动条滚动的距离
document.documentElement.scrollTop || document.body.scrollTop

// 获取非行间样式
function getStyle(dom, attr) {
  return dom.currentStyle ? dom.currentStyle[attr] : getComputedStyle(dom, false)[attr];
}

// 获取键盘信息
e.keyCode || e.which

// 阻止事件冒泡
e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;

// 阻止默认事件
e.preventDefault ? e.preventDefault() : e.returnValue = false;

// 事件监听
addEventListener()
attachEvent()

// 事件解绑
removeEventListener();
detachEvent();

// 获取事件源
e.target || e.srcElement

// ajax兼容
new XMLHttpRequest() || new ActiveXObject('MicrosoftXMLHTTP');
```
