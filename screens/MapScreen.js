/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  SafeAreaView,
  Image, Dimensions
} from "react-native";
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE
} from "react-native-maps";
import haversine from "haversine";
import Geolocation from 'react-native-geolocation-service'
import GooglePlacesInput from "../components/GooglePlacesInput";
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { log } from "react-native-reanimated";

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const LATITUDE = 21.028920686045588;
const LONGITUDE = 105.78178585470397;
const DURATION = 1000;
const TEST = {
  latitude: 21.028920686045588,
  longitude: 105.78178585470397,
}
const TEST2 = {
  latitude: 21.028660076385226,
  longitude: 105.77721532546406,
}
const GOOGLE_MAPS_APIKEY = 'AIzaSyDzO6BPPT_-wFGXkDsY2xkcmwxJNaRjqBU'

class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [],
      distanceTravelled: 0,
      timeTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }),
      destination: {
        latitude: null,
        longitude: null,
      },
      origin: {
        latitude: null,
        longitude: null,
      }
    };
  }

  componentDidMount() {
    const { coordinate } = this.state;

    this.watchID = Geolocation.watchPosition(
      position => {
        const { routeCoordinates, distanceTravelled } = this.state;
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude,
          longitude
        };

        if (Platform.OS === "android") {
          if (this.marker) {
            this.marker.animateMarkerToCoordinate(
              newCoordinate,
              DURATION
            );
          }
        } else {
          coordinate.timing(newCoordinate, DURATION).start();
        }

        this.setState({
          latitude,
          longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
          // distanceTravelled:
          //   distanceTravelled + this.calcDistance(newCoordinate),
          prevLatLng: newCoordinate
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 5, // dịch chuyển tối thiểu giữa các cập nhật
        interval: 5000, //thời gian  để cập nhật vị trí hoạt động
        showLocationDialog: true,
        forceRequestLocation: true
      }
    );
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>

        <MapView
          style={styles.map}
          showUserLocation={true}
          followUserLocation={true}
          loadingEnabled={false}
          region={this.getMapRegion()}
          showsMyLocationButton={true}
          showsCompass={true}
        // showsTraffic={true}
        >
          {(this.state.destination.latitude != null && this.state.destination.longitude != null) ? (
            <Marker.Animated
              coordinate={this.state.destination}
            >
              <Image
                source={require('../assets/images/petrolimex-marker.png')}
                style={{ width: 45, height: 45 }}
                resizeMode="contain"
              />
            </Marker.Animated>
          ) : (
            <View />

          )}
          <Marker.Animated
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}
            title='Vị trí của bạn'
          />
          {this.state.origin.latitude != null ? (
            <MapViewDirections
              language='vi'
              // origin={this.state.latitude, this.state.longitude}
              // origin={this.state.coordinate}
              origin={this.state.coordinate}
              destination={this.state.destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={5}
              strokeColor="#669df7"
              timePrecision="now"
              onReady={result => {
                console.log(`Distance: ${result.distance} km`)
                console.log(`Duration: ${result.duration} min.`)
                console.log("origin MapView:",  this.state.origin)
                console.log("destination MapView:", this.state.destination )
                this.setState({
                  distanceTravelled: result.distance,
                  timeTravelled: result.duration,
                });
                // this.marker.fitToCoordinates(result.coordinates, {
                //   edgePadding: {
                //     right: (width / 20),
                //     bottom: (height / 20),
                //     left: (width / 20),
                //     top: (height / 20),
                //   }
                // });
              }}
              onError={(errorMessage) => {
                console.log(errorMessage);
              }}
            />
          ) : (
            <View />
          )
          }
        </MapView>

        <View style={styles.search}>

          <GooglePlacesAutocomplete
            fetchDetails={true}
            placeholder='Tìm kiếm'
            onPress={(data, details) => {
              // 'details' is provided when fetchDetails = true
              this.setState({
                destination: {
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng
                },
                origin: {
                latitude: this.state.coordinate.latitude,
                longitude: this.state.coordinate.longitude
              }
              });
              // this.setState(prevState => {
              //   let destination = Object.assign({}, prevState.destination);    
              //   destination = details.geometry.location;                        
              //   return { destination };
              // })
              console.log("destination: ", this.state.destination)
              console.log("origin: ", this.state.origin)
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'vi',
              components: 'country:vn',
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.bubble, styles.button]} onPress={() => {
            console.log("destination 1 : ", this.state.destination)
            this.setState({
              origin: {
                latitude: this.state.coordinate.latitude,
                longitude: this.state.coordinate.longitude
              }
            })
            console.log("origin 1 : ", this.state.origin)

          }}>
            <Text style={styles.bottomBarContent}>
              {parseFloat(this.state.distanceTravelled).toFixed(2)} km trong {parseFloat(this.state.timeTravelled).toFixed(2)} phút
              Tìm đường
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 1
  },
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  },
  search: {
    position: 'absolute',
    height: 100,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 5,
    backgroundColor: 'transparent'
  },
});

export default MapScreen;
