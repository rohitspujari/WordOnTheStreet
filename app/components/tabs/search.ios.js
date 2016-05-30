'use strict';


import React, {
  Component,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput
} from 'react-native';
import MapComponent from '../common/MapComponent';
import Cash from './cash.ios';
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');
import NavigationBar from 'react-native-navbar';
import Button from '../common/button';
import AppConfig from '../common/AppConfig';

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
      placeDetails: null,
      location: null,
      placeType: 'food',
      isSearching: false
    }
  }
  render(){
    console.log('i am rendering');
    var navButtons = (
      <View style={{flexDirection:'row'}}>
      <Button type="inline" text="Map" onPress={()=> null}/>
      <Button type="inline" text="List" onPress={()=> null}/>
      </View>
    );



    const rightButtonConfig = {
      title: 'Search',
      tintColor: AppConfig.themeTextColor(),
      handler: () => {
        if(!this.state.isSearching) {
          this.setState({isSearching: true})
        }
      },
    };

    const leftButtonConfig = {
      title: 'Filter',
      tintColor: AppConfig.themeTextColor(),
      handler: () => this.props.navigator.pop(),
    };

    const titleConfig = {
      title: 'Saerch',
      tintColor: AppConfig.themeTextColor()
    };

    var map = null;
    if (this.state.location ) {
      //console.log(this.state);
      map = (

        <MapComponent place={this.state.placeDetails}
        markers={this.state.nearbyPlaces?this.state.nearbyPlaces:[this.state.location]} location={this.state.location} isChild={true}/>


      )
    }

    var googlePlacesAutocomplete = (<GooglePlacesAutocomplete
      searchState={this.state.isSearching}
      enablePoweredByContainer={false}
      placeholder='Search'
      minLength={2} // minimum length of text to search
      autoFocus={false}
      fetchDetails={true}
      nearbyResults={(results, currentLocation) => this.setState({
        nearbyPlaces: results,
        location: currentLocation,
        isSearching: false
      })}
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        console.log(data);
        console.log(details);
        this.setState({
          placeDetails: details,
          location: {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng
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
        types: this.state.placeType,
      }}
      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      predefinedPlaces={[homePlace, workPlace]}
      predefinedPlacesAlwaysVisible={true}
    />
  );


    return(

    <View style={{flex:1}}>

      <NavigationBar
        statusBar={{hidden:false}}
        tintColor= {AppConfig.themeColor()}
        title={navButtons}
        rightButton={rightButtonConfig}
        leftButton={<Button type="navBar" icon="filter" onPress={()=> null}/>}/>
      <View>


        {googlePlacesAutocomplete}
      </View>
        {map}
    </View>






    );
  }
}
