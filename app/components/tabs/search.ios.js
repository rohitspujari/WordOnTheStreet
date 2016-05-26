'use strict';


import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapComponent from '../common/MapComponent';
import Cash from './cash.ios';
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');
import NavigationBar from 'react-native-navbar';

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

    console.log('im rendering')

    const rightButtonConfig = {
      title: 'Search',
      handler: () => this.props.navigator.pop(),
    };

    const titleConfig = {
      title: 'Saerch',
    };

    var map = null;
    if (this.state.placeDetails && this.state.location) {
      console.log(this.state);
      map = (
        <View style={{flex:1}}>
<MapComponent place={this.state.placeDetails} markers={[this.state.location]} location={this.state.location} isChild={true}/>
        <Text>{this.state.location.longitude}</Text>
        <Text>{this.state.location.latitude}</Text>
        </View>
      )
    }


    return(

      <View style={{flex:1}}>
      <NavigationBar
        title={titleConfig}
        statusBar={{hidden:false}}
        tintColor='lightgray'
        rightButton={rightButtonConfig}
        leftButton={rightButtonConfig}/>

        {map}

        <GooglePlacesAutocomplete
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


      </View>




    );
  }
}
