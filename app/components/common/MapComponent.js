import React, {
  Component,
  StyleSheet,
  View,
  Text,
  ListView,
  Dimensions
} from 'react-native';

import MapView from 'react-native-maps';

var { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

const DEFAULT_LOCATION = {
  latitude:41.975290,
  longitude:-87.668768
}

export default class MapComponent extends Component {
  constructor(props) {
    super(props);


    //console.log('I am in MapComponent constructor');

  }

  render(){
   //console.log('I am in MapComponent render')
   //console.log(coordinate);
   //const { region, markers } = this.state;
   return (

      <MapView  style={{flex:1, justifyContent:'center', alignItems:'center'}}
        initialRegion={{
          latitude: this.props.location.latitude,
          longitude: this.props.location.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}

      >
      <MapView.Marker
        ref="m1"
        coordinate={{
          latitude: this.props.location.latitude,
          longitude: this.props.location.longitude
        }}
        title="This is a title"
        description="This is a description"
      >
      <MapView.Callout>
        <View>
          <Text>This is a plain view</Text>
        </View>
      </MapView.Callout>
      </MapView.Marker>
      </MapView>

    )
  }

}
