import React, { useState, useEffect } from "react";
import { Text, Dimensions, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, StatusBar, Image, RefreshControl, View, Alert } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaskedView from '@react-native-community/masked-view'
import LinearGradient from 'react-native-linear-gradient';
import { useUserInfo } from '../hooks/useUserInfo'
import { useAuth } from '../hooks/useAuth';

const headerHeight = 56; //64 with ios
// const headerHeight = useHeaderHeight();

function Item({ item, onPress, backgroundColor, textColor }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor,]}>

      <View style={{ height: width_icon, justifyContent: 'space-between' }}>
        <Text >
          <Text style={{ fontSize: 18 }}>Đơn hàng </Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.code} </Text>
          <Text style={{ fontSize: 18 }}>{item.description}</Text>

        </Text>
        <Text style={{ ...styles.date, }}>{item.time}</Text>
        {/* <Text style={{ fontWeight: "bold", fontSize: 12, color: 'gray' }}>{item.time}</Text> */}
      </View>
    </TouchableOpacity>
  );
}

export default NotificationScreen = ({ navigation }) => {

  const [refreshing, setRefreshing] = React.useState(false);
  const [newsData, setNewsData] = useState([{ code: "order 0001", description: "đã hoàn thành", time: "13:00 16/05/2021", isChecked:false }, { code: "order 0002", description: "được khởi tạo", time: "13:00 16/05/2021", isChecked:false }])
  const [selectedId, setSelectedId] = useState("order0001");

  useEffect(() => {
    setRefreshing(false)
  }, [refreshing])

  const renderItem = ({ item, index }) => {
    const backgroundColor = item.isChecked ? "#fff" : "#e7f3ff";
    return (
      <Item
        item={item}
        onPress={() => {
          console.log(item);
          if (item.description == "đã hoàn thành") {
            navigation.navigate("HistoryStack")
          } else {
            navigation.navigate("OrdersStack")
          }
          let data = [...newsData];
          data[index].isChecked = true;
          setNewsData(data);
        }}
        backgroundColor={{ backgroundColor }}
        textColor='black'
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: 'white', height: headerHeight, justifyContent: 'center' }}>
        <Text style={styles.bar}>Thông báo</Text>
      </View>
      { newsData[0] != undefined ? (
        <FlatList
          data={newsData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}`}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true)
              }}
            />
          }
        />
      ) : (
        <Image
          style={styles.loading}
          source={require('../assets/images/Spinner-1s-301px.gif')}
        />
      )

      }
    </SafeAreaView>
  )
}

const { height, width } = Dimensions.get('window');
const height_loading = height * 0.2;
const width_icon = width * 0.2;

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
    flexDirection: "row",
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingRight: 5,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#0d60ae",
  },
  date: {
    fontSize: 12,
    color: "grey",
    marginBottom: 4,
  },
  bar: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#0d60ae',
    textAlign: 'center',
    alignItems: 'center'
  }
}
);