/* eslint-disable react/prop-types */
import React from 'react';
import { DatePicker } from 'antd';
import { ErrorMessage } from 'formik';
import moment from 'moment';

const FormikDatePicker = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  let style = {};
  if (form.errors[field.name]) {
    style = {
      ...style,
      backgroundColor: '#FF0000'
    };
  } else if (form.touched[field.name]) {
    style = {
      ...style,
      backgroundColor: '#00FF00'
    };
  }
  const { disabled, loading } = props;

  return (
    <>
      <DatePicker
        id={field.name}
        value={moment(field.value)}
        // onChange={field.onChange}
        onChange={e => {
          if (e) {
            form.setFieldValue(field.name, e.format('YYYY-MM-DD'));
          } else {
            form.setFieldValue(field.name, '1970-01-01');
          }
        }}
        onBlur={() => {
          form.setFieldTouched(field.name, true);
        }}
        disabled={form.isSubmitting || disabled || loading}
        style={style}
      />
      <ErrorMessage name={field.name} render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
    </>
  );
};

export default FormikDatePicker;
