import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {searchData} from '../../redux/Slice';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid} from 'react-native';

const Search = () => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);
  const searchResult = useSelector(state => state.searchResult);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const result = searchResult.data;
  // console.log(JSON.stringify(result, null, 2));
  // ======================= api call =============================
  const search = () => {
    dispatch(searchData());
  };
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        let initialPosition = position;
        if (position) {
          console.log(
            'current locations data ',
            initialPosition?.coords?.latitude +
              ' ' +
              initialPosition?.coords?.longitude,
          );
          setUserLatitude(initialPosition?.coords?.latitude);
          setUserLongitude(initialPosition?.coords?.longitude);
          console.log(userLatitude + ' Lat ------------------' + userLongitude);
          // getallShift();
        }
      },
      error => console.log('Error', JSON.stringify(error)),
      {enableHighAccuracy: false, timeout: 20000},
    );
  };
  const checkLocationPermission = () => {
    // check(PermissionsAndroid.ACCESS_FINE_LOCATION).then((result) => {
    // if (result === RESULTS.GRANTED) {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then(res => {
      if (res === 'granted' || res === 'never_ask_again') {
        Geolocation.requestAuthorization(() => {
          getCurrentLocation();
          setLocationEnabled(true);
        });
        console.log('Location permission is enabled');
      }
      console.log('Permission: ', res);
    });
  };
  const requestPermission = () => {};
  useEffect(() => {
    checkLocationPermission();
  }, []);
  return (
    <View>
      <View style={styles.header}>
        <Text style={[styles.pageHeading, {color: colors.text}]}>Search</Text>
      </View>
      <View style={styles.searchBar}>
        <View style={styles.searchInput}>
          <Ionicons name="search" size={18} color={'black'} />
          <TextInput style={styles.inputField} placeholder="Search for ..." />
        </View>
        <Pressable style={styles.searchIcon} onPress={search}>
          <Ionicons name="search" size={25} color={'white'} />
        </Pressable>
      </View>
      <View style={styles.searchHeading}>
        <Text style={{color: colors.text}}>Recent Search</Text>
        <Pressable>
          <Text style={{color: colors.text}}>See all</Text>
        </Pressable>
      </View>
      {/* <View style={styles.searchContent}> */}
      {/* <ScrollView>
          {result &&
            result.map((item, index) => (
              <View style={styles.searchresult} key={index}>
                <Text style={{color:colors.text}}>{item.id}</Text>
                <Text style={{width: 160,textAlign:'justify',color:colors.text}}>{item.title}</Text>
                <Text style={{color:colors.text}}>{`${item.completed}`}</Text>
              </View>
            ))}
        </ScrollView> */}
      <View style={{flex: 1}}>
        <View
          style={{
            height: Platform.OS == 'ios' ? '100%' : 300,
            width: '100%',
          }}>
          <MapView
            // provider={PROVIDER_GOOGLE}
            style={{flex: 1, alignItems: 'center'}}
            showsUserLocation={true}
            showsMyLocationButton={false}
            customMapStyle={mapStyle}
            rotateEnabled={false}
            initialRegion={{
              latitude: 37.809123,
              longitude: -122.4028,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
          </MapView>
        </View>
      </View>
    </View>
  );
};
const mapStyle = [
  {
    featureType: 'administrative',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#d6e2e6',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#cfd4d5',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#7492a8',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.neighborhood',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.neighborhood',
    elementType: 'labels.text.fill',
    stylers: [
      {
        lightness: 25,
      },
    ],
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#dde2e3',
      },
    ],
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#cfd4d5',
      },
    ],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#dde2e3',
      },
    ],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#7492a8',
      },
    ],
  },
  {
    featureType: 'landscape.natural.terrain',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#dde2e3',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.icon',
    stylers: [
      {
        saturation: -100,
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#588ca4',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#a9de83',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#bae6a1',
      },
    ],
  },
  {
    featureType: 'poi.sports_complex',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#c6e8b3',
      },
    ],
  },
  {
    featureType: 'poi.sports_complex',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#bae6a1',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
      {
        saturation: -45,
      },
      {
        lightness: 10,
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#41626b',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#c1d1d6',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#a6b5bb',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#9fb6bd',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.icon',
    stylers: [
      {
        saturation: -70,
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#b4cbd4',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#588ca4',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#008cb5',
      },
    ],
  },
  {
    featureType: 'transit.station.airport',
    elementType: 'geometry.fill',
    stylers: [
      {
        saturation: -100,
      },
      {
        lightness: -5,
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#a6cbe3',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];
const styles = StyleSheet.create({
  header: {
    height: 90,
    justifyContent: 'center',
    padding: 25,
    elevation: 1,
  },
  pageHeading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputField: {
    marginHorizontal: 10,
  },
  searchIcon: {
    height: 40,
    width: 40,
    backgroundColor: 'blue',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchHeading: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  searchContent: {
    height: '75%',
  },
  searchresult: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxHeight: 100,
    marginVertical: 2,
  },
});

export default Search;
