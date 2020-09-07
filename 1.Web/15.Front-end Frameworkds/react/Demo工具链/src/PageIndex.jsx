import React, { Suspense } from 'react';
import MyErrorBoundary from './ErrorBoundary';

const WidgetKf = React.lazy(() => import('./WidgetKf'));

export const ContextUser = React.createContext({id: 1, name: '小明'});
ContextUser.displayName = '名字';

export default () => (
  <div>
    <h3>首页</h3>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <ContextUser.Provider value={{id: 2, name: '小红'}}>
          <WidgetKf />
        </ContextUser.Provider>
      </Suspense>
    </MyErrorBoundary>
  </div>
);
