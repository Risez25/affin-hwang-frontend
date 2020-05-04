/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import createStore from './Stores/index.reducer';
import RootScreen from './Containers/Root/RootScreen';

import './App.css';

const { store, persistor } = createStore();

function App() {
  return (
    <Provider store={store}>
      {/**
       * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
       * and saved to redux.
       * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
       * for example `loading={<SplashScreen />}`.
       * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
       */}
      <PersistGate loading={<p>loading</p>} persistor={persistor}>
        <RootScreen />
      </PersistGate>
    </Provider>
  );
}

export default App;
