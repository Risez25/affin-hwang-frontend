import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { PropTypes } from 'prop-types';

import { Card } from 'antd';

class DashboardScreen extends React.PureComponent {
  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    const { intl } = this.props;

    return <Card title={intl.formatMessage({ id: 'dashboard' })} />;
  }
}

DashboardScreen.propTypes = {
  intl: PropTypes.object
};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(DashboardScreen));
