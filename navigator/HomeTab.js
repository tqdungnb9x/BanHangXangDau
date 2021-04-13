import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Ionicon from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { HomeScreen } from '../screens/HomeScreen'
import { MapScreen } from '../screens/MapScreen'
import { BillListScreen } from '../screens/BillListScreen'
import {HistoryScreen} from '../screens/HistoryScreen'
import NewsScreen from '../screens/NewsScreen'
import {NotificationScreen} from '../screens/NotificationScreen'

import { useAuth } from '../hooks/useAuth'
import MapTest from "../screens/MapTest";
import { NavigationContainer } from '@react-navigation/native';
import { BeginNavigator } from "./BeginNavigator";
import { QRScreen } from "../screens/QRScreen";
import { UserInfoScreen } from "../screens/UserInfoScreen";


const Tab = createMaterialBottomTabNavigator();

export default function HomeTab() {

  const { auth } = useAuth();

  return (
    <NavigationContainer>
      {
        auth.loggedIn ? (
          <Tab.Navigator initialRouteName="NewsScreen" activeColor="#0d60ae" inactiveColor="#eae9e9" shifting={true} >
            <Tab.Screen
              name="NewsScreen"
              component={NewsScreen}
              options={{
                tabBarLabel: "Tin tức",
                tabBarColor: "#fff",
                tabBarIcon: ({ color }) => (
                  <Ionicon name="home" color={color} size={25}/>
                ),
              }}
            />

            <Tab.Screen
              name="MapScreen"
              component={MapTest}
              options={{
                tabBarLabel: "Bản đồ",
                tabBarColor: "#fff",
                tabBarIcon: ({ color }) => (
                  <Ionicon name="location" color={color} size={25} />
                ),
              }}
            />
            <Tab.Screen
              name="BillListScreen"
              component={QRScreen}
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
              component={HistoryScreen}
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
          <BeginNavigator />
        )
      }
    </NavigationContainer>
  );
}

