import React, { useState, createRef } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useAuth } from '../hooks/useAuth'
import { useUserInfo } from '../hooks/useUserInfo'


export const SignInScreen = () => {
  const [user, onChangeUser] = useState("");
  const [password, onChangePassword] = useState("");
  const [securePassword, setSecurePassword] = useState(true);


  const passwordInputRef = createRef();

  const { login } = useAuth();
  const { getInfo } = useUserInfo();
  const loginApi = () => {
    console.log("user");
    login(
      user ,
      password,
      (response) => {
        console.log(response.message)
        // console.log('response', response);
        getInfo((response) => {
          console.log(' user info:', response);
        });
      },
      (error) => {
        Alert.alert('Lỗi đăng nhập', error.message, [{ text: 'Okay' }], {
          cancelable: true,
        });
      },
    );
  };

  const changeSecurePassword = () => {
    setSecurePassword(!securePassword);
  }

  const checkLoginField = () => {
    if (password.length == 0 || user.length == 0) {
      console.log("0");
      Alert.alert('Xin mời nhập lại', 'Tên đăng nhập hoặc mật khẩu không được trống!', [
        { text: 'OK' },
      ]);
    } else {
      console.log('1');
      loginApi();
    }
  }


  return (
    <KeyboardAvoidingView enabled
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar backgroundColor="#0d60ae" barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duration={1500}
          style={styles.logo}
          resizeMode="stretch"
          source={require('../assets/images/logo.jpg')}
        />
        {/* <Text style={styles.title} >
          Ứng dụng bán hàng toàn quốc dành cho tài xế
        </Text> */}
      </View>
      <View style={styles.footer}>
        <Text style={styles.textFooter}>
          Tên đăng nhập
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user" color="#0d60ae" size={23} />
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
          <FontAwesome name="lock" color="#0d60ae" size={23} />

          <TextInput
            autoCapitalize='none'
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            secureTextEntry={securePassword}
            placeholder="Mật khẩu"
            ref={passwordInputRef}
            blurOnSubmit={false}
          />
          <TouchableOpacity onPress={changeSecurePassword}>
            {securePassword ? (
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
            onPress={checkLoginField}
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
              Đăng nhập
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};


const { height } = Dimensions.get('window');
const height_logo = height * 0.3;

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
  logo: {
    width: height_logo,
    height: height_logo,
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
