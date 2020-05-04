```
npm install react-redux
npm install redux-saga
npm install axios
npm install reduxsauce
npm install redux-logger
```
- App.js, put the Provider code, PersistGate
```
<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <RootScreen />
    </PersistGate>
</Provider>
```
- create App/Stores, and App/Sagas folder