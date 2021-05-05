import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { Avatar } from "react-native-elements";
import { Title, Caption } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';

import { useUserInfo } from '../hooks/useUserInfo';
import { useAuth } from '../hooks/useAuth';

export const UserInfoTest = () => {
  const { userInfo } = useUserInfo();

  const onLogout = () => {
    logout(
      response => {
        console.log(response.message);
      },
      error => {
        error;
      },
    );
  };


  const { clearAllData, logout } = useAuth();

  const bs = React.createRef(null);
  const fall = new Animated.Value(1);

  // const sheetRef = React.useRef(null);
  const [image, setImage] = useState(
    'https://iupac.org/wp-content/uploads/2018/05/default-avatar-300x300.png',
  );

  const takePhotoFromCamera = () => {
    console.log('camera');
    bs.current.snapTo(1);
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(image => {
        console.log(image);
        setImage(image.path);
      })
      .catch(err => {
        if (err.code === 'E_PICKER_CANCELLED') {
          bs.current.snapTo(0);
        }
      });
  };

  const choosePhotoFromLibrary = () => {
    console.log('camera');
    bs.current.snapTo(1);
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(image => {
        console.log(image);
        setImage(image.path);
      })
      .catch(err => {
        if (err.code === 'E_PICKER_CANCELLED') {
          bs.current.snapTo(0);
        }
      });
  };

  const renderContent = () => (

    <View style={styles.panel}>
      <View style={{ alignItems: 'center' }}>
        {/* <Text style={styles.panelTitle}>Thay ảnh đại diện</Text> */}
        <Text style={styles.panelSubtitle}>Chọn ảnh đại diện mới</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Chụp ảnh</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Chọn từ thư viện</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>

  );
  const renderHeader = () => (
    <View style={styles.panelHeader}>
      <Text style={styles.panelTitle}>Thay ảnh đại diện</Text>
    </View>
  );

  return (
    <>
      <View
        style={{
          flex: 1,
        }}
      >
      <Animated.ScrollView
        style={{
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
          backgroundColor: '#FFFFFF',
        }}>

        <View style={styles.userInfoSection}>
          <View style={{ alignItems: 'center', marginTop: 15 }}>
            <Avatar
              rounded
              // size="xlarge"
              size={height_avatar}
              icon={{ name: 'user', type: 'font-awesome' }}
              source={{
                uri: image,
              }}
              activeOpacity={0.7}
              onPress={() => bs.current.snapTo(0)}
            >
              <Avatar.Accessory
                name="pencil-alt"
                type="font-awesome-5"
                size={height_avatar * 0.25}
              />
            </Avatar>
            <View>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 15,
                    marginBottom: 5,
                  },
                ]}>
                {userInfo.name}
              </Title>
              <Caption
                style={styles.caption}>{`@${userInfo.username}`}</Caption>
            </View>
          </View>
        </View>
        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="information-outline" color="#0d60ae" size={30} />
            <Text style={{ color: '#777777', marginLeft: 20, fontSize: 15, }}>
              {userInfo.PLXID}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="office-building" color="#0d60ae" size={30} />
            <Text style={{ color: '#777777', marginLeft: 20, fontSize: 15 }}>
              {userInfo.company}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="phone" color="#0d60ae" size={30} />
            <Text style={{ color: '#777777', marginLeft: 20, fontSize: 15 }}>
              {userInfo.phone}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="card-account-details" color="#0d60ae" size={30} />
            <Text style={{ color: '#777777', marginLeft: 20, fontSize: 15 }}>
              {userInfo.credentialID}
            </Text>
          </View>
          <TouchableOpacity onPress={() => console.log('AddressEdit')}>
            <View style={styles.row}>
              <Icon name="map-marker-radius" color="#0d60ae" size={30} />
              <Text style={{ color: '#777777', marginLeft: 20, fontSize: 15, flex: 1 }}>
                {userInfo.address}
              </Text>
              <Icon
                name="chevron-right"
                color="#777777"
                size={30}

              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('EmailEdit')}>
            <View style={styles.row}>
              <Icon name="email" color="#0d60ae" size={30} />
              <Text style={{ color: '#777777', marginLeft: 20, fontSize: 15, flex: 1 }}>
                {userInfo.email}
              </Text>
              <Icon
                name="chevron-right"
                color="#777777"
                size={30}

              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => console.log('PasswordChange')}>
            <View style={[styles.row, { marginTop: 10 }]}>
              <Icon name="shield-lock" color="#0d60ae" size={30} />
              <Text style={{ color: '#777777', marginLeft: 20, fontSize: 18 }}>
                Đổi mật khẩu
              </Text>
              <Icon
                name="chevron-right"
                color="#777777"
                size={30}
                style={{ marginLeft: 'auto' }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              clearAllData();
              onLogout();
            }}

            style={styles.buttonLogout}
          >
            <Icon name="exit-to-app" color="#f68026" size={30} />

            <Text style={{ color: '#f68026', marginLeft: 10, fontSize: 20 }}>
              Đăng xuất
              </Text>
          </TouchableOpacity>
        </View>
        </Animated.ScrollView>

      </View>
      <BottomSheet
        ref={bs}
        initialSnap={1}
        snapPoints={[310, 0]}
        borderRadius={20}
        callbackNode={fall}
        renderContent={renderContent}
        renderHeader={renderHeader}
        enabledInnerScrolling={false}
        enabledContentTapInteraction={false}        

      />
    </>
  );
}

const { height, width } = Dimensions.get('window');
const height_avatar = width * 0.3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  caption: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 10,
    alignItems: 'center',
    borderBottomColor: '#b8b8b8',
    borderBottomWidth: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f68026',
    alignItems: 'center',
    marginTop: 10,
  },
  panelButtonTitle: {
    fontSize: 20,
    color: '#f68026',
  },
  panel: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
    paddingBottom: 50
  },
  panelHeader: {
    alignItems: 'center',
    backgroundColor: '#0d5cab'
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 20,
    height: 35,
    fontWeight: 'bold',
    color: '#fff'
  },
  panelSubtitle: {
    fontSize: 15,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    height: 50,
    borderRadius: 50,
    borderColor: '#f68026',
    borderWidth: 1,
        alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 5,
  },

  text_footer: {
    color: '#0d5cab',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    paddingVertical: 0,
    color: '#0d5cab',
  },
  buttonLogout: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
    marginTop: 50,
    borderColor: '#f68026',
    borderWidth: 1,
    height: 50,
  }
});