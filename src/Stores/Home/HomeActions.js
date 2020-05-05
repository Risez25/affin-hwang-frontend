import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  homeFetchCustomers: [],
  homeSetData: ['data'],
  homeSetUpdateModal: ['boolean'],
  homeSetDeleteModal: ['boolean'],
  homeSetHomeForm: ['form'],
  homeUpdateCustomer: ['formikBag', 'form'],
  homeDeleteCustomer: ['email']
});

export const HomeTypes = Types;
export default Creators;
