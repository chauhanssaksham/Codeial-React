import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CssBaseLine from '@material-ui/core/CssBaseline'
import { configureStore } from './store';

const store = configureStore();
console.log(store.getState());

ReactDOM.render(
  <React.StrictMode>
    <CssBaseLine />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
