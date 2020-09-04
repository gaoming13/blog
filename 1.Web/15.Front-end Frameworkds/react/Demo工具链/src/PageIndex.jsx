import React, { Suspense } from 'react';
import MyErrorBoundary from './ErrorBoundary';

const WidgetKf = React.lazy(() => import('./WidgetKf'));

export default () => (
  <div>
    <h3>首页</h3>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <WidgetKf />
      </Suspense>
    </MyErrorBoundary>
  </div>
);