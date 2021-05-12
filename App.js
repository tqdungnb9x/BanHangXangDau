import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { BeginNavigator } from './navigator/BeginNavigator'
import HomeTab from './navigator/HomeTab';
import MapTest from './screens/MapTest';
import NewsScreen from './navigator/NewsStack';
import configStored from './stores';
import { NavigationContainer } from '@react-navigation/native';
import { HomeStack } from './navigator/NewsStack';
import { ChangePassword } from './screens/ChangePassword';
import OrdersStack from './navigator/OrdersStack';
import 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';



const { store, persistor } = configStored();
export { store };


const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        {/* <NavigationContainer>

      <OrdersStack/>

      </NavigationContainer> */}

        <BeginNavigator />

      </PersistGate>

    </Provider>
  );
};

export default App;
