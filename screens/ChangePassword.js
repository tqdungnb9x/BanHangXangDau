import React, { useState, createRef } from 'react';

import { Text, View, StyleSheet, KeyboardAvoidingView, StatusBar, TextInput, Keyboard, TouchableOpacity, Alert } from "react-native";

import FontAwesome from 'react-native-vector-icons/FontAwesome'

export const ChangePassword = ({ navigation }) => {

    const [oldPassword, onOldPassword] = useState('')
    const [newPassword, onNewPassword] = useState('')
    const [confirmNewPassword, onConfirmNewPassword] = useState('')
    const [secureOldPassword, setSecureOldPassword] = useState(true)
    const [secureNewPassword, setSecureNewPassword] = useState(true)
    const [secureConfirmNewPassword, setSecureConfirmNewPassword] = useState(true)

    const changeSecureOldPassword = () =>{
        setSecureOldPassword(!secureOldPassword)
    }
    const changeSecureNewPassword = () =>{
        setSecureNewPassword(!secureNewPassword)
    }
    const changeSecureConfirmNewPassword = () =>{
        setSecureConfirmNewPassword(!secureConfirmNewPassword)
    }

    const passwordInputRef = createRef();
    const confirmInputRef = createRef();


    const checkChangePassword = () => {
        if (oldPassword === '') {
            Alert.alert('Sai mật khẩu', 'Bạn nhập sai mật khẩu cũ', [{ text: 'Okay' }], {
                cancelable: true,
            });
        }
        if (newPassword === '') {
            Alert.alert('Sai mật khẩu', 'Bạn cần nhập mật khẩu mới', [{ text: 'Okay' }], {
                cancelable: true,
            });

        }
        if (newPassword === confirmNewPassword) {
            Alert.alert('Thay đổi thành công', 'Mai mới làm', [{ text: 'Okay' }], {
                cancelable: true,
            });
        } else {
            Alert.alert('Không thành công', 'Bạn cần xác nhận đúng mật khẩu mới', [{ text: 'Okay' }], {
                cancelable: true,
            });
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
                    Mật khẩu cũ
                </Text>
                <View style={styles.action}>
                    {/* <FontAwesome name="user" color="#0d60ae" size={23} /> */}
                    <TextInput
                        autoCapitalize='none'
                        style={styles.input}
                        onChangeText={onOldPassword}
                        value={oldPassword}
                        placeholder="Mật khẩu cũ"
                        returnKeyType="next"
                        onSubmitEditing={() =>
                            passwordInputRef.current &&
                            passwordInputRef.current.focus()
                        }
                        blurOnSubmit={false}
                        secureTextEntry={secureOldPassword}
                    />
                    <TouchableOpacity onPress={changeSecureOldPassword}>
                        {secureOldPassword ? (
                            <FontAwesome name="eye-slash" color="#0d60ae" size={23} />
                        ) : (
                            <FontAwesome name="eye" color="#0d60ae" size={23} />
                        )}
                    </TouchableOpacity>
                </View>
                <Text style={styles.textFooter}>,
                    Mật khẩu mới
                </Text>
                <View style={styles.action}>
                    {/* <FontAwesome name="user" color="#0d60ae" size={23} /> */}
                    <TextInput
                        autoCapitalize='none'
                        style={styles.input}
                        onChangeText={onNewPassword}
                        value={onNewPassword}
                        placeholder="Mật khẩu mới"
                        returnKeyType="next"
                        ref={passwordInputRef}
                        onSubmitEditing={() =>
                            confirmInputRef.current &&
                            confirmInputRef.current.focus()
                        }
                        blurOnSubmit={false}
                        secureTextEntry={secureNewPassword}

                    />
                    <TouchableOpacity onPress={changeSecureNewPassword}>
                        {secureNewPassword ? (
                            <FontAwesome name="eye-slash" color="#0d60ae" size={23} />
                        ) : (
                            <FontAwesome name="eye" color="#0d60ae" size={23} />
                        )}
                    </TouchableOpacity>
                </View>

                <Text style={styles.textFooter}>
                    Xác nhận mật khẩu mới
                </Text>
                <View style={styles.action}>
                    {/* <FontAwesome name="user" color="#0d60ae" size={23} /> */}
                    <TextInput
                        autoCapitalize='none'
                        style={styles.input}
                        onChangeText={onConfirmNewPassword}
                        value={onConfirmNewPassword}
                        placeholder="Mật khẩu mới"
                        returnKeyType="next"
                        ref={confirmInputRef}
                        blurOnSubmit={false}
                        onSubmitEditing={Keyboard.dismiss}
                        secureTextEntry={secureConfirmNewPassword}


                    />
                    <TouchableOpacity onPress={changeSecureConfirmNewPassword}>
                        {secureConfirmNewPassword ? (
                            <FontAwesome name="eye-slash" color="#0d60ae" size={23} />
                        ) : (
                            <FontAwesome name="eye" color="#0d60ae" size={23} />
                        )}
                    </TouchableOpacity>
                </View>
                <View style={
                    { alignItems: 'center', }

                }>
                    <TouchableOpacity
                        onPress={checkChangePassword}
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
                            Đổi mật khẩu
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
