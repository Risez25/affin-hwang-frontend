const config = {
  appKey: 'customermanagement',
  lang: 'en',
  LOGGER: true,
  env: {
    development: {
      API_URL: 'http://localhost:3000',
      APP_PATH: ''
    },
    production: {
      API_URL: '',
      APP_PATH: ''
    },
    localhost: {
      API_URL: 'http://localhost:3000',
      APP_PATH: ''
    }
  }
};
export default config;
