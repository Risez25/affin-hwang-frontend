import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Input, Button, Icon } from 'antd';

const getColumnSortProps = (sorts, sortField) => {
  return {
    sorter: true,
    sortOrder: sortField in sorts && sorts[sortField]
  };
};

const getColumnSearchProps = (
  filters,
  columnTitle,
  filterField,
  handleSearch,
  handleReset,
  onFilter = null
) => {
  let searchInput;
  return {
    // eslint-disable-next-line react/prop-types
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
      return (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              searchInput = node;
            }}
            placeholder={columnTitle}
            value={selectedKeys ? selectedKeys[0] : ''}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            <FormattedMessage id="search" />
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            <FormattedMessage id="reset" />
          </Button>
        </div>
      );
    },
    filterIcon: filtered => (
      <Icon
        type="search"
        style={{
          color: filtered ? '#1890ff' : undefined
        }}
      />
    ),
    onFilter: onFilter || (() => true),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    filteredValue:
      filters && filterField in filters && filters[filterField] ? [filters[filterField]] : null
  };
};

export default {
  getColumnSortProps,
  getColumnSearchProps
};
