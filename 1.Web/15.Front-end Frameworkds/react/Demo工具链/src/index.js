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