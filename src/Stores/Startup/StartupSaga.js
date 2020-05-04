import { put, takeLatest } from 'redux-saga/effects';
// import { replace, push } from 'connected-react-router';
import AppActions from '../App/AppActions';
import { StartupTypes } from './Actions';

/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */

// const getAppStore = state => state.app;

export function* startup() {
  // const app = yield select(getAppStore);

  // eslint-disable-next-line no-undef
  if (window.API_URL !== null || window.API_URL !== 'undefined' || window.API_URL !== '') {
    // update the API_URL from public/config.js
    // eslint-disable-next-line no-undef
    yield put(AppActions.appUpdateApiUrl(window.API_URL));
  }

  // eslint-disable-next-line no-undef
  if (window.APP_PATH !== null || window.APP_PATH !== 'undefined' || window.APP_PATH !== '') {
    // update the APP_PATH from public/config.js
    // eslint-disable-next-line no-undef
    yield put(AppActions.appUpdateAppPath(window.APP_PATH));
  }

  // yield put(replace(app.appPath + pathname));
  // if (app.token === null || app.token === '') {
  //   yield put(push(`${app.appPath}/login`));
  // }
}

export const saga = [takeLatest(StartupTypes.STARTUP, startup)];
