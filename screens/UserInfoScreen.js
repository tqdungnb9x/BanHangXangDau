import React from 'react'
import { Avatar, ListItem } from 'react-native-elements';

import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useAuth } from '../hooks/useAuth';
import { useUserInfo } from '../hooks/useUserInfo'

export const UserInfoScreen = ({ navigation }) => {

  const {userInfo} = useUserInfo();
  const { logout, clearAllData } = useAuth();

  const checkLogoutField = () => {
    console.log("user");
    clearAllData((response) => {
      console.log(' user info:', response);
    });
    logout(
      (response) => {
        console.log(response.message)
        // console.log('response', response);

      },
      (error) => {
        Alert.alert('Lỗi đăng xuất', error.message, [{ text: 'Okay' }], {
          cancelable: true,
        });
      },
    )

  }


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>

      <Avatar
        rounded
        // size="xlarge"
        size={height_avatar}
        icon={{ name: 'user', type: 'font-awesome' }}
        source={{
          uri:
            'https://iupac.org/wp-content/uploads/2018/05/default-avatar-300x300.png',
        }}
      >
        <Avatar.Accessory
          name="pencil-alt"
          type="font-awesome-5"
          size={height_avatar * 0.25}
        />
      </Avatar>

      <TouchableOpacity
        onPress={checkLogoutField}
        style={[
          styles.signOut,
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
          Đăng xuất
        </Text>
      </TouchableOpacity>
      <Text>
        Họ tên: {userInfo.phone}
      </Text>
      <Text>
        SDT: {userInfo.phone}
      </Text>
    </View>
  );
};

const { height, width } = Dimensions.get('window');
const height_avatar = width * 0.3;

const styles = StyleSheet.create({
  signOut: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
})
