import React from 'react';
import ReactDOM from 'react-dom';

class PartHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '王二傻',
    };
  }
  render() {
    return <header>这是头部 {this.state.username}</header>;
  }
}

ReactDOM.render([
  React.createElement(PartHead, {key: 0}),
  React.createElement('ul', {key: 1}, [
    React.createElement('li', {key: 1}, '呵呵呵1'),
    React.createElement('li', {key: 2}, '呵呵呵2'),
    React.createElement('li', {key: 3}, '呵呵呵3'),
    <li key="4"><a href="https://www.baidu.com">这是连接</a></li>,
  ])
], document.getElementById('root'));