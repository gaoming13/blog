import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import ReactDom from 'react-dom';

const PageIndex = React.lazy(() => import('./PageIndex'));
const PageAbout = React.lazy(() => import('./PageAbout'));
const PageHelp = React.lazy(() => import('./PageHelp'));

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const ref = React.createRef();
    setTimeout(() => {
      if (ref.current) {
        console.log(ref.current.innerText);
      }
    }, 1000);
    return <Router>
      <ul>
        <li><Link to="/">首页</Link></li>
        <li><Link to="/about">关于</Link></li>
        <li><Link to="/help">帮助</Link></li>
      </ul>
      <Suspense fallback={<div>loading..</div>}>
        <Switch>
          <Route exact path="/" component={PageIndex} />
          <Route path="/about" component={PageAbout} />
          <Route path="/help">
            <PageHelp ref={ref} a="1" b="2" c="3"></PageHelp>
          </Route>
        </Switch>
      </Suspense>
    </Router>;
  }
}

ReactDom.render(<App />, document.getElementById('root'));