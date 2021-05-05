import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Button
} from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const API_KEY = 'AIzaSyDzO6BPPT_-wFGXkDsY2xkcmwxJNaRjqBU'


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder='Search'
          onPress={(data, details) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details.geometry.location);
          }}
          query={{
            key: API_KEY,
            language: 'vi',
            components: 'country:vn',

          }}
          currentLocation={true}
          currentLocationLabel='Current location'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
  },
  textInput: {
    height: 40,
    width: 300,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  inputWrapper: {
    marginTop: 80,
    flexDirection: 'row'
  },
});