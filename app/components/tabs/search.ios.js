'use strict';


import React, {
  Component,
  StyleSheet,
  Text,
  View,
  StatusBar,
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
  }
});

const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

export default class Search extends Component{

  constructor(props) {
    super(props);
    this.state = {
      placeDetails: null,
      location: null
    }
  }
  render(){

    var navButtons = (
      <View style={{flexDirection:'row'}}>
      <Button type="inline" text="Map" onPress={()=> null}/>
      <Button type="inline" text="List" onPress={()=> null}/>
      </View>
    );

    console.log('im rendering')

    const rightButtonConfig = {
      title: 'Search',
      tintColor: AppConfig.themeTextColor(),
      handler: () => this.props.navigator.pop(),
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
    if (this.state.placeDetails && this.state.location) {
      console.log(this.state);
      map = (

        <MapComponent place={this.state.placeDetails} markers={[this.state.location]} location={this.state.location} isChild={true}/>


      )
    }

    var googlePlacesAutocomplete = (<GooglePlacesAutocomplete
      enablePoweredByContainer={false}
      placeholder='Search'
      minLength={2} // minimum length of text to search
      autoFocus={false}
      fetchDetails={true}
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        //console.log(data);
        //console.log(details);
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
          fontWeight: 'bold',
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
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
        types: 'food',
      }}
      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      predefinedPlaces={[homePlace, workPlace]}
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
