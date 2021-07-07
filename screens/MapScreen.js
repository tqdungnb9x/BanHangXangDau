/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  SafeAreaView,
  Image,
  Dimensions,
  Linking,
  Alert,
} from 'react-native';
import MapView, {
  Marker,
  AnimatedRegion,
  PROVIDER_GOOGLE,
  Callout
} from 'react-native-maps';
import haversine from 'haversine';
import Geolocation from 'react-native-geolocation-service'
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { log } from 'react-native-reanimated';
import axios from 'axios'


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
const GOOGLE_MAPS_APIKEY = 'AIzaSyBmk7HRAHAu8lytydkGGWw7dWy-sSNcaEI'


async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Yêu cầu truy cập vị trí',
        message:
          'Cho phép ứng dụng truy cập vị trí?',
        buttonNeutral: 'Để sau',
        buttonNegative: 'Hủy bỏ',
        buttonPositive: 'Đồng ý'
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

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
      },
      details: {
        name: '',
        address: '',
        phone: '',
        time: '',
        url: '',
        latitude: 0,
      },
      maps: [{ 'address': 'Đường Láng, Tổ 13, Phường Láng Thượng, Quận Đống Đa, Hà Nội, Việt Nam', 'email': 'chxd51.kv1@petrolimex.com.vn', 'latitude': 21.020601, 'longitude': 105.801443, 'name': 'Cửa hàng xăng dầu số 37 - Công ty Xăng dầu Khu vực I', 'phone': '(024) 38626792', 'province': 'Hà Nội', 'time': 'Giờ bán hàng: 5:00 SA - 23:00 CH', 'url': 'https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=21.020601,105.801443' }, { address: 'Số 484 phố Minh Khai, Phường Vĩnh Tuy, Quận Hai Bà Trưng, Hà Nội, Việt Nam', email: 'chxd51.kv1@petrolimex.com.vn', latitude: 20.997778, longitude: 105.867097, name: 'Cửa hàng xăng dầu số 51 - Công ty Xăng dầu Khu vực I', phone: '(024) 38626792 ', province: 'Hà Nội', time: 'Giờ bán hàng: 5:00 SA - 23:00 CH    ', 'url': 'https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=20.997778,105.867097' }, { address: 'Số 32 phố Tân Mai, Phường Tân Mai, Quận Hoàng Mai, Hà Nội, Việt Nam', email: 'chxd52.kv1@petrolimex.com.vn', latitude: 20.983521, longitude: 105.846869, name: 'Cửa hàng xăng dầu số 52 - Công ty Xăng dầu Khu vực I', phone: '(024) 38641224', province: 'Hà Nội', time: 'Giờ bán hàng: 5:00 SA - 23:00 CH', url: 'https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=20.983521,105.846869' }, { address: 'Số 121 phố Định Công, Phường Định Công, Quận Hoàng Mai, Hà Nội, Việt Nam', email: 'chxd55.kv1@petrolimex.com.vn', latitude: 20.9842, longitude: 105.838238, name: 'Cửa hàng xăng dầu số 55 - Công ty Xăng dầu Khu vực I', phone: '(024) 38641224', province: 'Hà Nội', time: 'Giờ bán hàng: 5:00 SA - 23:00 CH', url: 'https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=20.9842,105.838238' }, { address: 'Km06 đường Giải Phóng, Phường Giáp Bát, Quận Hoàng Mai, Hà Nội, Việt Nam', email: 'chxd53.kv1@petrolimex.com.vn', latitude: 20.985253, longitude: 105.84119, name: 'Cửa hàng xăng dầu số 53 - Công ty Xăng dầu Khu vực I', phone: '(024) 38641224', province: 'Hà Nội', time: 'Giờ bán hàng: 5:00 SA - 24:00 CH', url: 'https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=20.985253,105.84119' }],
    };
  }
  // async getMaps() {
  //   axios.get('https://xgc5h.sse.codesandbox.io/maps/getMaps').then(function (response) {
  //     let array = new Array();
  //     array = response.data.maps;
  //     this.setState({ maps: array })
  //     console.log('1: ', response.data.maps);
  //   }).catch(function (error) {
  //     console.log(2, error);
  //     console.log(2);

  //     if (error == 'Error: Network Error') {
  //       Alert.alert(
  //         'Lỗi kết nối mạng',
  //         'Vui lòng kiểm tra kết nối mạng',
  //         [
  //           { text: 'Thử lại', onPress: () => console.log('thử lại') },
  //           {
  //             text: 'Hủy',
  //             onPress: () => console.log('Hủy'),
  //             style: 'cancel'
  //           },
  //         ]
  //       );
  //     }
  //   })
  // }

  componentDidMount() {
    requestLocationPermission();
    // this.getMaps();
    const { coordinate } = this.state;

    this.watchID = Geolocation.watchPosition(
      position => {
        const { routeCoordinates, distanceTravelled } = this.state;
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude,
          longitude
        };

        if (Platform.OS === 'android') {
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
  componentDidUpdate() {
    requestLocationPermission;
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

  render() {
    return (
      <SafeAreaView style={styles.container}>

        <MapView
          style={styles.map}
          showUserLocation={true}
          followUserLocation={true}
          loadingEnabled={false}
          region={this.getMapRegion()}
          showsMyLocationButton={false}
          showsCompass={true}
        // showsTraffic={true}
        >

          {this.state.maps.map(marker => (
            <Marker.Animated
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              title={marker.name}
              key={marker.name}
              onPress={() => {
                console.log(this.state.details)
                this.setState({
                  origin: { latitude: this.state.latitude, longitude: this.state.longitude },
                  destination: { latitude: marker.latitude, longitude: marker.longitude }
                })
              }}
              onCalloutPress={() => {
                Linking.openURL(marker.url)
              }}
            >
              <Image
                source={require('../assets/images/petrolimex-marker.png')}
                style={{ width: 45, height: 45 }}
                resizeMode="contain"
              />
              <Callout style={styles.callout}>
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{marker.name}</Text>
                <Text style={{ fontSize: 12 }}>Địa chỉ: {marker.address}</Text>
                <Text style={{ fontSize: 12 }}>Điện thoại: {marker.phone}</Text>
                <Text style={{ fontSize: 12 }}>{marker.time}</Text>
                <Text style={{ fontSize: 15, color: 'blue', textDecorationLine: 'underline', textAlign: 'center' }}>Ấn để chỉ đường</Text>
              </Callout>

            </Marker.Animated>
          ))}
          {(this.state.details.name != null && this.state.details.latitude == this.state.destination.latitude) ? (
            <Marker.Animated
              coordinate={this.state.destination}
              title={this.state.details.name}
              key={this.state.details.name}
              onCalloutPress={() => {
                Linking.openURL(this.state.details.url)
              }}
            >
              <Image
                source={require('../assets/images/petrolimex-marker.png')}
                style={{ width: 45, height: 45 }}
                resizeMode="contain"
              />
              <Callout style={styles.callout}>
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{this.state.details.name}</Text>
                <Text style={{ fontSize: 12 }}>Địa chỉ: {this.state.details.address}</Text>
                <Text style={{ fontSize: 12 }}>Điện thoại: {this.state.details.phone}</Text>
                <Text style={{ fontSize: 15, color: 'blue', textDecorationLine: 'underline', textAlign: 'center' }}>Ấn để chỉ đường</Text>
              </Callout>
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
              origin={this.state.origin}
              destination={this.state.destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={5}
              strokeColor="#669df7"
              timePrecision="now"
              onReady={result => {
                this.setState({
                  distanceTravelled: result.distance,
                  timeTravelled: result.duration,
                });

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
            minLength={2}
            fetchDetails={true}
            placeholder='Tìm kiếm'
            onFail={(error) => {
              console.log("error search", error);
            }}
            onNotFound={() => {
              Alert.alert(
                'Không có kết quả',
                'Vui lòng tìm kiếm lại',
                [
                  { text: 'OK', onPress: () => console.log('thử lại') },
                  
                ]
              );
            }}
            onPress={(data, details) => {
              // 'details' is provided when fetchDetails = true
              console.log('search ', details.opening_hours)
              this.setState({
                details: {
                  name: details.name,
                  address: details.formatted_address,
                  phone: details.formatted_phone_number,
                  url: details.url,
                  latitude: details.geometry.location.lat,
                },
                destination: {
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng
                },
                origin: {
                  latitude: this.state.latitude,
                  longitude: this.state.longitude
                }
              });
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'vi',
              components: 'country:vn',
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.bubble, styles.button]} >
            <Text style={styles.bottomBarContent}>
              Quãng đường {parseFloat(this.state.distanceTravelled).toFixed(2)} km trong {parseFloat(this.state.timeTravelled).toFixed(2)} phút
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
    justifyContent: 'flex-end',
    alignItems: 'center'
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
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: 'stretch'
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent'
  },
  search: {
    position: 'absolute',
    height: 200,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 5,
    backgroundColor: 'transparent'
  },
  callout: {
    width: width * 0.7,
    paddingBottom: 10
  },
  directionButton: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  }
});

export default MapScreen;
