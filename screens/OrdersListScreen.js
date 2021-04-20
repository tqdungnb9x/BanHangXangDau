import React, { useState, useEffect } from "react";
import { Text, Dimensions, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, StatusBar, Image, RefreshControl, View, Alert } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash'
import axios from 'axios'
import { log } from "react-native-reanimated";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaskedView from '@react-native-community/masked-view'
import LinearGradient from 'react-native-linear-gradient'; 

import { useUserInfo } from '../hooks/useUserInfo'
import { useAuth } from '../hooks/useAuth';


function Item({ item, onPress, backgroundColor, textColor }) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
            {/* <Text style={{ ...styles.columnRowTxt, fontWeight: "bold" }}>{item.title}</Text>
            <Text style={{ ...styles.columnRowTxt }}>{item.time}</Text> */}
            <View style={{ width: width_icon+30 }}>
                <MaskedView
                    style={{ flex: 1, flexDirection: 'row', height: width_icon, backgroundColor:'red'}}
                    maskElement={
                        <View
                            style={{
                                backgroundColor: 'transparent',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <FontAwesome5 name="gas-pump" size={width_icon} color="#fff" style={{ marginRight: 8 }} />
                        </View>
                    }>
                    <LinearGradient
                        colors={['#F47B2A', '#fcf36d']}
                        style={{ flex: 1 }}
                    />
                </MaskedView>
            </View>
            <View>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={{ fontWeight: "bold", textTransform: "uppercase", fontSize: 16 }}>
                    {item.receiver}
                </Text>
            </View>
            <View style={{ marginLeft: "auto" }}>
                <Text style={styles.date}>Mã đơn: {item.code}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 15, color: "red" }}>
                    {item.totalQuantity}
                </Text>
            </View>

        </TouchableOpacity>
    );
}

export default OrdersListScreen = ({ navigation }) => {

    const { getOrders, clearUserData } = useUserInfo();
    const { logout, clearAllData } = useAuth();

    const [refreshing, setRefreshing] = React.useState(false);
    const [newsData, setNewsData] = useState([])
    const [selectedId, setSelectedId] = useState("order0001");

    // const getNews = () => {
    //     axios.get("https://0vd92.sse.codesandbox.io/news/getNews").then(function (response) {
    //         setNewsData(response.data.news);
    //         console.log(newsData)
    //         setRefreshing(false)
    //     }).catch(function (error) {
    //         setRefreshing(false)
    //         console.log(error)
    //     })
    // }

    useEffect(() => {
        getOrders(
            (response) => {
                console.log("response.data: ", response.data);
                console.log("response: ", response);
                setNewsData(response.orders)
                console.log("newsData", newsData)
                console.log("typeof newsData[0]", typeof newsData[0]);
                console.log("typeof newsData[0] === undefined:", typeof newsData[0] === undefined);
                console.log("newsData[0] === undefined", newsData[0] === undefined);
                console.log("newsData[0] === null", newsData[0] === null);
                console.log("newsData === null", newsData === null);
                console.log("newsData === undefined", newsData === undefined);

                setRefreshing(false)

            }, (error) => {
                console.log(error);

                if (error.message == "Hết hạn đăng nhậpp" || error.message == "Hết hạn đăng nhập" || error.message == "Chưa đăng nhập") {
                    Alert.alert(
                        error.message,
                        "Vui lòng đăng nhập lại",
                        [
                            {
                                text: "OK", onPress: () => {
                                    clearAllData((response) => {
                                        console.log("OrdersListScreen");
                                        console.log('clearAllData:', response);
                                    });
                                    clearUserData((response) => {
                                        console.log('clearUserData:', response);
                                    });
                                    logout(
                                        (response) => {
                                            console.log("logout", response.message)
                                            // console.log('response', response);
                                        },
                                        (error) => {
                                            Alert.alert('Lỗi đăng xuất', error.message, [{ text: 'Okay' }], {
                                                cancelable: true,
                                            });
                                        },
                                    )
                                }
                            }
                        ]
                    );

                    console.log("logout userInfo:", userInfo);
                }
                setRefreshing(false)
            }
        );
    }, [refreshing])

    const renderItem = ({ item }) => {
        // const backgroundColor = item.uri === selectedId ? "#6e3b6e" : "#f9c2ff";
        // const color = item.uri === selectedId ? 'white' : 'black';
        return (
            <Item
                item={item}
                onPress={() => {
                    setSelectedId(item.code)
                    console.log(item.code)
                    navigation.navigate("OrdersInfoScreen", {
                        code: item.code,
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
            { newsData[0] != undefined ? (
                <FlatList
                    data={newsData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.code}
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

const { height, width } = Dimensions.get('window');
const height_loading = height * 0.2;
const width_icon = width *0.1;

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

    // item: {
    //     elevation: 10,
    //     height: height_loading,
    //     flexDirection: 'row',
    //     // marginVertical: 10,
    //     // marginHorizontal: 10,
    //     marginVertical: 8,
    //     marginHorizontal: 16,
    // },
    item: {
        flexDirection: "row",
        padding: 8,
        marginLeft: 8,
        marginRight: 8,
        borderRadius: 4,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        }

    },
    date: {
        fontSize: 14,
        color: "grey",
        marginBottom: 4,
    }
}
);
