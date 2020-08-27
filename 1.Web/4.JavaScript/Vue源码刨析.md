- Vue的原理:利用了Object.defineProperty,把每个data都定义getter和setter
  这样就能监听data的变化然后去更新需要更新的地方
- Vue的编译过程:本身是html模版,浏览器无法直接识别,通过编译过程,解析vue的模版语法,
  收集依赖,将模版与数据模型关联起来,
  当数据模型发生变化的时候,就能通知依赖的地方去更新
- 双向绑定原理：v-model增加change监听,变化的时候修改数据模型,数据模型更新依赖

- 初始化 `new Vue()`
  - Vue.prototype._init
    - _uid++
    - initLifecycle()
    - initEvents() // init parent attached events
    - initRender()
    - 【Hook】beforeCreate
    - initInjections() // resolve injections before data/props
    - initState()
      - initProps()
      - initMethods(): vm.$options.functions 绑到 vm上
      - initData(): observe(vm.$options.data)
        - 1.Object.defineProperty(vm.$options.data, 'xxx', { get: set: })
        - 2.Oberver 订阅该值,收集依赖
    - callHook()
    - 【Hook】created
- 挂载 `.$mount('#a1')`
  - 1.渲染函数 $options.render
    - 若 $options.render 没定义
      - compileToFunctions 编译 $options.template 或 outerHtml得到 render
      - 编译器过程：
        - parse 正则解析 template 中 Vue 的指令变量等,形成语法树 AST
        - optimize 标记一些静态节点,用作后面的性能优化,diff时跳过
        - generate AST转换为渲染函数
  - 2.观察者 Oberver 劫持监听数据变化, 通知 Watcher 变化
  - 3.Watcher 调用视图更新 _update(_render())
    - 3-1._render($options.render) 生成虚拟节点树 VNode
      - 将来做数据更新的时候,先改变 VNode 的数值,做diff算法比较,计算出最小的dom更新

```html
<div id="a1">
  <input type="text" v-model="message" />
  <h1 v-on:click="change">{{ message }}</h1>
</div>
```

```js
// initData前
{
  list: (5) [{…}, {…}, {…}, {…}, {…}]
  message: "123"
}
// initData后
{
  list: (...)
  message: (...)
  __ob__: Observer {value: {…}, dep: Dep, vmCount: 1}
  get list: ƒ reactiveGetter()
  set list: ƒ reactiveSetter(newVal)
  get message: ƒ reactiveGetter()
  set message: ƒ reactiveSetter(newVal)
}
```

```js
// AST语法树
{
  attrs: [{…}]
  attrsList: [{…}]
  attrsMap: {id: "a1"}
  children: (3) [{…}, {…}, {…}]
  end: 105
  parent: undefined
  plain: false
  rawAttrsMap: {id: {…}}
  start: 0
  static: false
  staticRoot: false
  tag: "div"
  type: 1
}

// render渲染函数
(h) => h('div', {attrs:{"id":"a1"}}, [
  _c('input', {
    directives:[
      {name:"model",rawName:"v-model",value:(message),expression:"message"}
    ],
    attrs:{"type":"text"},
    domProps:{"value":(message)},
    on:{
      "input":function($event){
        if($event.target.composing)return;
        message=$event.target.value
      }
    }
  }),
  _v(" "),
  _c('h1',{on:{"click":change}},[_v(_s(message))])
])

// VNode
{
  asyncFactory: undefined
  asyncMeta: undefined
  children: (3) [VNode, VNode, VNode]
  componentInstance: undefined
  componentOptions: undefined
  context: Vue {_uid: 0, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: Vue, …}
  data: {attrs: {…}}
  elm: div#a1
  fnContext: undefined
  fnOptions: undefined
  fnScopeId: undefined
  isAsyncPlaceholder: false
  isCloned: false
  isComment: false
  isOnce: false
  isRootInsert: true
  isStatic: false
  key: undefined
  ns: undefined
  parent: undefined
  raw: false
  tag: "div"
  text: undefined
  child: (...)
}
```