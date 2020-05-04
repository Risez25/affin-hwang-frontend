import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  registerSetIsLoading: ['boolean'],
  registerPostForm: ['formikBag', 'form']
});

export const RegisterTypes = Types;
export default Creators;
