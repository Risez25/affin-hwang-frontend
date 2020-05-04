/* eslint-disable react/prop-types */
import React from 'react';
import { Select } from 'antd';
import { ErrorMessage } from 'formik';

const { Option } = Select;

const FormikSelect = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const {
    selectMode,
    options,
    placeholder,
    defaultActiveFirstOption,
    showArrow,
    filterOption,
    onSearch,
    notFoundContent,
    loading,
    disabled,
    onChange
  } = props;

  const processedOptions = options
    ? options.map(d => <Option value={d.value} key={d.value}>{`${d.label}`}</Option>)
    : [];

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

  return (
    <>
      <Select
        mode={selectMode || 'default'}
        showSearch
        value={
          // eslint-disable-next-line no-nested-ternary
          selectMode === 'multiple'
            ? field.value.map(d => (typeof d === 'object' && 'label' in d ? d.label : d))
            : typeof field.value === 'object' && 'label' in field.value
            ? field.value.label
            : field.value
        }
        style={style}
        placeholder={placeholder}
        defaultActiveFirstOption={defaultActiveFirstOption}
        showArrow={showArrow}
        filterOption={filterOption}
        onDropdownVisibleChange={open => {
          if (open && processedOptions.length === 0) {
            if (onSearch) {
              onSearch(form, '');
            }
          }
        }}
        onSearch={value => {
          if (onSearch) {
            onSearch(form, value);
          }
        }}
        onSelect={(value, option) => {
          if (selectMode === 'multiple') {
            const foundIndex = field.value.reduce((lastIndex, data, index) => {
              if (data.value === value) {
                return index;
              }
              return lastIndex;
            }, -1);

            const curOption = { value: option.props.value, label: option.props.children };
            form.setFieldValue(
              field.name,
              foundIndex === -1 ? [...field.value, curOption] : field.value
            );
          } else {
            const curOption = { value: option.props.value, label: option.props.children };
            form.setFieldValue(field.name, curOption);
          }

          if (onChange) {
            onChange(form, value, option);
          }
        }}
        onDeselect={(value, option) => {
          if (selectMode === 'multiple') {
            const newOptions = field.value.filter(data => {
              return data.label !== value;
            });
            form.setFieldValue(field.name, newOptions);
          } else {
            const curOption = { value: 0, label: '' };
            form.setFieldValue(field.name, curOption);
          }

          if (onChange) {
            onChange(form, value, option);
          }
        }}
        notFoundContent={notFoundContent}
        loading={loading}
        disabled={form.isSubmitting || disabled}
      >
        {processedOptions}
      </Select>
      <ErrorMessage
        name={field.name}
        render={msg => {
          return typeof msg === 'object' && 'value' in msg ? (
            <div style={{ color: 'red' }}>{msg.value}</div>
          ) : (
            <div style={{ color: 'red' }}>{msg}</div>
          );
        }}
      />
    </>
  );
};

export default FormikSelect;
