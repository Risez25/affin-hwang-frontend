/* eslint-disable react/prop-types */
import React from 'react';
import { Input } from 'antd';
import { ErrorMessage } from 'formik';

const FormikTextNumber = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const { minimumfractiondigits, maximumfractiondigits } = props;

  let style = { textAlign: 'right' };
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

  return (
    <>
      <Input
        name={field.name}
        value={new Intl.NumberFormat([], {
          style: 'decimal',
          minimumFractionDigits: minimumfractiondigits,
          maximumFractionDigits: maximumfractiondigits
        }).format(field.value)}
        onChange={field.onChange}
        onBlur={field.onBlur}
        disabled
        style={style}
      />
      <ErrorMessage name={field.name} render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
    </>
  );
};

export default FormikTextNumber;
