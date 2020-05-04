/* eslint-disable react/prop-types */
import React from 'react';
import { Transfer, Button } from 'antd';
import { ErrorMessage } from 'formik';

const FormikTransfer = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const { disabled, loading, onChange, intl } = props;

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
      <Transfer
        dataSource={[...field.value.source, ...field.value.target]}
        titles={['Source', 'Target']}
        targetKeys={field.value.target.map(entry => entry.key)}
        selectedKeys={
          `${field.name}_source_selected_keys` in form.values
            ? [
                ...form.values[`${field.name}_source_selected_keys`],
                ...form.values[`${field.name}_target_selected_keys`]
              ]
            : []
        }
        onChange={targetKeys => {
          const dataSource = [...field.value.source, ...field.value.target];
          const newSource = dataSource.filter(data => {
            return !targetKeys.includes(data.key);
          });

          const newTarget = dataSource.filter(data => {
            return targetKeys.includes(data.key);
          });

          form.setFieldValue(field.name, { source: newSource, target: newTarget });

          if (onChange) {
            onChange(form, { source: newSource, target: newTarget });
          }
        }}
        onSelectChange={(sourceSelectedKeys, targetSelectedKeys) => {
          form.setFieldValue(`${field.name}_source_selected_keys`, sourceSelectedKeys);
          form.setFieldValue(`${field.name}_target_selected_keys`, targetSelectedKeys);
        }}
        // onScroll={this.handleScroll}
        render={item => (item.title ? item.title : intl.formatMessage({ id: item.key }))}
        disabled={form.isSubmitting || disabled || loading}
        style={style}
        footer={() => (
          <>
            <Button
              icon="up"
              disabled={form.isSubmitting || disabled}
              onClick={() => {
                const newSource = field.value.source;
                const newTarget = field.value.target;

                // move source selected
                if (`${field.name}_source_selected_keys` in form.values) {
                  const sourceSelectedKeys = form.values[`${field.name}_source_selected_keys`];

                  // find the index in source
                  const foundIndexes = sourceSelectedKeys.map(keyValue => {
                    const foundIndex = newSource.reduce((lastIndex, data, index) => {
                      if (keyValue === data.key) {
                        return index;
                      }
                      return lastIndex;
                    }, -1);

                    return foundIndex;
                  });

                  // sort foundIndexes
                  foundIndexes.sort();

                  if (foundIndexes.length > 0 && foundIndexes[0] > 0) {
                    foundIndexes.forEach(foundIndex => {
                      const newIndex = foundIndex - 1;
                      const oldIndex = foundIndex;
                      newSource.splice(newIndex, 0, newSource.splice(oldIndex, 1)[0]);
                    });
                  }
                }

                // move target selected
                if (`${field.name}_target_selected_keys` in form.values) {
                  const targetSelectedKeys = form.values[`${field.name}_target_selected_keys`];

                  // find the index in target
                  const foundIndexes = targetSelectedKeys.map(keyValue => {
                    const foundIndex = newTarget.reduce((lastIndex, data, index) => {
                      if (keyValue === data.key) {
                        return index;
                      }
                      return lastIndex;
                    }, -1);

                    return foundIndex;
                  });

                  // sort foundIndexes
                  foundIndexes.sort();

                  if (foundIndexes.length > 0 && foundIndexes[0] > 0) {
                    foundIndexes.forEach(foundIndex => {
                      const newIndex = foundIndex - 1;
                      const oldIndex = foundIndex;
                      newTarget.splice(newIndex, 0, newTarget.splice(oldIndex, 1)[0]);
                    });
                  }
                }

                form.setFieldValue(field.name, { source: newSource, target: newTarget });
              }}
            />
            <Button
              icon="down"
              disabled={form.isSubmitting || disabled}
              onClick={() => {
                const newSource = field.value.source;
                const newTarget = field.value.target;

                // move source selected
                if (`${field.name}_source_selected_keys` in form.values) {
                  const sourceSelectedKeys = form.values[`${field.name}_source_selected_keys`];

                  // find the index in source
                  const foundIndexes = sourceSelectedKeys.map(keyValue => {
                    const foundIndex = newSource.reduce((lastIndex, data, index) => {
                      if (keyValue === data.key) {
                        return index;
                      }
                      return lastIndex;
                    }, -1);

                    return foundIndex;
                  });

                  // reverse sort foundIndexes
                  foundIndexes.reverse();

                  if (foundIndexes.length > 0 && foundIndexes[0] < newSource.length - 1) {
                    foundIndexes.forEach(foundIndex => {
                      const newIndex = foundIndex + 1;
                      const oldIndex = foundIndex;
                      newSource.splice(newIndex, 0, newSource.splice(oldIndex, 1)[0]);
                    });
                  }
                }

                // move target selected
                if (`${field.name}_target_selected_keys` in form.values) {
                  const targetSelectedKeys = form.values[`${field.name}_target_selected_keys`];

                  // find the index in target
                  const foundIndexes = targetSelectedKeys.map(keyValue => {
                    const foundIndex = newTarget.reduce((lastIndex, data, index) => {
                      if (keyValue === data.key) {
                        return index;
                      }
                      return lastIndex;
                    }, -1);

                    return foundIndex;
                  });

                  // reverse sort foundIndexes
                  foundIndexes.reverse();

                  if (foundIndexes.length > 0 && foundIndexes[0] < newTarget.length - 1) {
                    foundIndexes.forEach(foundIndex => {
                      const newIndex = foundIndex + 1;
                      const oldIndex = foundIndex;
                      newTarget.splice(newIndex, 0, newTarget.splice(oldIndex, 1)[0]);
                    });
                  }
                }

                form.setFieldValue(field.name, { source: newSource, target: newTarget });
              }}
            />
          </>
        )}
      />
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

export default FormikTransfer;
