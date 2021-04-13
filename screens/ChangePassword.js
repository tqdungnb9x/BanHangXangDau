import React from 'react'

import { Text, View } from "react-native";

export const ChangePassword = ({ navigation }) => {

    const [state, setstate] = useState(initialState)

    return (
        <KeyboardAvoidingView enabled
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <StatusBar backgroundColor="#0d60ae" barStyle="light-content" />

            <View style={styles.footer}>
                <Text style={styles.textFooter}>
                    Tên đăng nhập
                </Text>
                <View style={styles.action}>
                    {/* <FontAwesome name="user" color="#0d60ae" size={23} /> */}
                    <TextInput
                        autoCapitalize='none'
                        style={styles.input}
                        onChangeText={onChangeUser}
                        value={user}
                        placeholder="Tên đăng nhập"
                        returnKeyType="next"
                        onSubmitEditing={() =>
                            passwordInputRef.current &&
                            passwordInputRef.current.focus()
                        }
                        blurOnSubmit={false}
                    />
                </View>
                <Text style={styles.textFooter}>
                    Mật khẩu
                </Text>
                <View style={styles.action}>
                    {/* <FontAwesome name="user" color="#0d60ae" size={23} /> */}
                    <TextInput
                        autoCapitalize='none'
                        style={styles.input}
                        onChangeText={onChangeUser}
                        value={user}
                        placeholder="Tên đăng nhập"
                        returnKeyType="next"
                        onSubmitEditing={() =>
                            passwordInputRef.current &&
                            passwordInputRef.current.focus()
                        }
                        blurOnSubmit={false}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};