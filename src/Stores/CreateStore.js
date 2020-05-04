// eslint-disable-next-line import/no-extraneous-dependencies
import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { routerMiddleware } from 'connected-react-router';
import createEncryptor from 'redux-persist-transform-encrypt';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const encryptor = createEncryptor({
  secretKey: 'customermanagement',
  onError: function(error) {
    // Handle the error.
  }
});
const persistConfig = {
  // eslint-disable-next-line no-undef
  key: 'customermanagement',
  storage,
  transforms: [encryptor],
  // whitelist
  whitelist: []
};

export const history = createBrowserHistory();

export default (rootReducer, rootSaga) => {
  const middleware = [];
  const enhancers = [];

  // Connect the sagas to the redux store
  const sagaMiddleware = createSagaMiddleware();
  middleware.push(routerMiddleware(history));
  middleware.push(sagaMiddleware);
  if (process.env.NODE_ENV === `development`) {
    middleware.push(logger);
  }

  const devTools =
    process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'local'
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
      : null;
  enhancers.push(applyMiddleware(...middleware), devTools);

  // Redux persist
  const persistedReducer = persistReducer(persistConfig, rootReducer(history));

  const store = createStore(persistedReducer, compose(...enhancers));
  const persistor = persistStore(store);

  // Kick off the root saga
  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};
