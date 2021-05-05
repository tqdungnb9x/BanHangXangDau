import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View, Text, } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";

export const HistoryInfoScreen = ({ route, navigation }) => {
  const { vehicle, code, type, status, date, receiver, totalQuantity } = route.params;
  return (
    <View style={styles.text}>
      <View style={styles.content}>
        <Text style={{  fontSize: 18 }}>Người nhận hàng:</Text>
        <Text style={{ fontSize: 18, textAlign: "right", fontWeight: "bold", }}>{receiver}</Text>
      </View>
      <View style={styles.content}>
        <Text style={{  fontSize: 18 }}>Ngày tạo đơn</Text>
        <Text style={{ fontSize: 18, textAlign: "right", fontWeight: "bold", }}>{date}</Text>
      </View>
      <View style={styles.content}>
        <Text style={{  fontSize: 18 }}>Trạng thái:</Text>
        <Text style={{ fontSize: 18, textAlign: "right", fontWeight: "bold", }}>{status}</Text>
      </View>
      <View style={styles.content}>
        <Text style={{  fontSize: 18 }}>Loại đơn:</Text>
        <Text style={{ fontSize: 18, textAlign: "right", fontWeight: "bold", }}>{type}</Text>
      </View>
      <View style={styles.content}>
        <Text style={{  fontSize: 18 }}>Phương tiện:</Text>
        <Text style={{ fontSize: 18, textAlign: "right", fontWeight: "bold", }}>{vehicle}</Text>
      </View>
    </View>
  );
};

const { height } = Dimensions.get('window');
const height_loading = height * 0.2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    height: height_loading,
    width: height_loading,
    alignSelf: 'center'
  },
  logo: {
    flex: 1,
    padding: 5,
    margin: 5
    // resizeMode: 'contain',

  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
  },
  text: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  time: {
    fontSize: 10,
  },

  item: {
    elevation: 10,
    height: height_loading,
    flexDirection: 'row',
    // marginVertical: 10,
    // marginHorizontal: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  signIn: {
    marginBottom: 'auto',
    width: 180,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
});