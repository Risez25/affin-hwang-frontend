```
npm install redux-persist
```
* persistConfig, key, must change to app name, so it will not mixed up with other app, if they use the default key, root

* Basic usage involves adding persistReducer and persistStore to your setup. IMPORTANT Every app needs to decide how many levels of state they want to "merge". The default is 1 level. Please read through the state reconciler docs for more information.
```
// configureStore.js

import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import rootReducer from './reducers'

const persistConfig = {
  key: 'luuwu-warehouse', //default, root
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}
```