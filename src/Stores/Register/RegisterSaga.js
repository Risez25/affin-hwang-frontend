import { call, select, takeLatest } from 'redux-saga/effects';
import { notification } from 'antd';
import ApiService from '../../Services/ApiService';
import { RegisterTypes } from './RegisterAction';

const getAppStore = state => state.app;

export function* registerPostForm({ formikBag, form }) {
  formikBag.setSubmitting(true);
  try {
    const app = yield select(getAppStore);

    const result = yield call(
      ApiService.postApi, // function
      app.apiUrl,
      'auth/register',
      app.token,
      form // params
    );

    if (result.status === 200) {
      yield call(notification.success, {
        message: 'Successfully register customer',
        duration: parseInt(process.env.REACT_APP_SUCCESS_MESSAGE_DURATION, 10)
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    formikBag.setSubmitting(false);
  }
}

export const saga = [takeLatest(RegisterTypes.REGISTER_POST_FORM, registerPostForm)];
