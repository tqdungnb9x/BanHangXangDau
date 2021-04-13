import React, { useState, useEffect, useCallback } from 'react'
import QR from 'react-native-qrcode-svg'
import axios from 'axios'

import { Text, View, StyleSheet, Dimensions, Image, } from "react-native";


import ScreenBrightness from 'react-native-screen-brightness';
import { useFocusEffect } from '@react-navigation/native';


const TIME_LEFT = 6000;

export const QRScreen = ({ navigation }) => {

  const [QRCode, setQRCode] = useState('abc');
  const [timeLeft, setTimeLeft] = useState(TIME_LEFT)
  const [brightness, setBrightness] = useState(2)

  useFocusEffect(
    useCallback(
      () => {
        ScreenBrightness.setAppBrightness(1);
        return () => {
          ScreenBrightness.setAppBrightness(brightness);
        }
      }, []
    ));

  const getQRCode = () => {
    axios.get("https://0vd92.sse.codesandbox.io/qrcode/getQRCode").then(function (response) {
      setQRCode(response.data.QRCode);
      console.log(QRCode)
    }).catch(function (error) {
      console.log(error)
    })
  }

  useEffect(() => {
    if (timeLeft == TIME_LEFT) {
      getQRCode()
    }
  })

  // useEffect(() => {
  //   const startTimer = setInterval(() => {
  //     setTimeLeft((timeLeft) => (timeLeft > 0 ? timeLeft - 100 : TIME_LEFT))
  //   }, 100);
  //   return () => {
  //     clearInterval(startTimer)
  //   }
  // }, [])

  useFocusEffect(
    useCallback(() => {
      const startTimer = setInterval(() => {
        setTimeLeft((timeLeft) => (timeLeft > 0 ? timeLeft - 100 : TIME_LEFT))
      }, 100);
      // if (timeLeft == TIME_LEFT-100) {
      //   getQRCode()
      // }
      return () => {
        setTimeLeft(TIME_LEFT+100);
        console.log(timeLeft);
        clearInterval(startTimer)
      }
    }, [])
  );

  return (
    <View style={styles.container} >

      {QRCode != 'abc' ? (
        <View style={styles.header}>

          <QR
            value={QRCode}
            size={height_qr}
          />
          <View style={styles.text}>
            <Text>Mã QR sẽ tự động cập nhật sau {parseInt(timeLeft / 1000)} giây</Text>
          </View>
        </View>
      ) : (
        <View style={styles.header}>

          <Image
            style={styles.logo}
            source={require('../assets/images/Spinner-1s-301px.gif')}
          />
        </View>
      )
      }
    </View>

  );
};

const { height } = Dimensions.get('window');
const height_qr = height * 0.4;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  logo: {
    width: height_qr,
    height: height_qr
  }

})