/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { createReducer } from 'reduxsauce';
import { AppTypes } from './AppActions';
import INITIAL_STATE from './AppState';

export const appUpdateApiUrl = (state, { apiUrl }) => ({
  ...state,
  apiUrl
});

export const appUpdateAppPath = (state, { appPath }) => ({
  ...state,
  appPath
});

export const appAuthenticateSuccess = (state, { user }) => ({
  ...state,
  token: user.token,
  user
});

export const appChangeLocale = (state, { locale }) => ({
  ...state,
  locale
});

export const appChangeSiteFlow = (state, { siteFlowId }) => ({
  ...state,
  curSiteFlowId: siteFlowId
});

export const appFetchSiteFlowOptionLoading = (state, { boolean }) => ({
  ...state,
  siteFlowIsLoading: boolean
});

export const appFetchSiteFlowOptionSuccess = (state, { options }) => ({
  ...state,
  siteFlowOptions: options
});

export const appChangeDivision = (state, { divisionId }) => ({
  ...state,
  curDivisionId: divisionId
});

export const appFetchDivisionOptionLoading = (state, { boolean }) => ({
  ...state,
  divisionIsLoading: boolean
});

export const appFetchDivisionOptionSuccess = (state, { options }) => ({
  ...state,
  divisionOptions: options
});

export const appLogoutSuccess = state => ({
  ...state,
  token: '',
  user: INITIAL_STATE.user
});

export const appFetchPersonaLoading = (state, { boolean }) => ({
  ...state,
  personasIsLoading: boolean
});

export const appChangePersonas = (state, { array }) => {
  let personasArray = [];
  for (let index = 0; index < array.length; index++) {
    const { id, name } = array[index];
    personasArray.push({ value: id, label: name });
  }

  return {
    ...state,
    personas: personasArray
  };
};

const appSetHeaderText = (state, { text }) => {
  return {
    ...state,
    headerText: text
  };
};
/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [AppTypes.APP_UPDATE_API_URL]: appUpdateApiUrl,
  [AppTypes.APP_UPDATE_APP_PATH]: appUpdateAppPath,
  [AppTypes.APP_AUTHENTICATE_SUCCESS]: appAuthenticateSuccess,
  [AppTypes.APP_CHANGE_LOCALE]: appChangeLocale,
  [AppTypes.APP_LOGOUT_SUCCESS]: appLogoutSuccess,

  [AppTypes.APP_CHANGE_SITE_FLOW]: appChangeSiteFlow,
  [AppTypes.APP_FETCH_SITE_FLOW_OPTION_LOADING]: appFetchSiteFlowOptionLoading,
  [AppTypes.APP_FETCH_SITE_FLOW_OPTION_SUCCESS]: appFetchSiteFlowOptionSuccess,

  [AppTypes.APP_CHANGE_DIVISION]: appChangeDivision,
  [AppTypes.APP_FETCH_DIVISION_OPTION_LOADING]: appFetchDivisionOptionLoading,
  [AppTypes.APP_FETCH_DIVISION_OPTION_SUCCESS]: appFetchDivisionOptionSuccess,

  [AppTypes.APP_FETCH_PERSONA_LOADING]: appFetchPersonaLoading,
  [AppTypes.APP_CHANGE_PERSONAS]: appChangePersonas,

  [AppTypes.APP_SET_HEADER_TEXT]: appSetHeaderText
});
