import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';



export const SplashScreen = () => {

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0d60ae" barStyle="light-content" />
        <View style={styles.shadow}>


          <Animatable.Image
            animation="fadeIn"
            duration={2000}
            style={styles.logo}
            resizeMode="stretch"
            source={require('../assets/images/logoSplash.png')}
          />

        </View>

        <Text
          style={{
            color: '#ffff',
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
            paddingHorizontal:10
          }}
        >
          Ứng dụng bán hàng toàn quốc dành cho tài xế
        </Text>
    </View>
  );
};

const { height } = Dimensions.get('window');
const height_logo = height * 0.5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d60ae',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: '#ffff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',

  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 20,
    overflow: 'visible'
  }
});
