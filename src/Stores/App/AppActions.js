import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  appUpdateApiUrl: ['apiUrl'],
  appUpdateAppPath: ['appPath'],
  appAuthenticate: ['formikBag', 'email', 'password'],
  appAuthenticateSuccess: ['user', 'successMessage'],
  appChangePassword: ['formikBag', 'currentPassword', 'newPassword'],
  appChangePasswordSuccess: ['successMessage'],
  appTokenExpired: ['errorMessage'],
  appPasswordExpired: ['errorMessage'],
  appChangeLocale: ['locale'],
  appHistoryGoBack: [],
  appGoToHome: [],
  appLogout: null,
  appLogoutSuccess: ['successMessage'],

  appFetchSiteFlowOptions: null,
  appFetchSiteFlowOptionLoading: ['boolean'],
  appFetchSiteFlowOptionSuccess: ['options'],
  appChangeSiteFlow: ['siteFlowId'],

  appFetchDivisionOptions: ['siteFlowId'],
  appFetchDivisionOptionLoading: ['boolean'],
  appFetchDivisionOptionSuccess: ['options'],
  appChangeDivision: ['divisionId'],

  appFetchPersonas: null,
  appFetchPersonaLoading: ['boolean'],
  appFetchPersonaSuccess: ['options'],
  appChangePersonas: ['array'],

  appSetHeaderText: ['text']
});

export const AppTypes = Types;
export default Creators;
