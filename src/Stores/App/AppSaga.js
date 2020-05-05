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
      'auth/login',
      postData // params
    );
    if (result.status === 200) {
      localStorage.setItem('accessToken', result.data.token.accessToken);
      yield put(AppActions.appSetToken(result.data.token.accessToken));
      yield put(history.push('/home'));
    }
  } catch (error) {
  } finally {
    formikBag.setSubmitting(false);
  }
}

export const saga = [takeLatest(AppTypes.APP_AUTHENTICATE, appAuthenticate)];
