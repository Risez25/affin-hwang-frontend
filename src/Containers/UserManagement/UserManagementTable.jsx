import React from 'react';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { PropTypes } from 'prop-types';
import { Input, Button } from 'antd';
import AntDesignTable from '../../Components/AntDesignTable';
import { Card, Row, Col, Table } from 'antd';
import UserManagementActions from '../../Stores/UserManagement/UserManagementActions';

class UserMangementTable extends React.PureComponent {
  componentDidMount() {
    const { getUsers } = this.props;
    getUsers();
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  getDocumentColumns() {
    const { intl, sorts, filters } = this.props;

    return [
      {
        width: 120,
        align: 'left',
        title: intl.formatMessage({ id: 'name' }),
        // sort field
        dataIndex: 'name',
        ...AntDesignTable.getColumnSortProps(sorts, 'name'),
        // filter field
        key: 'name',
        ...AntDesignTable.getColumnSearchProps(
          filters,
          intl.formatMessage({ id: 'name' }),
          'name',
          this.handleSearch,
          this.handleReset
        ),
        render: (text, record) => record.name
      },
      {
        width: 100,
        align: 'left',
        title: intl.formatMessage({ id: 'persona' }),
        // sort field
        dataIndex: 'persona',
        ...AntDesignTable.getColumnSortProps(sorts, 'persona'),
        // filter field
        key: 'persona',
        ...AntDesignTable.getColumnSearchProps(
          filters,
          intl.formatMessage({ id: 'persona' }),
          'persona',
          this.handleSearch,
          this.handleReset
        ),
        render: (text, record) => record.persona
      },
      {
        width: 100,
        align: 'left',
        title: intl.formatMessage({ id: 'email' }),
        // sort field
        dataIndex: 'email',
        ...AntDesignTable.getColumnSortProps(sorts, 'email'),
        // filter field
        key: 'email',
        render: (text, record) => record.email
      },
      {
        width: 100,
        align: 'left',
        title: intl.formatMessage({ id: 'contact_no' }),
        // sort field
        dataIndex: 'contact_no',
        ...AntDesignTable.getColumnSortProps(sorts, 'contact_no'),
        // filter field
        key: 'contact_no',
        render: (text, record) => record.contact_no
      },
      {
        width: 50,
        key: 'action',
        title: intl.formatMessage({ id: 'action' }),
        render: (text, record) => (
          <>
            <Button type="dashed" icon="edit" />
            <Button type="dashed" icon="audit" />
          </>
        )
      }
    ];
  }
  render() {
    const { currentPage, pageSize, total,table_data, setOpenModal } = this.props;
    return (
      <Card>
        <Table
          size="small"
          // rowSelection={rowSelection}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total,
            showTotal: () => `${total} items`
          }}
          columns={this.getDocumentColumns()}
          dataSource={table_data}
          // loading={fetchIsLoading}
          bordered
          onChange={this.useOnTableChange}
          title={() => (
            <>
              <Row type="flex" justify="space-between" gutter={[0, 16]}>
                <Col span={8}>
                  <Input.Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    style={{ width: 200 }}
                  />
                </Col>
                <Col span={8} offset={8}>
                  <Button onClick={() => setOpenModal(true)} icon="plus">
                    <FormattedMessage id="add_new_user" />
                  </Button>
                </Col>
              </Row>
            </>
          )}
          scroll={{ x: 950 }}
        />
      </Card>
    );
  }
}

UserMangementTable.propTypes = {
  intl: PropTypes.object,
  currentPage: PropTypes.number,
  pageSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  total: PropTypes.number,
  sorts: PropTypes.object,
  table_data: PropTypes.array,
  setOpenModal: PropTypes.func,
  getUsers: PropTypes.func
};

const mapStateToProps = state => ({
  currentPage: state.userManagement.currentPage,
  pageSize: state.userManagement.pageSize,
  total: state.userManagement.total,
  sorts: state.userManagement.sorts,
  table_data: state.userManagement.table_data
});

const mapDispatchToProps = dispatch => ({
  setOpenModal: boolean => dispatch(UserManagementActions.userManagementOpenModal(boolean)),
  getUsers: () => dispatch(UserManagementActions.userManagementGetUsers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(UserMangementTable));
