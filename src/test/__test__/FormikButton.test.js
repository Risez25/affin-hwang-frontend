import React from 'react';
import FormikButton from '../../Components/Formik/FormikButton';
import { Field } from 'formik';
import ReactDOM from 'react-dom';

describe('Formik button', () => {
  it('check Formik button renders without crashing', () => {
    const div = global.document.createElement('div');
    let field={
      name:'submit_action'
    }
    ReactDOM.render(
      <FormikButton
        field={field}
        value="void"
        style={{ backgroundColor: 'red', color: 'white' }}
        disabled={'create'}
        label="create"
        loading={false}
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
