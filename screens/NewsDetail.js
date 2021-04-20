import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { log } from "react-native-reanimated";
import { WebView } from 'react-native-webview'

export default NewsDetail = ({ route, navigation }) => {
    const {uri} = route.params;

    console.log(uri);
    return (
        <SafeAreaView style={{flex:1}}>
            <WebView 
                source={{uri: uri}}
            />
        </SafeAreaView>
    );
};
