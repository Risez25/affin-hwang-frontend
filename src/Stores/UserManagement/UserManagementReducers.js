/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { createReducer } from 'reduxsauce';
import { UserManagementTypes } from './UserManagementActions';
import INITIAL_STATE from './UserManagementState';

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */

export const userManagementOpenModal = (state, { boolean }) => ({
  ...state,
  is_visible: boolean
});

export const userManagementIsLoading = (state, { boolean }) => ({
  ...state,
  is_loading: boolean
});

export const userManagementSetTableLoading = (state, { boolean }) => ({
  ...state,
  is_table_loading: boolean
});
export const userManagementSetTableData = (state, { array }) => ({
  ...state,
  table_data: array
});
export const reducer = createReducer(INITIAL_STATE, {
  [UserManagementTypes.USER_MANAGEMENT_OPEN_MODAL]: userManagementOpenModal,
  [UserManagementTypes.USER_MANAGEMENT_IS_LOADING]: userManagementIsLoading,
  [UserManagementTypes.USER_MANAGEMENT_SET_TABLE_LOADING]: userManagementSetTableLoading,
  [UserManagementTypes.USER_MANAGEMENT_SET_TABLE_DATA]: userManagementSetTableData
});
