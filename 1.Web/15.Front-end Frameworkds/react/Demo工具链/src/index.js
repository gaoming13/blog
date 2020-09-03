import React from 'react';
import ReactDOM from 'react-dom';

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