import React, { useState, createRef } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, StatusBar, TextInput, Keyboard, TouchableOpacity, Alert } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useUserInfo } from '../hooks/useUserInfo';

export const ChangeAddress = ({ navigation }) => {
    const { userInfo, updateInfo, getInfo } = useUserInfo();
    const [newAddress, setNewAddress] = useState(userInfo.address)
    const changeAddressApi = () => {
        console.log('changeAddressApi');
        updateInfo(
            null,
            newAddress,
            null,
            (response) => {
                console.log("changeAddress.onSuccess");
                Alert.alert('Thành công', 'Thay đổi địa chỉ thành công',
                    [{
                        text: 'Okay', onPress: () => {
                            getInfo();
                            navigation.navigate('UserInfoScreen')
                        }
                    }],
                );
            },
            (error) => {
                console.log("login.onError");
                Alert.alert('Lỗi', 'Thay đổi địa chỉ thất bại',
                    [{ text: 'Okay', onPress: () => { navigation.navigate('UserInfoScreen') } }]
                );
            },
        );
    }
    const checkChangeAddress = () => {
        if (newAddress === '') {
            Alert.alert('Chưa nhập địa chỉ mới', "Xin mời nhập lại", [{ text: 'Okay' }], {
                cancelable: true,
            });
        } else if (newAddress === userInfo.address) {
            Alert.alert('Chưa thay đổi địa chỉ', "Xin mời thay đổi lại", [{ text: 'Okay', }], {
                cancelable: true,
            });
        }
        else {
            changeAddressApi()
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
                    Thay đổi địa chỉ
                </Text>
                <View style={styles.action}>
                    {/* <FontAwesome name="user" color="#0d60ae" size={23} /> */}
                    <TextInput
                        autoCapitalize='none'
                        style={styles.input}
                        onChangeText={setNewAddress}
                        value={newAddress}
                    />

                </View>


                <View style={
                    { alignItems: 'center', }

                }>
                    <TouchableOpacity
                        onPress={checkChangeAddress}
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
                            Đổi địa chỉ
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
