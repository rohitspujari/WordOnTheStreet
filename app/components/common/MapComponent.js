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

var { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;


export default class MapComponent extends Component {
  constructor(props) {
    super(props);
    console.log('I am in MapComponent constructor');
  }

  render(){

  console.log('im rendering')

  const rightButtonConfig = {
    title: 'Close',
    handler: () => this.props.navigator.pop(),
    };

  const titleConfig = {
    title: 'Map',
  };

  //console.log(this.props.isChild);

  var navigationBar = null;
  if(!this.props.isChild){
    var navigationBar =  (<NavigationBar
       title={titleConfig}
       statusBar={{hidden:false}}
       tintColor='#b2cb53'
       rightButton={rightButtonConfig} />);
  }

  //console.log(navigationBar);

   //console.log('I am in MapComponent render')
   //console.log(coordinate);
   //const { region, markers } = this.state;
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
      <MapView.Marker
        ref="m1"
        coordinate={this.props.location}
        title="This is a title"
        description="This is a description"
      >
      <MapView.Callout>


        <View>
          <Text>{this.props.place.name}</Text>
          <Text>{this.props.place.formatted_address}</Text>
          <Text>{this.props.place.opening_hours.open_now?'Open':'Closed'}</Text>
          <Text>{this.props.place.price_level}</Text>
          <StarRating
            disabled={true}
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            halfStar={'ios-star-half'}
            iconSet={'Ionicons'}
            maxStars={5}
            rating={this.props.place.rating}
            starColor={'red'}
            starSize={10}
            selectedStar={() => {
              return null;
            }}
          />
        </View>
      </MapView.Callout>
      </MapView.Marker>
      </MapView>
      </View>




    )
  }

}
