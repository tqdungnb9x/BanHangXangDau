import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";

import NewsList from '../screens/NewsList'
import NewsDetail from '../screens/NewsDetail'
import { UserInfoScreen } from '../screens/UserInfoScreen';
import { ChangePassword } from '../screens/ChangePassword';
import { Image } from 'react-native';
import UserStack from './UserStack';
import { ChangeAddress } from '../screens/ChangeAddress';
import { ChangeEmail } from '../screens/ChangeEmail';

const Stack = createStackNavigator();

export default NewsStack = () => {
    
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="NewsList"
                component={NewsList}
                options={({ navigation }) => ({
                    // title: "Tin tức",
                    headerTitle: "Tin tức",
                    // headerStyle: { backgroundColor: "#2c6fb2" },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: '#0d60ae',
                        textAlign: 'center',
                        alignItems: 'center'
                    },
                    headerLeft: () => (
                        <View/>
                    ),
                    headerRight: () => (
                        <Icon.Button
                            name="person-outline"
                            size={25}
                            color="#0d60ae"                            
                            backgroundColor="#fff"
                            onPress={() => navigation.navigate('UserInfoScreen')}
                        />
                        // <Image.Button
                        //     source={{uri: 'https://iupac.org/wp-content/uploads/2018/05/default-avatar-300x300.png',}}
                        //     size={25}
                        //     color="#0d60ae"                            
                        //     backgroundColor="#fff"
                        //     onPress={() => navigation.navigate('UserInfoScreen')}
                        // />
                    ),
                })}
            />
            <Stack.Screen
                name="NewsDetail"
                component={NewsDetail}
                options={{
                    headerTitle: "",
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: '#0d60ae',
                        textAlign: 'center',
                        alignItems: 'center'
                    },
                }}
            />
            
            <Stack.Screen
                name="UserInfoScreen"
                component={UserInfoScreen}
                options={({ navigation }) => ({
                    headerTitle: "Thông tin cá nhân",
                    // headerStyle: { backgroundColor: "#2c6fb2" },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: '#0d60ae',
                        textAlign: 'center',
                        alignItems: 'center'
                    },
                    
                })}
            />
            <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{
                    headerTitle: "Đổi mật khẩu",
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: '#0d60ae',
                        textAlign: 'center',
                        alignItems: 'center',
                    },
                }}
            />
            <Stack.Screen
                name="ChangeAddress"
                component={ChangeAddress}
                options={{
                    headerTitle: "Đổi địa chỉ",
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: '#0d60ae',
                        textAlign: 'center',
                        alignItems: 'center'
                    },
                }}
            />
            <Stack.Screen
                name="ChangeEmail"
                component={ChangeEmail}
                options={{
                    headerTitle: "Đổi email",
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: '#0d60ae',
                        textAlign: 'center',
                        alignItems: 'center'
                    },
                }}
            />
            
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 10,
        paddingBottom: 20,
    },
    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 8,
        elevation: 8,
    },
    description: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        alignItems: 'center'
    },
    containerItem: {
        flexDirection: "row",
        padding: 8,
        marginLeft: 8,
        marginRight: 8,
        borderRadius: 4,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 4,
        marginBottom: 16,
        borderLeftColor: "green",
        borderLeftWidth: 4,
    },
    date: {
        flex: 1,
        fontSize: 14,
        color: "grey",
        marginBottom: 4,
        textAlign: 'center',

    },
});

