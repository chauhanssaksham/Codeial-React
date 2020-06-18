import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import CssBaseLine from '@material-ui/core/CssBaseline'
import { configureStore } from './store';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <CssBaseLine />
        <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
