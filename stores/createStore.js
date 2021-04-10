import {persistReducer, persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga'
import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware } from 'redux';

const persisConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: [], 
}

export default (rootReducer, rootSaga) => {
    const sagaMiddleware = createSagaMiddleware();
    const persistedReducer = persistReducer(persisConfig, rootReducer);
    const store = createStore(persistedReducer,applyMiddleware(sagaMiddleware));
    const persistor = persistStore(store);
    // kick off
    sagaMiddleware.run(rootSaga);

    return {store, persistor};
}   