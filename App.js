/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert
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
import { foregroundMessageService, backgroundOpenedAppService } from './FCMservices'
import SplashScreen from  "react-native-splash-screen";


const { store, persistor } = configStored();
export { store };


const App = () => {

  const [isNoti, setIsNoti] = useState(false)
  useEffect(() => {
    messaging().hasPermission().then((enabled) => {
      if (enabled) {
        // user has permissions
      } else {
        // user doesn't have permission
        messaging().requestPermission().then(() => {
          warn('User has authorised');
        }).catch((error) => {
          warn('User has rejected permissions');
        });
      }
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          
          setInitialRouteName("NotificationScreen");
        }
      });
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );          

    }); 
    const unsubscribe = foregroundMessageService();
    return unsubscribe;
  }, []);
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        {/* <NavigationContainer>

      <OrdersStack/>

      </NavigationContainer> */}

        <BeginNavigator  />

      </PersistGate>

    </Provider>
  );
};

export default App;