import React from 'react';
import ReactDOM, { render } from 'react-dom';

// 头部
class PartHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '王二傻',
    };
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(() => ({
        username: Date.now(),
      }));
    }, 1000);
  }
  render() {
    return <header>这是头部 {this.state.username}</header>;
  }
}

// 底部
class FooterLinks extends React.PureComponent {
  render() {
    return <h1>{this.props.words.join(',')}</h1>
  }
}
class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      list: ['a', 'b', 'c', 'd']
    };
  }
  render() {
    return <div>
      <button style={{color: this.props.color}} onClick={
        () => {
          this.setState(state => ({count: state.count + 1}));
          const list = this.state.list;
          this.setState(state => ({
            list: [...state.list, 'aaa'],
          }));
        }
        }>Count: {this.state.count}</button>
      <FooterLinks words={this.state.list}></FooterLinks>
    </div>;
  }
}

ReactDOM.render([
  React.createElement(PartHead, {key: 0}),
  React.createElement('ul', {key: 1}, [
    React.createElement('li', {key: 1}, '呵呵呵1'),
    React.createElement('li', {key: 2}, '呵呵呵2'),
    React.createElement('li', {key: 3}, '呵呵呵3'),
    <li key="4"><a href="https://www.baidu.com">这是连接</a></li>,
  ]),
  <Footer color="red" key="5"></Footer>
], document.getElementById('root'));

// root2
const data = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];
class Comp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {key: '', filter: ''};
    this.dealInputChange = this.dealInputChange.bind(this);
    this.dealCheckboxChange = this.dealCheckboxChange.bind(this);
  }
  dealInputChange(e) {
    this.setState({ key: e.target.value });
  }
  dealCheckboxChange() {
    this.setState({ filter: ! this.state.filter });
  }
  render() {
    return <div>
      <input type="text" value={this.state.key} onChange={this.dealInputChange} />
      <label>
        <input type="checkbox" defaultChecked={this.state.filter} onChange={this.dealCheckboxChange} /> Only show products in stock
      </label>
      <div>
        {data.map(v => {
          if (this.state.filter && ! v.stocked) return '';
          if (! v.name.toLowerCase().includes(this.state.key.toLowerCase())) return '';
          return <div key={v.name}>{v.name}</div>
        })}
      </div>
    </div>;
  }
}
ReactDOM.render(<Comp />, document.getElementById('root2'));