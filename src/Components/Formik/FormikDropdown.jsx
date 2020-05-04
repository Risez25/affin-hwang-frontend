/* eslint-disable react/prop-types */
import React from 'react';
import { Select } from 'antd';
import { ErrorMessage } from 'formik';
const { Option } = Select;
const FormikDropdown = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  let style = {};
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
  const { disabled, loading, datasource } = props;

  return (
    <>
      <Select
        showSearch
        style={style}
        value={field.value}
        placeholder={field.placeholder}
        optionFilterProp="children"
        onChange={field.onChange}
        onFocus={field.onFocus}
        onBlur={field.onBlur}
        disabled={form.isSubmitting || disabled || loading}
        onSearch={field.onSearch}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {datasource.map(value => (
          <Option value={value.id}>{value.label}</Option>
        ))}
      </Select>
      <ErrorMessage name={field.name} render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
    </>
  );
};

export default FormikDropdown;
