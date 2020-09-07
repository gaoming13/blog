import React from 'react';

const PageHelp = React.forwardRef((props, ref) => (
  <div>
    <button ref={ref}>登陆</button>
    <button>注册</button>
  </div>
))

function logProps(Comp) {
  class C1 extends React.Component {
    componentDidUpdate(prevProps) {
      console.log([prevProps, this.props]);
    }
    render() {
      const {forwardRef, ...rest} = this.props;
      return <Comp ref={forwardRef} {...rest} />;
    }
  }
  function T1(props, ref) {
    return <C1 forwardRef={ref} {...props} />;
  }
  T1.displayName = '呼呼呼';
  return React.forwardRef(T1);
}

export default logProps(PageHelp);