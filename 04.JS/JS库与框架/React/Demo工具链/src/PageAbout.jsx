import React from 'react';
// import ReactDom from 'react-dom';

export default class PageAbout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {input: ''};
    this.input = React.createRef();
    this.handelInputChange = this.handelInputChange.bind(this);
  }
  handelInputChange(e) {
    this.setState({input: e.target.value});
  }
  render() {
    return <React.Fragment>
      <input type="text" ref={this.input} onChange={this.handelInputChange} />
      <span>{this.state.input}</span>
    </React.Fragment>;
  }
}
