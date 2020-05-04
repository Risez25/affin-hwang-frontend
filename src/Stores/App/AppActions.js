import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  appUpdateApiUrl: ['apiUrl'],
  appUpdateAppPath: ['appPath'],
  appAuthenticate: ['formikBag', 'email', 'password'],
  appSetHeaderText: ['text'],
  appSetToken: ['token']
});

export const AppTypes = Types;
export default Creators;
