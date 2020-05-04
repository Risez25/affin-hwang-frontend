/**
 * The initial values for the redux state.
 */
export default {
  documents: [],
  user_management_modal_form: {
    name: '',
    email: '',
    contact_no: '',
    persona: ''
  },
  fetchIsLoading: false,
  sorts: {},
  filters: {},
  pageSize: '20',
  currentPage: 1,
  lastPage: 0,
  total: 0,
  is_visible: false,
  is_disable: false,
  is_loading: false,
  is_table_loading: false,
  table_data:[]
};
