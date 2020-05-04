import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  userManagementCreateUser: ['formikBag', 'userValues'],
  userManagementIsLoading: ['boolean'],
  userManagementOpenModal: ['boolean'],
  userManagementSetTableLoading: ['boolean'],
  userManagementSetTableData: ['array'],
  userManagementGetUsers: null
});

export const UserManagementTypes = Types;
export default Creators;
