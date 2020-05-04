import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { Layout } from 'antd';
import UserManagementTable from './UserManagementTable';
import UserManagementBreadCrumb from './UserManagementBreadCrumb';
import UserManagementModal from './UserManagementModal';
import "./UserManagementStyle.css"
class UserManagementScreen extends React.PureComponent {
  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    return (
      <Layout className="UserManagementScreen">
        <UserManagementModal />
        <UserManagementBreadCrumb />
        <UserManagementTable />
      </Layout>
    );
  }
}

UserManagementScreen.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(UserManagementScreen));
