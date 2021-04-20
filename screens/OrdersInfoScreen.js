import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View, Text,} from "react-native";

export const OrdersInfoScreen = ({ route, navigation }) => {
  const { code } = route.params;
  console.log(code);
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={() => {navigation.navigate("QRScreen")}} style={styles.item}>
        <View style={styles.text}>
          <Text style={styles.title}>{code}</Text>
        </View>
      </TouchableOpacity>

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
      flexDirection: "column",
      justifyContent: "space-between",
      flex: 1,
      paddingStart: 5,
      paddingVertical: 5
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
});
