import { put, call, select, takeLatest } from 'redux-saga/effects';
import { replace, goBack, push } from 'connected-react-router';
import { notification } from 'antd';
import AppActions, { AppTypes } from './AppActions';
import ApiService from '../../Services/ApiService';

const getAppStore = state => state.app;
const getRouterStore = state => state.router;

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
      postData // params
    );
    if (result.isSuccess === true) {
      // yield put(AppActions.appAuthenticateSuccess(result.data, result.message));
    } else if (result.isTokenExpired === true) {
      // yield put(AppActions.appTokenExpired(result.message));
    } else if (result.isPasswordExpired === true) {
      // yield put(AppActions.appPasswordExpired(result.message));
    } else {
      // yield call(notification.error, {
      //   message: result.message,
      //   duration: parseInt(process.env.REACT_APP_ERROR_MESSAGE_DURATION, 10)
      // });
    }
  } catch (error) {
    // yield call(notification.error, {
    //   message: error.message,
    //   duration: parseInt(process.env.REACT_APP_ERROR_MESSAGE_DURATION, 10)
    // });
  } finally {
    formikBag.setSubmitting(false);
  }
}

export function* appAuthenticateSuccess({ successMessage }) {
  // const app = yield select(getAppStore);
  // yield put(replace(`${app.appPath}/dashboard`));
  yield put(goBack());
  yield call(notification.success, {
    message: successMessage,
    duration: parseInt(process.env.REACT_APP_SUCCESS_MESSAGE_DURATION, 10)
  });
}

export function* appTokenExpired({ errorMessage }) {
  const app = yield select(getAppStore);
  const router = yield select(getRouterStore);
  if (router.location.pathname !== `${app.appPath}/login`) {
    yield put(push(`${app.appPath}/login`));
    yield call(notification.error, {
      message: errorMessage,
      duration: parseInt(process.env.REACT_APP_ERROR_MESSAGE_DURATION, 10)
    });
  }
}

export function* appPasswordExpired({ errorMessage }) {
  const app = yield select(getAppStore);
  yield put(push(`${app.appPath}/changePassword`));
  yield call(notification.error, {
    message: errorMessage,
    duration: parseInt(process.env.REACT_APP_ERROR_MESSAGE_DURATION, 10)
  });
}

export function* appChangePassword({ formikBag, currentPassword, newPassword }) {
  formikBag.setSubmitting(true);
  try {
    const app = yield select(getAppStore);
    const postData = {
      currentPassword,
      newPassword
    };

    const result = yield call(
      ApiService.postApi, // function
      app.apiUrl,
      `auth/changePassword`,
      app.token,
      postData // params
    );
    if (result.isSuccess === true) {
      yield put(AppActions.appChangePasswordSuccess(result.message));
    } else if (result.isTokenExpired === true) {
      yield put(AppActions.appTokenExpired(result.message));
    } else if (result.isPasswordExpired === true) {
      yield put(AppActions.appPasswordExpired(result.message));
    } else {
      yield call(notification.error, {
        message: result.message,
        duration: parseInt(process.env.REACT_APP_ERROR_MESSAGE_DURATION, 10)
      });
    }
  } catch (error) {
    yield call(notification.error, {
      message: error.message,
      duration: parseInt(process.env.REACT_APP_ERROR_MESSAGE_DURATION, 10)
    });
  } finally {
    formikBag.setSubmitting(false);
  }
}

export function* appChangePasswordSuccess({ successMessage }) {
  yield call(notification.success, {
    message: successMessage,
    duration: parseInt(process.env.REACT_APP_SUCCESS_MESSAGE_DURATION, 10)
  });
}

export function* appHistoryGoBack() {
  yield put(goBack());
}

export function* appFetchSiteFlowOptions() {
  try {
    yield put(AppActions.appFetchSiteFlowOptionLoading(true));

    const app = yield select(getAppStore);
    const getData = {};

    const result = yield call(
      ApiService.getApi, // function
      app.apiUrl,
      `site/indexSiteFlow`,
      app.token,
      getData,
      'multipart/form-data' // params
    );

    if (result.isSuccess === true) {
      const options = result.data.map(d => ({
        value: d.id,
        label: `${d.code}`
      }));

      yield put(AppActions.appFetchSiteFlowOptionSuccess(options));
    } else if (result.isTokenExpired === true) {
      yield put(AppActions.appTokenExpired(result.message));
    } else if (result.isPasswordExpired === true) {
      yield put(AppActions.appPasswordExpired(result.message));
    } else {
      yield call(notification.error, {
        message: result.message,
        duration: parseInt(process.env.REACT_APP_ERROR_MESSAGE_DURATION, 10)
      });
    }
  } catch (error) {
    yield call(notification.error, {
      message: error.message,
      duration: parseInt(process.env.REACT_APP_ERROR_MESSAGE_DURATION, 10)
    });
  } finally {
    yield put(AppActions.appFetchSiteFlowOptionLoading(false));
  }
}

