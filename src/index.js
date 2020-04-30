import React from 'react';
import ReactDOM from 'react-dom';
import { ApiContextProvider } from './context/ApiContext';

import * as serviceWorker from './serviceWorker';
import App from './App';

ReactDOM.render(
  <ApiContextProvider value={'Day'}>
    <App />,
  </ApiContextProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
