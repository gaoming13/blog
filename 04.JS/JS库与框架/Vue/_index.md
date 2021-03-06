## Vue
提供了 MVVM 风格的双向数据绑定的 JS 库，专注于 View 层
- 它的核心是 VM(ViewModel), 负责连接 View 和 Model 保证视图和数据的一致性
- M: 主要存的是页面中的数据,`const data = {...}`
- VM: 中间件，分割了 V 和 M,`new Vue({...})`
- V:视图,`<template>xx</template>`

### 手册：组件通信有哪些方式
- 父子通信
  - 1.v-bind传值：父 `v-bind:xx-yy="abc"` 子 `props: ['xxYy']` `this.$props` `this.xxYy` `this.$attrs`
    - `v-bind="$attrs"` / inheritAttrs默认false
  - 2.v-on监听事件：父 `v-on:xxYy="todo"` 子 `this.$emit('xxYy', '参数1', '参数2')` `this.$listeners`
    - `v-bind="$listeners"`
  - 3.操作组件实例 `this.$parent` `this.$children` `this.$refs['comp1']`
- 跨级通信
  - 1.provide/inject：祖 `provide: {a: 'abc'}` 孙 `inject: ['a']` `this.a`
- 无限制通信
  - 1.Vuex
  - 2.Bus: `this.$bus.on('event1', todo)` `this.$bus.emit('event1')`

### 手册：computed 和 watch的区别
- 计算属性 computed
  - 1.computed属性值默认走缓存，基于依赖数据(data/props)更新缓存
  - 2.使用情景：一个属性需要由其它属性计算而来
- 侦听属性 watch
  - 1.数据变会直接触发回调，回调支持异步
  - 2.使用情景：一个属性(data/props)发生变化，然后执行对应的操作
  - 3.参数 immdiate：组件加载后是否触发一次回调
  - 4.参数 deep 深度监听，无法极爱能听到数组的变动和对象的新增

### 手册：data为什么是一个函数
- 若data是一个对象，两个实例引用同一个对象，会相互干扰
- 写成函数，复用组件的时候，都会返回一份新的data
- 相当于每个组件实例都有私有的数据空间

### 手册：nextTick的作用
- 在更新DOM时是*异步*执行的
  - 1.只要侦听到数据变化，将开启一个事件队列，并缓冲同一事件循环中所发生的所有数据变更
  - 2.同一个`watcher`被多次触发，只会被推入到事件队列中一次
  - 3.这种在缓冲时去除重复数据对于避免不必要的计算和DOM操作是很重要的
-
```js
this.msg = 'hello';
this.$nextTick().then(() => {
  // DOM更新了
});
```

### 双向数据绑定原理
- 一句话：vue采用Object.defineProperty的getter和setter，并结合观察者模式来实现数据绑定的
- 1.普通JS对象传给Vue实例来做data选项时,vue将遍历它的属性
- 2.Observer数据监听器：对 data 所有属性进行监听，如有变动可拿到新值+通知订阅者，变动获取通过 getter 和 setter 实现
- 3.Compile模板解析器：对每个元素节点的指令进行解析，根据执行模板替换数据+将依赖传递给Watcher订阅者
- 4.Watcher订阅者：是整个模型的核心，对应 VM 层，连接 Observer 和 Complie
  - 能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，处理数据
  - 反馈给View层个更新界面视图
- 5.Dep消息订阅器：内部维护了一个数组，用来收集订阅者(watcher)，数据变动触发notify函数，再调用订阅者的update方法

### Proxy vs Object.defineProperty
- Proxy的优势
  - 可以直接监听对象⽽⾮属性
  - 可以直接监听数组的变化
  - 有多达13种拦截⽅法，apply、ownKeys、deleteProperty、has 是 Object.defineProperty 不具备的
  - 返回的是⼀个新对象，我们可以只操作新的对象达到⽬的，⽽ Object.defineProperty 只能遍历对象属性直接修改
  - 作为新标准将受到浏览器⼚商重点持续的性能优化，也就是传说中的新标准的性能红利
- Object.defineProperty的优势
  - 兼容性好,⽀持IE9






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