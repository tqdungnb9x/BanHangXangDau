import React, { useState, useEffect } from 'react'

import { SplashScreen } from '../screens/SplashScreen'
import { SignInScreen } from '../screens/SignInScreen'
import { SignOutScreen } from '../screens/SignOutScreen'
import { HomeStack } from './NewsStack'
import { MapScreen } from '../screens/MapScreen'
import { QRScreen } from '../screens/QRScreen'
import BillInfoScreen from '../screens/OrdersInfoScreen'
import MapTest from '../screens/MapTest'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import HomeTab from './HomeTab'
import { View } from 'react-native'

const Stack = createStackNavigator();

export const BeginNavigator = () => {

    const [splash, setSplash] = useState(true)

    // const [component, setComponent] = useState(<SplashScreen />);
    // setTimeout(() => {

    //     setComponent(<SignInScreen />)
    // }, 2500);
    // return (component);
    // // return(<MapTest/>)

    useEffect(() => {
        setTimeout(() => {
            setSplash(false)
        }, 2500);
    }, []);
    return (
        <View style={{ flex: 1 }}>
            {
                splash ? (
                    <SplashScreen />
                ) : (
                    <HomeTab />
                )
            }
        </View>
    )
}
