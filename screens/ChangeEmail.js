import React, { useState, createRef } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, StatusBar, TextInput, Keyboard, TouchableOpacity, Alert } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useUserInfo } from '../hooks/useUserInfo';

export const ChangeEmail = ({ navigation }) => {
    const { userInfo, updateInfo, getInfo } = useUserInfo();
    const [newEmail, setNewEmail] = useState(userInfo.email)
    const changeEmailApi = () => {
        console.log('changeEmailApi');
        updateInfo(
            newEmail,
            '',
            '',
            (response) => {
                console.log("changeEmail.onSuccess");
                Alert.alert('Thành công', 'Thay đổi email thành công',
                    [{
                        text: 'Okay',
                        onPress: () => {
                            getInfo();
                            navigation.navigate('UserInfoScreen')
                        }
                    }],
                );
            },
            (error) => {
                console.log("changeEmail.onError");
                Alert.alert('Lỗi', 'Thay đổi email thất bại',
                    [{ text: 'Okay', onPress: () => { navigation.navigate('UserInfoScreen') } }]
                );
            },
        );
    }
    const checkChangeEmail = () => {
        if (newEmail === '') {
            Alert.alert('Chưa nhập email mới', "Xin mời nhập lại", [{ text: 'Okay' }], {
                cancelable: true,
            });
        } else if (newEmail === userInfo.email) {
            Alert.alert('Chưa thay đổi email', "Xin mời thay đổi lại", [{ text: 'Okay', }], {
                cancelable: true,
            });
        }
        else {
            changeEmailApi()
        }
    }
    return (
        <KeyboardAvoidingView enabled
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <StatusBar backgroundColor="#0d60ae" barStyle="light-content" />

            <View style={styles.footer}>

                <Text style={styles.textFooter}>
                    Thay đổi email
                </Text>
                <View style={styles.action}>
                    {/* <FontAwesome name="user" color="#0d60ae" size={23} /> */}
                    <TextInput
                        keyboardType="email-address"
                        autoCompleteType='email'
                        autoCapitalize='none'
                        style={styles.input}
                        onChangeText={setNewEmail}
                        value={newEmail}
                    />

                </View>

                <View style={
                    { alignItems: 'center', }

                }>
                    <TouchableOpacity
                        onPress={checkChangeEmail}
                        style={[
                            styles.signIn,
                            {
                                borderColor: '#0d60ae',
                                borderWidth: 1,
                                marginTop: 15,
                                alignItems: 'center',

                            },
                        ]}>
                        <Text
                            style={[
                                styles.textSign,
                                {
                                    color: '#0d60ae',
                                },
                            ]}>
                            Đổi email
            </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    header: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        // backgroundColor: '#0d60ae',
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    title: {
        color: "#0d60ae",
        fontWeight: "bold",
        textAlign: 'center',
        fontSize: 20
    },
    text: {
        color: 'grey',
        marginTop: 5,
        fontSize: 16,
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30,
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row',
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold',
    },
    shadow: {
        elevation: 5,
        flex: 2,
        paddingTop: 10

        // backgroundColor:'red'
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#0d60ae',
        paddingBottom: 5,
    },
    textFooter: {
        color: '#0d60ae',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    input: {

        flex: 1,
        paddingLeft: 10,
        paddingVertical: 0,
        color: '#0d60ae',

    },
});
