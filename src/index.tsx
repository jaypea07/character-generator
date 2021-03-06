import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './core/app';
import registerServiceWorker from './core/registerServiceWorker';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
