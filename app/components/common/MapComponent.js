import React, {
  Component,
  StyleSheet,
  View,
  Text,
  ListView,
  Dimensions,
  StatusBar,

} from 'react-native';

import MapView from 'react-native-maps';
import StarRating from 'react-native-star-rating';
import NavigationBar from 'react-native-navbar';
import AppConfig from './AppConfig';
import Button from '../common/button';

var { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.1;
const LONGITUDE_DELTA =0.1;
//const LATITUDE_DELTA = 0.00922;
//const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;


export default class MapComponent extends Component {
  constructor(props) {
    super(props);

    console.log('I am in MapComponent constructor');
  }

  // onRegionChange(region) {
  //   this.setState({ region });
  // }
  //
  // onRegionChangeComplete(region) {
  //   this.setState({ region });
  // }



  render(){

  console.log('im rendering')

  const rightButtonConfig = {
    title: 'Close',
    tintColor:AppConfig.themeTextColor(),
    handler: () => this.props.navigator.pop(),
    };

  const titleConfig = {
    tintColor: AppConfig.themeTextColor(),
    title: 'Map',
  };

  //console.log(this.props.isChild);

  var navigationBar = null;
  if(!this.props.isChild){
    var navigationBar =  (<NavigationBar
       title={titleConfig}
       statusBar={{hidden:false}}
       tintColor={AppConfig.themeColor()}
       leftButton={<Button type="navBar" icon="mail-forward" onPress={() => this.props.navigator.pop()}/>}
       rightButton={<Button type="navBar" icon="close" onPress={() => this.props.navigator.pop()}/>} />);
  }

  //console.log(navigationBar);

   //console.log('I am in MapComponent render')
   //console.log(coordinate);
   //const { region, markers } = this.state;

   //markers.push(this.props.location)
   //console.log(markers);
   return (

     <View style={{flex:1}}>
     {navigationBar}
      <MapView  style={{flex:1, justifyContent:'center', alignItems:'center'}}
        region={{
          latitude: this.props.location.latitude,
          longitude: this.props.location.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >


      {this.props.markers.map(marker => (
        <MapView.Marker
          key={marker.longitude?marker.longitude: marker.place_id}
          title="This is a title"
          description="This is a description"
          coordinate={{
            latitude: marker.latitude?marker.latitude:marker.geometry.location.lat,
            longitude: marker.longitude?marker.longitude:marker.geometry.location.lng
          }}>
          <MapView.Callout>
            <View>
             <StarRating
             disabled={true}
             emptyStar={'ios-star-outline'}
             fullStar={'ios-star'}
             halfStar={'ios-star-half'}
             iconSet={'Ionicons'}
             maxStars={5}
             rating={marker.rating?marker.rating:0}
             starColor={'red'}
             starSize={10}
             selectedStar={() => {
               return null;
             }}
           />
           <Text>{marker.name?marker.name:this.props.place.name}</Text>
           </View>
          </MapView.Callout>
        </MapView.Marker>


      ))}

      </MapView>
      </View>




    )
  }

}
