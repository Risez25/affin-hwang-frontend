import React from 'react';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';

import { Breadcrumb } from 'antd';

class UserManagementBreadCrumb extends React.PureComponent {
  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    const { intl } = this.props;
    return (
      <div className="UserManagementBreadCrumb">
        <Breadcrumb>
          <Breadcrumb.Item>
            <FormattedMessage id="home" />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <FormattedMessage id="settings" />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span className="user-management">
              {intl.formatMessage({ id: 'user_management' })}
            </span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    );
  }
}

UserManagementBreadCrumb.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(UserManagementBreadCrumb));
