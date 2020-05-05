import { put, call, select, takeLatest } from 'redux-saga/effects';
import ApiService from '../../Services/ApiService';
import HomeActions, { HomeTypes } from './HomeActions';
import { notification } from 'antd';
import { history } from '../CreateStore';

export function* homeFetchCustomers() {
  try {
    yield put(HomeActions.homeSetData([]));
    const result = yield call(
      ApiService.getApi, // function
      'customer/customer'
    );

    if (result.status === 401) {
      localStorage.removeItem('accessToken');
      yield put(history.push('./login'));
    }

    if (result.status === 200) {
      yield put(HomeActions.homeSetData(result.data.data));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* homeUpdateCustomer({ formikBag, form }) {
  try {
    formikBag.setSubmitting(true);
    const result = yield call(
      ApiService.putApi, // function
      'auth/update',
      form
    );

    if (result.status === 401) {
      localStorage.removeItem('accessToken');
      yield put(history.push('./login'));
    }

    if (result.status === 200) {
      yield call(notification.success, {
        message: 'Successfully update customer',
        duration: parseInt(process.env.REACT_APP_SUCCESS_MESSAGE_DURATION, 10)
      });
      yield put(HomeActions.homeSetUpdateModal(false));
      yield put(
        HomeActions.homeSetHomeForm({
          name: '',
          email: '',
          dob: '1970-01-01',
          address: '',
          phone: '',
          password: ''
        })
      );
      yield put(HomeActions.homeFetchCustomers());
    }
  } catch (error) {
    console.log(error);
  }
}

export function* homeDeleteCustomer({ email }) {
  try {
    const result = yield call(
      ApiService.deleteApi, // function
      `auth/delete/${email}`
    );

    if (result.status === 401) {
      localStorage.removeItem('accessToken');
      yield put(history.push('./login'));
    }

    if (result.status === 200) {
      yield call(notification.success, {
        message: 'Successfully delete customer',
        duration: parseInt(process.env.REACT_APP_SUCCESS_MESSAGE_DURATION, 10)
      });
      yield put(HomeActions.homeSetDeleteModal(false));
      yield put(
        HomeActions.homeSetHomeForm({
          name: '',
          email: '',
          dob: '1970-01-01',
          address: '',
          phone: '',
          password: ''
        })
      );
      yield put(HomeActions.homeFetchCustomers());
    }
  } catch (error) {
    console.log(error);
  }
}

export const saga = [
  takeLatest(HomeTypes.HOME_FETCH_CUSTOMERS, homeFetchCustomers),
  takeLatest(HomeTypes.HOME_UPDATE_CUSTOMER, homeUpdateCustomer),
  takeLatest(HomeTypes.HOME_DELETE_CUSTOMER, homeDeleteCustomer)
];
