import React, {
  Component,
  StyleSheet,
  View,
  Text,
  ListView
} from 'react-native';

import MapView from 'react-native-maps';

export default class MapComponent extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <MapView style={{flex:1, justifyContent:'center', alignItems:'center'}}
      initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  />
    )
  }

}
