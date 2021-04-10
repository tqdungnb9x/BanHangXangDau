import React, { useState } from 'react'

import { SplashScreen } from '../screens/SplashScreen'
import { SignInScreen } from '../screens/SignInScreen'
import { SignOutScreen } from '../screens/SignOutScreen'
import { HomeStack } from './HomeStack'
import {MapScreen} from '../screens/MapScreen'
import { QRScreen } from '../screens/QRScreen'
import BillInfoScreen from '../screens/BillInfoScreen'
import MapTest from '../screens/MapTest'

export const BeginNavigator = () => {

    const [component, setComponent] = useState(<SplashScreen />);
    setTimeout(() => {
        
        setComponent(<SignInScreen />)
    }, 2500);
    return (component);
    // return(<MapTest/>)
}
