import React from 'react';
// import ReactDom from 'react-dom';

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = {x: 0, y:0};
  }
  handleMouseMove(e) {
    this.setState({
      x: e.clientX,
      y: e.clientY,
    });
  }
  render() {
    return (
      <div style={{width:'100%', height:'100%'}} onMouseMove={this.handleMouseMove}>
        {this.props.child(this.state)}
      </div>
    );
  }
}

export default class PageAbout extends React.Component {
  render() {
    return (
      <div style={{background:'#e8e8e8',width:'100px',height:'100px'}}>
        <Mouse child={mouse =>
          <div>{mouse.x}, {mouse.y}</div>
        } />
      </div>
    );
  }
}
