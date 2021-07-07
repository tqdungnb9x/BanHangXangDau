import React, { useEffect, useState } from 'react';

import { createStackNavigator } from "@react-navigation/stack";
import Ionicon from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../screens/MapScreen'
import NewsStack from './NewsStack'
import NotificationScreen from '../screens/NotificationScreen'
import { useAuth } from '../hooks/useAuth'
import { NavigationContainer, getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';
import OrdersStack from "./OrdersStack";
import { SignInScreen } from "../screens/SignInScreen";
import HistoryStack from "./HistoryStack";
import messaging from '@react-native-firebase/messaging';
import { foregroundMessageService, backgroundOpenedAppService } from '../FCMservices'

const Tab = createBottomTabNavigator();

export default function HomeTab(props) {
  const [initialRouteName, setInitialRouteName] = useState("NewsScreen");
  const [isNoti, setIsNoti] = useState(false)
  const [loading, setLoading] = useState(true);
  
  // const navigation = useNavigation();
  // useEffect(() => {
  //   messaging().getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //         setInitialRouteName(remoteMessage.data.screen);
  //       }
  //       setLoading(false);
  //     });

  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //     navigation.navigate("NotificationScreen");
  //   });

  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('Message handled in the foreground!', remoteMessage);
  //     Alert.alert('Bạn có thông báo mới',
  //     [
  //       { text: "OK", onPress: () => navigation.navigate("Description Screen")
  //     }
  //     ]
  //     );
  //   });
  //   return unsubscribe;
  // }, []);

  // if (loading) {
  //   return null;
  // }

  function NewsStackVisibility(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "";

    if (routeName === 'NewsDetail' ||
      routeName === 'UserInfoScreen' ||
      routeName === 'ChangePassword' ||
      routeName === 'ChangeAddress'
    ) {
      return false;
    }
    return true;
  }

  const { auth } = useAuth();

  return (
    <NavigationContainer>
      {
        auth.loggedIn ? (
          <Tab.Navigator initialRouteName={initialRouteName} activeColor="#0d60ae" inactiveColor="#eae9e9" shifting={true} >
            <Tab.Screen
              name="NewsScreen"
              component={NewsStack}
              options={({ route }) => ({
                tabBarVisible: NewsStackVisibility(route),
                tabBarLabel: "Tin tức",
                tabBarColor: "#fff",
                tabBarIcon: ({ color }) => (
                  <Ionicon name="home" color={color} size={25} />
                ),
              })}
            />

            <Tab.Screen
              name="MapScreen"
              component={MapScreen}
              options={{
                tabBarLabel: "Bản đồ",
                tabBarColor: "#fff",
                tabBarIcon: ({ color }) => (
                  <Ionicon name="location" color={color} size={25} />
                ),
              }}
            />
            <Tab.Screen
              name="OrdersStack"
              component={OrdersStack}
              options={{
                // tabBarVisible: ((route) => {
                //   let routeName = getFocusedRouteNameFromRoute(route) ?? "OrdersInfoScreen"
                //   if (routeName === 'OrdersInfoScreen' ||
                //     routeName === 'QRScreen') {
                //     return false
                //   }

                //   return true
                // })(route),

                tabBarLabel: "Đơn hàng",
                tabBarColor: "#fff",
                tabBarIcon: ({ color }) => (
                  <Ionicon name="qr-code" color={color} size={25} />
                ),
              }}
            />
            <Tab.Screen
              name="HistoryStack"
              component={HistoryStack}
              options={{
                // tabBarVisible: ((route) => {
                //   let routeName = getFocusedRouteNameFromRoute(route) ?? "HistoryInfoScreen"
                //   if (routeName === 'HistoryInfoScreen') {
                //     return false
                //   }

                //   return true
                // })(route),


                tabBarLabel: "Lich sử",
                tabBarColor: "#fff",
                tabBarIcon: ({ color }) => (
                  <FontAwesome5 name="history" color={color} size={25} />
                ),
              }}
            />
            <Tab.Screen
              name="NotificationScreen"
              component={NotificationScreen}
              options={{
                // tabBarVisible : getTabBarVisibility(route),
                tabBarLabel: "Thông báo",
                tabBarColor: "#fff",
                tabBarIcon: ({ color }) => (
                  <Ionicon name="notifications" color={color} size={25} />
                ),
              }}
            />
          </Tab.Navigator>
        ) : (
          <SignInScreen />
        )
      }
    </NavigationContainer>
  );
}
