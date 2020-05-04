import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import LoginScreen from '../Containers/Login/LoginScreen';
import DashboardScreen from '../Containers/Dashboard/DashboardScreen';
import UserManagementScreen from '../Containers/UserManagement/UserManagementScreen';
import RegisterScreen from '../Containers/Register/RegisterScreen';

export default function AppNavigator(props) {
  const { appPath } = props;

  return (
    <Switch>
      <Route path={`${appPath}/login`} component={LoginScreen} exact />
      <Route path={`${appPath}/register`} component={RegisterScreen} exact />
      <Route path={`${appPath}/dashboard`} component={DashboardScreen} exact />

      <Route path={`${appPath}/userManagementScreen`} component={UserManagementScreen} exact />

      {/* <Route path={`${appPath}/`} name="Home" component={DashboardScreen} /> */}
    </Switch>
  );
}

AppNavigator.propTypes = {
  appPath: PropTypes.string
};

AppNavigator.defaultProps = {
  appPath: ''
};
