import React, { useState, useEffect } from "react";
import { Text, Dimensions, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, StatusBar, Image, RefreshControl, View, Alert } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash'
import axios from 'axios'
import { log } from "react-native-reanimated";


function Item({ item, onPress, backgroundColor, textColor }) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
            {/* <Text style={{ ...styles.columnRowTxt, fontWeight: "bold" }}>{item.title}</Text>
            <Text style={{ ...styles.columnRowTxt }}>{item.time}</Text> */}
            <View style={{ height: height_loading, width: height_loading }}>
                <Image source={{

                    uri: item.image,
                }}
                    style={styles.logo}
                    resizeMethod='scale' />
            </View>
            <View style={styles.text}>
                <Text style={[styles.title, textColor]}>{item.title}</Text>
                <Text style={[styles.time, textColor]}>{item.time}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default NewsList = ({ navigation }) => {

    const [refreshing, setRefreshing] = React.useState(false);
    const [newsData, setNewsData] = useState([])
    const [selectedId, setSelectedId] = useState("https://www.petrolimex.com.vn/nd/bao-chi-viet-ve-petrolimex-va-xang-dau/xam-pham-nhan-hieu-petrolimex-dang-bao-dong.html");

    const getNews = () => {
        axios.get("https://0vd92.sse.codesandbox.io/news/getNews").then(function (response) {
            setNewsData(response.data.news);
            console.log(newsData)
            setRefreshing(false)
        }).catch(function (error) {
            setRefreshing(false)
            console.log(error)
            console.log(typeof(error));
            console.log(error.toString());
            if (error == "Error: Network Error") {
                Alert.alert(
                    "Lỗi kết nối mạng",
                    "Vui lòng kiểm tra kết nối mạng",
                    [
                        { text: "Thử lại", onPress: () => console.log("thử lại") },
                        {
                            text: "Hủy",
                            onPress: () => console.log("Hủy"),
                            style: "cancel"
                        },
                    ]
                );
            }
        })
    }

    useEffect(() => {
        getNews()
        console.log(1);
    }, [refreshing])

    const renderItem = ({ item }) => {
        // const backgroundColor = item.uri === selectedId ? "#6e3b6e" : "#f9c2ff";
        // const color = item.uri === selectedId ? 'white' : 'black';
        return (
            <Item
                item={item}
                onPress={() => {
                    setSelectedId(item.uri)
                    console.log(item.time)
                    console.log(item.uri)
                    navigation.navigate("NewsDetail", {
                        uri: item.uri,
                    })
                }}
                // backgroundColor={{ backgroundColor }}
                // textColor={{ color }}
                backgroundColor='white'
                textColor='black'
            />
        );
    }


    return (
        <SafeAreaView style={styles.container}>
            {typeof newsData[0] != 'undefined' ? (
                <FlatList
                    data={newsData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.uri}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => {
                                setRefreshing(true)
                            }
                            }
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
        marginVertical: 5,
        marginHorizontal: 10,
    },
});

