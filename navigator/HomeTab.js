import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Ionicon from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen'
import  MapScreen  from '../screens/MapScreen'
import { BillListScreen } from '../screens/OrdersListScreen'
import {HistoryScreen} from '../screens/HistoryScreen'
import NewsStack from './NewsStack'
import {NotificationScreen} from '../screens/NotificationScreen'

import { useAuth } from '../hooks/useAuth'
import MapTest from "../screens/MapTest";
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { BeginNavigator } from "./BeginNavigator";
import { QRScreen } from "../screens/QRScreen";
import { UserInfoScreen } from "../screens/UserInfoScreen";
import OrdersStack from "./OrdersStack";
import { SignInScreen } from "../screens/SignInScreen";
import HistoryStack from "./HistoryStack";


const Tab = createBottomTabNavigator();

const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (routeName === 'NewsDetail') {
    return false;
  }
  return true;
}

export default function HomeTab() {

  const { auth } = useAuth();

  return (
    <NavigationContainer>
      {
        auth.loggedIn ? (
          <Tab.Navigator initialRouteName="NewsScreen" activeColor="#0d60ae" inactiveColor="#eae9e9" shifting={true} >
            <Tab.Screen
              name="NewsScreen"
              component={NewsStack}
              options={({ route }) => ({
                tabBarLabel: "Tin tức",
                tabBarColor: "#fff",
                tabBarIcon: ({ color }) => (
                  <Ionicon name="home" color={color} size={25}/>
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
                tabBarLabel: "Đơn hàng",
                tabBarColor: "#fff",
                tabBarIcon: ({ color }) => (
                  <Ionicon name="qr-code" color={color} size={25} />
                ),
              }}
            />
            <Tab.Screen
              name="HistoryScreen"
              component={HistoryStack}
              options={{
                tabBarLabel: "Lich sử",
                tabBarColor: "#fff",
                tabBarIcon: ({ color }) => (
                  <FontAwesome5 name="history" color={color} size={25} />
                ),
              }}
            />
            <Tab.Screen
              name="NotificationScreen"
              component={UserInfoScreen}
              options={{
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