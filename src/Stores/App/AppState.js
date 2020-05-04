/**
 * The initial values for the redux state.
 */
export default {
  token: '',
  apiUrl: '',
  appPath: '',
  locale: 'en-US',
  curDivisionId: 1,
  curSiteFlowId: 1,
  user: {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    timezone: '',
    last_login: '',
    password_changed_at: ''
  },
  login_form: {
    email: '',
    password: ''
  },
  siteFlowOptions: [],
  siteFlowIsLoading: false,
  divisionOptions: [],
  divisionIsLoading: false,

  personas: [],
  personasIsLoading: false,
  headerText: ''
};
