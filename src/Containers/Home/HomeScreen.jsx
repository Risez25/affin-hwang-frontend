import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { Card } from 'antd';
import { bindActionCreators } from 'redux';
import AppActions from '../../Stores/App/AppActions';
class HomeScreen extends React.PureComponent {
  componentDidMount() {
    const { intl } = this.props;
    this.props.actions.appSetHeaderText(intl.formatMessage({ id: 'home' }));
  }

  render() {
    const { intl } = this.props;

    return <Card title={intl.formatMessage({ id: 'home' })} />;
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...AppActions }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(HomeScreen));
