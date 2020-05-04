/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { createReducer } from 'reduxsauce';
import { RegisterTypes } from './RegisterAction';
import INITIAL_STATE from './RegisterState';

const registerSetIsLoading = (state, { boolean }) => ({
  ...state,
  isLoading: boolean
});
export const reducer = createReducer(INITIAL_STATE, {
  [RegisterTypes.REGISTER_SET_IS_LOADING]: registerSetIsLoading
});
