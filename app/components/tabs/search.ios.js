'use strict';


import React, {
  Component,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native';
import MapComponent from '../common/MapComponent';
import Cash from './cash.ios';
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');
import NavigationBar from 'react-native-navbar';

import Button from '../common/button';
import AppConfig from '../common/AppConfig';
import ActivityProgress from '../common/ActivityProgress';
import GoogleService from '../common/GoogleService';

var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

var styles = StyleSheet.create({
  description: {
    fontSize: 20,
    textAlign: 'center',
    color: '#000000'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#654321'
  },

  textInputContainer: {
    backgroundColor: AppConfig.themeColor(),
    height: 30,
    borderTopColor: '#7e7e7e',
    borderBottomColor: '#b5b5b5',
    //borderWidth:1
    //borderTopWidth: 1 / PixelRatio.get(),
    //borderBottomWidth: 1 / PixelRatio.get(),
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    height: 28,
    borderRadius: 5,
    paddingTop: 4.5,
    paddingBottom: 4.5,
    paddingLeft: 10,
    paddingRight: 10,
    //marginTop: 7.5,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 15,
  },

  input:{
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    //borderRadius: 5,
    margin: 5,
    width: 300,
    alignSelf: 'center'
  }
});

const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

export default class Search extends Component{

  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
    }
  }

  componentDidMount(){
   navigator.geolocation.getCurrentPosition((position) => {
     this.setState({
       region:{
         latitude: position.coords.latitude,
         longitude: position.coords.longitude,
         latitudeDelta: LATITUDE_DELTA,
         longitudeDelta: LONGITUDE_DELTA,
       },
       nearbyPlaces:[]
     });
    },(error) => {alert(error.message)}, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
   );
  }

  displayTypePressed () {

    if(this.state.nearbyPlaces){
      if(this.state.nearbyPlaces.length === 0){
        Alert.alert('No Results');
        return;
      }
      this.props.navigator.push({
        type: 'HorizontalSwipeJump',
        name: 'nearbyPlacesList',
        passProps : {
          origin: {
            latitude:this.state.region.latitude,
            longitude: this.state.region.longitude
          },
          nearbyPlaces: this.state.nearbyPlaces
        }
      });
    }
  }

  searchPress(){

    if(!this.state.region)
    {
      return;
    } else {
      let location = {
        latitude: this.state.region.latitude,
        longitude: this.state.region.longitude
      }
      this.setState({isSearching: true});
      GoogleService.requestNearby(location,{
          rankby: 'distance',
          types: this.state.placeTypeText,
        },(responseData) => {
        if(responseData.results){
          this.setState({
           nearbyPlaces: responseData.results,
           isSearching: false
         });

        }
      })
    }
  }

  showSearchCurrentArea() {
    return (
      <TouchableOpacity onPress={this.searchPress.bind(this)} style={{
        position: 'absolute',
      //  borderWidth:1,
      //  borderColor:'red',
        backgroundColor: 'rgba(255,255,255,0.7)',
        //backgroundColor:'transparent',
        alignItems:'center',
        justifyContent: 'center',
        width:width/2,
        height:50,
        top: height/1.6,
        borderRadius:5,
        left: width/4,
        right: 0,
        bottom: 0,
      }}>
      <Text>{'Search here'}</Text>
      </TouchableOpacity>
    );
  }



  showProgressBubble() {
    return (
      <View style={{
        position: 'absolute',
        //borderWidth:1,
        borderColor:'red',
        backgroundColor: 'rgba(255,255,255,0.5)',
        //backgroundColor:'transparent',
        alignItems:'center',
        justifyContent: 'center',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}>
      <ActivityProgress/>
      </View>
    );
  }



  render(){

    //console.log('i am rendering')



    var map = null;
    if (this.state.region ) {
        map = (
        <MapComponent
          place={this.state.placeDetails}
          markers={this.state.nearbyPlaces}
          isChild={true}
          region={this.state.region}
          currentMapArea={(area)=>{
            this.setState({
              region:area,
              displaySearchAreaButton: true
            });
          }}
        />
      )
    }

    var googlePlacesAutocomplete = (<GooglePlacesAutocomplete
      searchNearBy={true}
      searchProgress={()=>this.setState({isSearching: true})}
      enablePoweredByContainer={false}
      placeholder='location'
      minLength={2} // minimum length of text to search
      autoFocus={false}
      fetchDetails={true}
      nearbyResults={(results, searchLocation) => {
       //console.log(results)
           this.setState({
            nearbyPlaces: results,
            //location: searchLocation,
            isSearching: false,
            region:{
              latitude: searchLocation.latitude,
              longitude: searchLocation.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }
          })


        }}
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        //console.log(data);
        //console.log(details);
        this.setState({
          isSearching: false,
          placeDetails: details,
          // location: {
          //   latitude: details.geometry.location.lat,
          //   longitude: details.geometry.location.lng
          // },
          region:{
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      }}
      getDefaultValue={() => {
        return ''; // text input default value
      }}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyDaKls5tJ2u0RY5QEICM8QDSdPqMe9lAsc',
        language: 'en', // language of the results
      //  types: '(cities)', // default: 'geocode'
      }}
      styles={{
        description: {
          //fontWeight: 'bold',
        },
        predefinedPlacesDescription: {
          color: AppConfig.themeTextColor(),
        },
        textInputContainer: {
          backgroundColor: AppConfig.themeColor(),
          height: 44,
          borderTopColor: AppConfig.themeColor(),
          borderBottomColor: AppConfig.themeColor(),
        },
        textInput: {
          backgroundColor: '#FFFFFF',
          height: 28,
          borderRadius: 5,
          paddingTop: 4.5,
          paddingBottom: 4.5,
          paddingLeft: 10,
          paddingRight: 10,
          marginTop: 7.5,
          marginLeft: 8,
          marginRight: 8,
          fontSize: 15,
        },

      }}
      currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={{
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      }}
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        types: this.state.placeTypeText,
      }}
      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      predefinedPlaces={[homePlace, workPlace]}
      predefinedPlacesAlwaysVisible={false}
    />
  );


    return(

    <View style={{flex:1,}}>

      <NavigationBar
        statusBar={{hidden:false}}
        tintColor= {AppConfig.themeColor()}
        title={<Button type= 'inline'  text= "List" onPress={this.displayTypePressed.bind(this)}/>}
        rightButton={<Button type="search" text="Search" showProgress={this.state.isSearching} onPress={this.searchPress.bind(this)}/>}
        leftButton={<Button type="navBar" icon="filter" onPress={()=> null}/>}/>

      <View style={styles.textInputContainer}>
        <TextInput
          autoFocus={false}
          returnKeyType="search"
          onSubmitEditing={this.searchPress.bind(this)}
          autoCapitalize='none'
          autoCorrect={false}
          style={styles.textInput}
          onChangeText={(text)=>this.setState({placeTypeText: text})}
          value={this.state.placeTypeText}
          placeholder={'bar, bank, etc.'}
          clearButtonMode="while-editing"
          onEndEditing={()=> null}
        />
      </View>
      <View style={{borderWidth:0}}>
        {googlePlacesAutocomplete}
      </View>
       <View style={{borderWidth:0, flex:1, marginBottom:50}}>
        {map}
        {this.state.isSearching === true?this.showProgressBubble():null}
        {this.state.displaySearchAreaButton === true?this.showSearchCurrentArea():null}
       </View>
    </View>
    );
  }
}
