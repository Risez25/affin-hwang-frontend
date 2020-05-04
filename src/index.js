/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import config from './config';

// eslint-disable-next-line no-undef
switch (process.env.REACT_APP_STAGE) {
  case 'localhost':
    window.APP_KEY = config.appKey;
    window.API_URL = config.env.localhost.API_URL;
    window.APP_PATH = config.env.localhost.APP_PATH;
    break;
  case 'development':
    window.APP_KEY = config.appKey;
    window.API_URL = config.env.development.API_URL;
    window.APP_PATH = config.env.development.APP_PATH;
    break;
  case 'production':
    window.APP_KEY = config.appKey;
    window.API_URL = config.env.production.API_URL;
    window.APP_PATH = config.env.production.APP_PATH;
    break;

  default:
    break;
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
