import { all } from 'redux-saga/effects';

import { saga as AppSaga } from './App/AppSaga';
import { saga as StartupSaga } from './Startup/StartupSaga';
import { saga as RegisterSaga } from './Register/RegisterSaga';

export const rootSaga = function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    ...AppSaga,
    ...StartupSaga,
    ...RegisterSaga
  ]);
};
