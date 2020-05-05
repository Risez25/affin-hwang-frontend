const config = {
  appKey: 'customermanagement',
  lang: 'en',
  LOGGER: true,
  BASE_API_URL: 'http://localhost:3000',
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
