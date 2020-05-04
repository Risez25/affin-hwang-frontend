// eslint-disable-next-line import/no-extraneous-dependencies
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import configureStore from './CreateStore';
import { rootSaga } from './index.saga';
import { reducer as AppReducer } from './App/AppReducers';
import { reducer as RegisterReducer } from './Register/RegisterReducers';

export default () => {
  const rootReducer = history =>
    combineReducers({
      router: connectRouter(history),
      /**
       * Register your reducers here.
       * @see https://redux.js.org/api-reference/combinereducers
       */
      app: AppReducer,
      register: RegisterReducer
    });

  return configureStore(rootReducer, rootSaga);
};
