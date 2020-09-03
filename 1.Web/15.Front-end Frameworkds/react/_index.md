> https://react.docschina.org/
- JSX
  - 渲染逻辑与UI逻辑耦合,比如,在UI中绑定处理事件,状态改变通知到UI,在UI展示数据
  - React没有采用将标记和逻辑分离到不同文件这种人为的分离方式
  - 而是将两者共同存放在称为'组件'的松散耦合单元中 `React.Component`
- React元素是创建开销极小的普通对象 `React.createElement`
- JSX 可转换为 React元素, 元素是构成 React 引用的最小砖块
- React DOM 负责更新 浏览器的DOM元素 与 React 元素保持一致 `ReactDOM.render`
- 即便执行多次 ReactDOM.render, React DOM 也只会更新实际改变了的内容
- 组件: 接受任意的入参 props, 返回描述页面内容的 React 元素
  - 函数组件和class组件是等效的
  - 本质上就是 JS 函数


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