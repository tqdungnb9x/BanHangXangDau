import React from 'react';

import {
    StyleSheet,
    Text,
    View,
    Dimensions,

} from 'react-native';
import {
    ViewPlaceholder,
    Direction,
    TextPlaceholder
} from 'react-native-js-shimmer-placeholder';

export const SignOutScreen = () => {

    return (
        <ViewPlaceholder
            show={true}
            width={100}
            height={100}
            style={{    
                borderWidth: 1,
                borderColor: "lightgrey",
                borderRadius: 50,
            }}
            gradientContainerStyle={{ borderRadius: 50 }}
        >
            <View
                style={{
                    height: 100,
                    backgroundColor: "#318fb5",
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text style={{ fontSize: 30 }}>🚀</Text>
            </View>
        </ViewPlaceholder>
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
