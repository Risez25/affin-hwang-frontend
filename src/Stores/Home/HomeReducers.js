import { createReducer } from 'reduxsauce';
import { HomeTypes } from './HomeActions';
import INITIAL_STATE from './HomeState';

const homeSetData = (state, { data }) => {
  let newData = [];
  for (let index = 0; index < data.length; index++) {
    let element = data[index];
    element.key = index;
    newData.push(element);
  }
  return {
    ...state,
    data: newData
  };
};

const homeSetUpdateModal = (state, { boolean }) => ({
  ...state,
  isUpdateModalVisible: boolean
});

const homeSetDeleteModal = (state, { boolean }) => ({
  ...state,
  isDeleteModalVisible: boolean
});

const homeSetHomeForm = (state, { form }) => ({
  ...state,
  homeForm: form
});

export const reducer = createReducer(INITIAL_STATE, {
  [HomeTypes.HOME_SET_DATA]: homeSetData,
  [HomeTypes.HOME_SET_UPDATE_MODAL]: homeSetUpdateModal,
  [HomeTypes.HOME_SET_DELETE_MODAL]: homeSetDeleteModal,
  [HomeTypes.HOME_SET_HOME_FORM]: homeSetHomeForm
});
