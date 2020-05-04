import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import LoginScreen from '../Containers/Login/LoginScreen';
import RegisterScreen from '../Containers/Register/RegisterScreen';
import HomeScreen from '../Containers/Home/HomeScreen';

export default function AppNavigator(props) {
  const { appPath } = props;

  return (
    <Switch>
      <Route path={`${appPath}/login`} component={LoginScreen} exact />
      <Route path={`${appPath}/register`} component={RegisterScreen} exact />
      <Route path={`${appPath}/home`} component={HomeScreen} exact />


      <Route path={`${appPath}/`} name="Home" component={HomeScreen} />
    </Switch>
  );
}

AppNavigator.propTypes = {
  appPath: PropTypes.string
};

AppNavigator.defaultProps = {
  appPath: ''
};
