import React from "react";

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import HomeTab from "./HomeTab";
import { UserInfoScreen } from "../screens/UserInfoScreen";


const Stack = createStackNavigator();


export const HomeStack = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: "#0d5cab",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
            >
                <Stack.Screen
                    name="HomeTab"
                    component={HomeTab}
                    options={{
                        title: "Trang chủ",
                        
                        headerLeft: (navigation) => (
                            <Icon.Button
                                name="person-outline"
                                size={25}
                                backgroundColor="#0d60ae"
                                onPress={() => navigation.navigate('UserInfoScreen')}
                            />
                        ),
                    }}
                />
                <Stack.Screen
                    name='UserInfoScreen'
                    component={UserInfoScreen}
                    options={{
                        title: "Thông tin lái xe",
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )


};