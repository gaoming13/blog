> https://react.docschina.org/
- JSX
  - JSX只是 React.createElement(component, props, ...children) 函数的语法糖
  - `<button color="blue" key="1">按钮</button>` 会编译为
  - `React.createElement('button', {color: 'blue', key:'1'}, '按钮')`
  - 由于 JSX 会编译为 React.createElement 调用形式,所以 React 库必须包含在 JSX 代码作用域内
  - 渲染逻辑与UI逻辑耦合,比如,在UI中绑定处理事件,状态改变通知到UI,在UI展示数据
  - React没有采用将标记和逻辑分离到不同文件这种人为的分离方式
  - 而是将两者共同存放在称为'组件'的松散耦合单元中 `React.Component`
- React元素是创建开销极小的普通对象 `React.createElement`
- JSX 可转换为 React元素, 元素是构成 React 引用的最小砖块
- React DOM 负责更新 浏览器的DOM元素 与 React 元素保持一致 `ReactDOM.render`
- 即便执行多次 ReactDOM.render, React DOM 也只会更新实际改变了的内容
- 组件 / props
  - 接受任意的入参 props, 返回描述页面内容的 React 元素
  - 函数组件和class组件是等效的
  - 本质上就是 JS 函数
  - 组件名称必须使用大写字母开头,小些字母开头的组件视为原生 DOM 标签
  - 组件必须保护它们的 props 不被改变
- state(vue里的data) / 声明周期
  - 不要直接修改 State(除了构造函数), 应该使用 setState()
  - state 的更新可能是异步的,处于性能考虑,可能会把多个 setState() 合并为一个调用
  - 造成 setState 可能无法更新
  - 可以使用 setState((state, props) => ({}));
  - 数据流都是向下流动的,任何的 state 总是属于特定的组件,只影响低于它们的组件
- 事件处理
  - React 元素的事件处理和 DOM 元素的很相似,但是语法上不同：
    - React 事件美的命名采用小驼峰式(camelCase),而不是纯小些
    - JSX 语法需要传入一个函数作为事件的处理函数,而非字符串
- 条件渲染
  - 依据应用的不同状态,只渲染对应状态下的部分内容
  - 组织组件渲染,可以让 render 方法直接返回 null,但并不会影响组件的声明周期
- 列表 & Key
  - key帮助 React 识别哪些元素改变了, 比如被添加或删除
  - key只是在兄弟节点之间必须唯一
- 表单
  - 受控组件：
    - HTML 中,表单元素 input 之类的通常自己维护state, 并根据用户输入进行更新
    - React 中,可变状态(mutable state)保存在组件的state属性中,只通过setState()来更新
    - 把2者结合起来,使React的state成为唯一数据源,被这种方式控制取值的表单输入元素叫受控组件
- 状态提升
  - 多个组件需要反应相同的变化数据,可以将共享状态提升到最近的共同父组件中
- 组合(vue的插槽) vs 继承
  - 并没有发现需要使用继承来构建组件层次的清空
- 代码分割
  - 随着应用的增长,代码包也随之增长
  - 对应用进行代码分割能够帮助懒加载当前用户所需的内容
  - 1.通过动态 import(),打包工具会解析该语法,自动进行代码分割
  - 2.React.lazy 动态引入组件
  - 3.基于路由的代码分割(React.lazy + React Router)
- Context(vue的vuex)
  - Context设计目的是为了共享那些对于一个组件树而言是全局的数据
  - 例如：当前用户信息，主题或语言
- 错误边界(Error Boundaries)
  - 错误边界是一种 React 组件,可以捕获其子组件树的错误,并渲染出备用UI
  - 错误边界无法捕获的错误：事件处理、异步代码、服务端渲染、自身抛出的错误
  - 定义了 getDerivedStateFromError 和 componentDidCatch 任意一个,就成了错误边界
  - getDerivedStateFromError 渲染备用UI, componentDidCatch 打印错误信息
- Refs 转发给子组件
  - 通过 ref、React.forwardRef 向下引用子组件
- Fragments 空标签(类似vue template)
  - 一个组件返回多个元素,而无需添加额外父节点
  - <React.Fragment> 或 <>
  - key是唯一可以传递给 Fragment 的属性,而 vue 不支持
- 高阶组件(HOC)(有点类似继承或装饰器,但差别很大)
  - 自身不是 React API 的一部分,是基于 React 的组合特性而形成的设计模式
  - 高阶组件是参数为组件,返回值为新组件的函数 `const 新组件 = HOC(组件);`
  - 约定：HOC应该透传与自身无关的props
  - 不要在 render 方法中使用 HOC
  - 静态方法可以通过第三方hoist-non-react-statics自动拷贝
  - 虽然高阶组件是将所有props传递给被包装的组件,但对于refs并不适用
