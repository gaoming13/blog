import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import ReactDom from 'react-dom';

const PageIndex = React.lazy(() => import('./PageIndex'));
const PageAbout = React.lazy(() => import('./PageAbout'));

ReactDom.render(
  <Router>
    <ul>
      <li><Link to="/">首页</Link></li>
      <li><Link to="/about">关于</Link></li>
    </ul>
    <Suspense fallback={<div>loading..</div>}>
      <Switch>
        <Route exact path="/" component={PageIndex} />
        <Route path="/about" component={PageAbout} />
      </Switch>
    </Suspense>
  </Router>,
  document.getElementById('root')
);