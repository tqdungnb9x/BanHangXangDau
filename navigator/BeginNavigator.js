import React, { useState, useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import HomeTab from './HomeTab'
import { View } from 'react-native'
import { UserInfoScreen } from '../screens/UserInfoScreen'
import { UserInfoTest } from '../screens/UserInfoTest'

const Stack = createStackNavigator();

export const BeginNavigator = (props) => {


    // const [component, setComponent] = useState(<SplashScreen />);
    // setTimeout(() => {

    //     setComponent(<SignInScreen />)
    // }, 2500);
    // return (component);
    // // return(<MapTest/>)


    return (

        <HomeTab />

    )
}