- 第三方库协同
  - 集成带有DOM操作的插件(jquery)
    - 避免冲突最简单的方式就是你负责你的,我负责我的区域
    - 比如给 jquery分配一个空的 div
- 避免调停
  - 当一个组件的 props 或 state 变更, React会将最新返回的元素与之前渲染的元素进行对比,以此决定是否有有必要更新真实的DOM
  - 可以通过覆盖声明周期方法 shouldComponentUpdate 来进行提速,默认实现总是返回true,让 React 执行更新




#### 函数组件 vs class组件
```js
function Comp1(props) {
  return <h1>Hello, {props.name}</h1>;
}
class Comp2 extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
ReactDOM.render(
  [
    <Comp1 key="1" name="中" />,
    <Comp2 key="2" name="你" />,
  ],
  document.getElementById('root2'),
);
```

#### state / 声明周期
```js
class Comp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: Date.now() };
  }
  componentDidMount() {
    this.timer = setInterval(() => this.setState({ date: Date.now() }), 1000);
  }
  componentWillMount() {
    clearInterval(this.timer);
  }
  render() {
    return <h1>Hello, {this.state.date}</h1>;
  }
}
ReactDOM.render(
  <Comp key="1" name="中" />,
  document.getElementById('root2'),
);
```

#### 事件处理
```js
class Comp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOn: false };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log(this);
    this.setState(state => ({
      isOn: ! state.isOn,
    }));
  }
  render() {
    return (
      <button onClick={this.handleClick}>{ this.state.isOn ? '打开' : '关闭' }</button>
    );
  }
}
ReactDOM.render(
  <Comp />,
  document.getElementById('root2')
);
```

#### 条件渲染
```js
class Comp extends React.Component {
  render() {
    return null;
    // return <div>Hello, { this.props.age > 20 ? <b>老年人</b> : <i>年轻人</i> }</div>
  }
}
ReactDOM.render(<Comp age="30" />, document.getElementById('root2'));
```

#### 列表 & key
```js
const numArr = [1, 2, 3, 4, 5];
class Comp extends React.Component {
  render() {
    return <ul>
      {numArr.map(v => v % 2 === 0 ? <li key={v}>{v}</li> : '')}
    </ul>;
  }
}
ReactDOM.render(<Comp />, document.getElementById('root2'));
```

#### 表单
```js
class Comp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: 'a',
      checkbox: false,
    };
    this.handelInputChange = this.handelInputChange.bind(this);
  }
  handelInputChange(e) {
    this.setState({ input: e.target.value });
  }
  handelCheckboxChange() {
    this.setState({ checkbox: ! this.state.checkbox });
  }
  render() {
    return (
      <div>
        <input type="text" value={this.state.input} onChange={this.handelInputChange} />
        <input type="checkbox" defaultChecked={this.state.checkbox} onChange={this.handelCheckboxChange} />
        <textarea value={this.state.input} onChange={this.handelInputChange}></textarea>
        <select value={this.state.input} onChange={this.handelInputChange}>
          <option value='a'>A</option>
          <option value='b'>B</option>
          <option value='c'>C</option>
        </select>
      </div>
    );
  }
}
ReactDOM.render(<Comp />, document.getElementById('root2'));
```

#### 组合(插槽)
```js
function PopBox(props) {
  return <div style={{color: props.color}}>
    <div className="head">{props.head}</div>
    <div className="content">{props.children}</div>
    <div className="foot">{props.foot}</div>
  </div>;
}
ReactDOM.render(
  <PopBox color="blue"
    head={ <div>这是头部</div> }
    foot={ <div>这是底部</div> }
  >
    <p>这是主内容</p>
  </PopBox>,
  document.getElementById('root2')
);
```

#### React 与 jquery 协同
```jsx
import React from 'react';
import $ from 'jquery';

export default class PageAbout extends React.Component {
  componentDidMount() {
    this.$el = $(this.el);
    this.timer1 = setInterval(() => {
      this.$el.html(Date.now())
    }, 1000);
    this.$el.on('click', (e) => {
      console.log($(e.target).html());
    });
  }
  componentWillUnmount() {
    clearInterval(this.timer1);
    this.$el.unbind('click');
  }
  render() {
    return <div ref={el => this.el = el} />;
  }
}
```