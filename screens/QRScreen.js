import React, { useState, useEffect, useCallback } from 'react'
import QR from 'react-native-qrcode-svg'
import axios from 'axios'

import { Text, View, StyleSheet, Dimensions, Image, TouchableOpacity, } from "react-native";


import ScreenBrightness from 'react-native-screen-brightness';
import { useFocusEffect } from '@react-navigation/native';


const TIME_LEFT = 60000;

export const QRScreen = ({ navigation }) => {

  let logo = require('../assets/images/logo.jpg');


  const [QRCode, setQRCode] = useState('abc');
  const [timeLeft, setTimeLeft] = useState(TIME_LEFT)
  const [brightness, setBrightness] = useState(2)
  // const [update, setUpdate] = useState(true)
  // const changeUpdate = () => {
  //   setUpdate(!update)
  // }

  const changeTimeLeft = () => {
    setTimeLeft(TIME_LEFT + 100);
  }

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
      console.log(timeLeft);
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
        changeTimeLeft();
        console.log(timeLeft);
        clearInterval(startTimer)
      }
    }, [])
  );

  return (
    <View style={styles.container} >

      <View style={{...styles.text, margin:30}}>
        <Text>Đưa mã này cho nhân viên</Text>
      </View>

      {QRCode != 'abc' ? (
        <View style={styles.header}>

          <QR
            value={QRCode}
            size={height_qr}
            logo={logo}
            logoBackgroundColor='yellow'
            logoMargin={0}

          />
          <View style={{...styles.text, marginTop:50}}>
            <Text style={{color:'gray'}}>Tự động cập nhật sau {parseInt(timeLeft / 1000)} giây</Text>
          </View>
          {timeLeft > (TIME_LEFT - 5000) ? (
            <View>
            </View>
          ) : (
            <TouchableOpacity style={styles.text} onPress={changeTimeLeft}>
              <Text style={{ color: "#0d60ae" }}>Cập nhật mới</Text>

            </TouchableOpacity>
          )}

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

const { width } = Dimensions.get('window');
const height_qr = width * 0.5;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    margin:30,
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10,
  },

  logo: {
    width: height_qr,
    height: height_qr
  }

})