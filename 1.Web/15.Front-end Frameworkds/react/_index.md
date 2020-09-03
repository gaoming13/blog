> https://react.docschina.org/
- JSX
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
- state / 声明周期
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
    this.state = { input: 'a' };
    this.handelInputChange = this.handelInputChange.bind(this);
  }
  handelInputChange(e) {
    this.setState({ input: e.target.value });
  }
  render() {
    return (
      <div>
        <input type="text" value={this.state.input} onChange={this.handelInputChange} />
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