export function* appFetchDivisionOptions({ siteFlowId }) {
  try {
    yield put(AppActions.appFetchDivisionOptionLoading(true));

    const app = yield select(getAppStore);
    const getData = { siteFlowId };

    const result = yield call(
      ApiService.getApi, // function
      app.apiUrl,
      `division/index`,
      app.token,
      getData,
      'multipart/form-data' // params
    );

    if (result.isSuccess === true) {
      let isMatched = false;
      let firstDivisionId = 0;
      const options = result.data.map(d => {
        if (app.curDivisionId === d.id) {
          isMatched = true;
        }
        if (firstDivisionId === 0) {
          firstDivisionId = d.id;
        }

        return {
          value: d.id,
          label: `${d.code}`
        };
      });

      if (isMatched === false) {
        yield put(AppActions.appChangeDivision(firstDivisionId));
      }

      yield put(AppActions.appFetchDivisionOptionSuccess(options));
    } else if (result.isTokenExpired === true) {
      yield put(AppActions.appTokenExpired(result.message));
    } else if (result.isPasswordExpired === true) {
      yield put(AppActions.appPasswordExpired(result.message));
    } else {
      yield call(notification.error, {
        message: result.message,
        duration: parseInt(process.env.REACT_APP_ERROR_MESSAGE_DURATION, 10)
      });
    }
  } catch (error) {
    yield call(notification.error, {
      message: error.message,
      duration: parseInt(process.env.REACT_APP_ERROR_MESSAGE_DURATION, 10)
    });
  } finally {
    yield put(AppActions.appFetchDivisionOptionLoading(false));
  }
}

export function* appLogout() {
  try {
    const app = yield select(getAppStore);
    const postData = {};

    const result = yield call(
      ApiService.postApi, // function
      app.apiUrl,
      `login/logout`,
      app.token,
      postData // params
    );
    if (result.isSuccess === true) {
      yield put(AppActions.appLogoutSuccess(result.message));
    } else if (result.isTokenExpired === true) {
      yield put(AppActions.appTokenExpired(result.message));
    } else if (result.isPasswordExpired === true) {
      yield put(AppActions.appPasswordExpired(result.message));
    } else {
      yield call(notification.error, {
        message: result.message,
        duration: parseInt(process.env.REACT_APP_ERROR_MESSAGE_DURATION, 10)
      });
    }
  } catch (error) {
    yield call(notification.error, {
      message: error.message,
      duration: parseInt(process.env.REACT_APP_ERROR_MESSAGE_DURATION, 10)
    });
  }
}

export function* appLogoutSuccess({ successMessage }) {
  const app = yield select(getAppStore);
  yield put(push(`${app.appPath}/login`));
  yield call(notification.success, {
    message: successMessage,
    duration: parseInt(process.env.REACT_APP_SUCCESS_MESSAGE_DURATION, 10)
  });
}

export function* appGoToHome() {
  const app = yield select(getAppStore);
  yield put(replace(`${app.appPath}/`));
}

export function* appFetchPersonas() {
  try {
    const app = yield select(getAppStore);
    yield put(AppActions.appFetchPersonaLoading(true));
    const result = yield call(
      ApiService.getApi, // function
      app.apiUrl,
      'public/RoleController/getRoles',
      'app.token',
    );
    yield put(AppActions.appChangePersonas(result.data));
  } catch (error) {
    yield call(notification.error, {
      message: error.message + ' on Personas call',
      duration: parseInt(process.env.REACT_APP_ERROR_MESSAGE_DURATION, 10)
    });
  } finally {
    yield put(AppActions.appFetchPersonaLoading(false));
  }
}

export const saga = [
  takeLatest(AppTypes.APP_AUTHENTICATE, appAuthenticate),
  takeLatest(AppTypes.APP_AUTHENTICATE_SUCCESS, appAuthenticateSuccess),
  takeLatest(AppTypes.APP_TOKEN_EXPIRED, appTokenExpired),
  takeLatest(AppTypes.APP_PASSWORD_EXPIRED, appPasswordExpired),
  takeLatest(AppTypes.APP_CHANGE_PASSWORD, appChangePassword),
  takeLatest(AppTypes.APP_CHANGE_PASSWORD_SUCCESS, appChangePasswordSuccess),
  takeLatest(AppTypes.APP_HISTORY_GO_BACK, appHistoryGoBack),
  takeLatest(AppTypes.APP_GO_TO_HOME, appGoToHome),
  takeLatest(AppTypes.APP_LOGOUT, appLogout),
  takeLatest(AppTypes.APP_LOGOUT_SUCCESS, appLogoutSuccess),
  takeLatest(AppTypes.APP_FETCH_SITE_FLOW_OPTIONS, appFetchSiteFlowOptions),
  takeLatest(AppTypes.APP_FETCH_DIVISION_OPTIONS, appFetchDivisionOptions),
  takeLatest(AppTypes.APP_FETCH_PERSONAS, appFetchPersonas)
];
