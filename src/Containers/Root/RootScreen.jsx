import React from 'react';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { IntlProvider } from 'react-intl';

import { Row, Col, Layout, Icon } from 'antd';
import { history } from '../../Stores/CreateStore';

import AppNavigator from '../../Navigators/AppNavigator';
import languageObject from '../../Translations';
import StartupActions from '../../Stores/Startup/Actions';
import AppActions from '../../Stores/App/AppActions';
import './RootScreenStyle.css';
const { Header, Content, Footer } = Layout;

class RootScreen extends React.PureComponent {
  componentDidMount() {
    const { pathname, startup } = this.props;
    // Run the startup saga when the application is starting
    if (
      localStorage.getItem('accessToken') === undefined ||
      localStorage.getItem('accessToken') === ''
    ) {
      history.push('/login');
    }
  }

  useLogout = () => {
    localStorage.removeItem('accessToken');
    history.push('/login');
  };
  render() {
    const { appPath, headerText } = this.props;

    return (
      <IntlProvider locale={'en-US'} messages={languageObject['en']}>
        <ConnectedRouter history={history}>
          <Layout className="RootScreen">
            <Layout>
              <Header className={'header'}>
                <Row type="flex" justify="space-between" align="bottom">
                  <Col>
                    <h3 className="header-text">Customer Management | {headerText}</h3>
                  </Col>

                  <Col offset>
                    <Icon onClick={this.useLogout} className="logout-icon" type="logout" />
                  </Col>
                </Row>
              </Header>

              <Content className={'content'}>
                <AppNavigator appPath={appPath} />
              </Content>
              <Footer className={'footer'}>Customer Management ©2020 Created by Hafiz</Footer>
            </Layout>
          </Layout>
        </ConnectedRouter>
      </IntlProvider>
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  appPath: state.app.appPath,
  headerText: state.app.headerText
});

const mapDispatchToProps = dispatch => ({
  startup: pathname => dispatch(StartupActions.startup(pathname)),
  logout: () => dispatch(AppActions.appLogout())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootScreen);
