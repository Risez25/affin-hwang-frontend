import { put, call, select, takeLatest } from 'redux-saga/effects';
import AppActions, { AppTypes } from './AppActions';
import ApiService from '../../Services/ApiService';
import { history } from '../CreateStore';

const getAppStore = state => state.app;

export function* appAuthenticate({ formikBag, email, password }) {
  formikBag.setSubmitting(true);
  try {
    const app = yield select(getAppStore);
    const postData = {
      email,
      password
    };

    const result = yield call(
      ApiService.postApi, // function
      app.apiUrl,
      'auth/login',
      app.token,
      postData // params
    );
    if (result.status === 200) {
      yield put(AppActions.appSetToken(result.data.token.accessToken));
      yield put(history.push('/dashboard'))
    }
  } catch (error) {
  } finally {
    formikBag.setSubmitting(false);
  }
}

export const saga = [takeLatest(AppTypes.APP_AUTHENTICATE, appAuthenticate)];
