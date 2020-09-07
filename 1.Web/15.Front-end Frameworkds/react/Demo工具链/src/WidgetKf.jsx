import React from 'react';
import { ContextUser } from './PageIndex';

export default class WidgetKf extends React.Component {
  render() {
    console.log(this.context);
    return <div>
      {/* <div>这是客服弹窗 {this.context.name}</div> */}
      <ContextUser.Consumer>
        {({id, name}) => <div>{id}: {name}</div>}
      </ContextUser.Consumer>
    </div>;
  }
}
// WidgetKf.contextType = ContextUser;