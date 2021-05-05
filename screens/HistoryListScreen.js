import React, { useState, useEffect } from "react";
import { Avatar, ListItem } from 'react-native-elements';
import { Text, Dimensions, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, StatusBar, Image, RefreshControl, View, Alert } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaskedView from '@react-native-community/masked-view'
import LinearGradient from 'react-native-linear-gradient';
import { useUserInfo } from '../hooks/useUserInfo'
import { useAuth } from '../hooks/useAuth';

function Item({ item, onPress, backgroundColor, textColor }) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor,]}>
            <View style={{
                width: width_icon,
                height: width_icon,
                flexDirection: 'column',
                backgroundColor: "white",
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <MaskedView
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        width: width_icon,
                        height: width_icon,
                        backgroundColor: 'red'

                    }}
                    maskElement={
                        <View
                            style={{
                                backgroundColor: 'transparent',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>

                            <FontAwesome5 name="gas-pump" size={width_icon - 10} color="#fff" />
                        </View>
                    }>
                    <LinearGradient
                        colors={['#F47B2A', '#fcf36d']}
                        style={{ flex: 1 }}
                    />
                </MaskedView>
            </View>
            <View>
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                    {item.receiver}
                </Text>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 12, color: 'green' }}>☑ {item.status}</Text>

            </View>
            <View style={{ marginLeft: "auto", }}>
                <Text style={{ fontSize: 10, color: 'black' }}>Loại đơn:</Text>
                <Text style={{ fontWeight: "bold", fontSize: 15, color: 'black' }}>{item.type}</Text>
                <Text style={{ fontSize: 10, color: 'black' }}>Phương tiện:</Text>
                <Text style={{ fontWeight: "bold", fontSize: 15, color: 'black' }}>{item.vehicle}</Text>
            </View>

        </TouchableOpacity>
    );
}

export default HistoryListScreen = ({ navigation }) => {

    const { getHistory, clearUserData } = useUserInfo();
    const { clearAllData } = useAuth();
    const [refreshing, setRefreshing] = React.useState(false);
    const [newsData, setNewsData] = useState([])
    // const [selectedId, setSelectedId] = useState("order0001");

    useEffect(() => {
        getHistory(
            (response) => {
                setNewsData(response.orders)
                setRefreshing(false)

            }, (error) => {
                console.log(error);

                if (error.statusCode === 401) {
                    Alert.alert(
                        error.message,
                        "Vui lòng đăng nhập lại",
                        [
                            {
                                text: "OK", onPress: () => {
                                    clearAllData();
                                    clearUserData();
                                }
                            }
                        ]
                    );
                }
                setRefreshing(false)
            }
        );
    }, [refreshing])

    const renderItem = ({ item, index }) => {
        const backgroundColor = index % 2 == 0 ? "#fff" : "#ffe";
        return (
            <Item
                item={item}
                onPress={() => {
                    console.log(item);
                    navigation.navigate("HistoryInfoScreen", {
                        vehicle: item.vehicle, 
                        code: item.code, 
                        type: item.type, 
                        status: item.status, 
                        date: item.date, 
                        receiver: item.receiver, 
                        totalQuantity: item.totalQuantity
                    })
                }}
                backgroundColor={{ backgroundColor }}
                // textColor={{ color }}
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
        elevation: 10,
        flexDirection: "row",
        marginHorizontal: 10,
        marginVertical: 5,
        paddingRight: 5,
        borderRadius: 10,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        }

    },
    date: {
        fontSize: 10,
        color: "grey",
        marginBottom: 4,
    }
}
);