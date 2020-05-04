/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'antd';

const FormikButton = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const { disabled, style, label, value, type, loading, onClick, icon } = props;

  return (
    <>
      <Button
        name={field.name}
        type={type}
        disabled={disabled}
        style={style}
        loading={loading}
        onClick={e => {
          form.setFieldValue(field.name, value, false);
          onClick(e);
        }}
        icon={icon || ''}
      >
        {label}
      </Button>
    </>
  );
};

export default FormikButton;
