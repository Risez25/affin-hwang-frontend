/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { createReducer } from 'reduxsauce';
import { AppTypes } from './AppActions';
import INITIAL_STATE from './AppState';

const appUpdateApiUrl = (state, { apiUrl }) => ({
  ...state,
  apiUrl
});

const appUpdateAppPath = (state, { appPath }) => ({
  ...state,
  appPath
});

const appSetHeaderText = (state, { text }) => {
  return {
    ...state,
    headerText: text
  };
};

const appSetToken = (state, { token }) => ({
  ...state,
  token: token
});

export const reducer = createReducer(INITIAL_STATE, {
  [AppTypes.APP_UPDATE_API_URL]: appUpdateApiUrl,
  [AppTypes.APP_UPDATE_APP_PATH]: appUpdateAppPath,
  [AppTypes.APP_SET_HEADER_TEXT]: appSetHeaderText,
  [AppTypes.APP_SET_TOKEN]: appSetToken
});
