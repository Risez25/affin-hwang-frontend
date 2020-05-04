/* eslint-disable react/prop-types */
import React from 'react';
import { InputNumber } from 'antd';
import { ErrorMessage } from 'formik';

const FormikInputNumber = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  let style = { width: '100%' };
  if (form.errors[field.name]) {
    style = {
      ...style,
      borderColor: '#FF0000'
    };
  } else if (form.touched[field.name]) {
    style = {
      ...style,
      borderColor: '#00FF00'
    };
  }
  const { disabled, loading, onChange, precision, max } = props;

  return (
    <>
      <InputNumber
        name={field.name}
        value={field.value}
        onChange={value => {
          form.setFieldValue(field.name, value);
          if (onChange) {
            onChange(form, value);
          }
        }}
        onBlur={field.onBlur}
        disabled={form.isSubmitting || disabled || loading}
        style={style}
        precision={precision || 0}
        max={max || Number.MAX_SAFE_INTEGER}
      />
      <ErrorMessage name={field.name} render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
    </>
  );
};

export default FormikInputNumber;
