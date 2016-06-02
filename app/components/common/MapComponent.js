import React, {
  Component,
  StyleSheet,
  View,
  Text,
  ListView,
  Dimensions,
  StatusBar,
  TouchableOpacity,

} from 'react-native';

import MapView from 'react-native-maps';
import StarRating from 'react-native-star-rating';
import NavigationBar from 'react-native-navbar';
import AppConfig from './AppConfig';
import Button from '../common/button';

export default class MapComponent extends Component {
  constructor(props) {
    super(props);
    //console.log('I am in MapComponent constructor');
  }

  onRegionChange(region) {
    //this.setState({ region });
    //console.log(region);
    if(this.props.currentMapArea) {
      this.props.currentMapArea(region);
    }
  }

  getRating(rating){
    return (
      <View style={{width:20}}>
       <StarRating
       disabled={true}
       emptyStar={'ios-star-outline'}
       fullStar={'ios-star'}
       halfStar={'ios-star-half'}
       iconSet={'Ionicons'}
       maxStars={5}
       rating={rating}
       starColor={AppConfig.themeStarColor()}
       starSize={15}
       selectedStar={() => {
         return null;
       }}
     />
     </View>
    );
  }

  getDistance (lat1, lon1, lat2, lon2, unit) {
  	var radlat1 = Math.PI * lat1/180
  	var radlat2 = Math.PI * lat2/180
  	var theta = lon1-lon2
  	var radtheta = Math.PI * theta/180
  	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  	dist = Math.acos(dist)
  	dist = dist * 180/Math.PI
  	dist = dist * 60 * 1.1515
  	if (unit=="K") { dist = dist * 1.609344 }
  	if (unit=="N") { dist = dist * 0.8684 }
  	return dist
  }


  render() {
  //console.log('im rendering')
  const rightButtonConfig = {
    title: 'Close',
    tintColor:AppConfig.themeTextColor(),
    handler: () => this.props.navigator.pop(),
    };

  const titleConfig = {
    tintColor: AppConfig.themeTextColor(),
    title: 'Map',
  };

  var navigationBar = null;
  if(!this.props.isChild){
    var navigationBar =  (<NavigationBar
       title={titleConfig}
       statusBar={{hidden:false}}
       tintColor={AppConfig.themeColor()}
       leftButton={<Button type="navBar" icon="mail-forward" onPress={() => this.props.navigator.pop()}/>}
       rightButton={<Button type="navBar" icon="close" onPress={() => this.props.navigator.pop()}/>} />);
  }
  return (
    <View style={{flex:1}}>
     {navigationBar}
      <MapView  style={{flex:1, justifyContent:'center', alignItems:'center'}}
        region={this.props.region}
        onRegionChangeComplete={this.onRegionChange.bind(this)}
        showsUserLocation={true}
        followUserLocation={true}
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
           <TouchableOpacity onPress={ () => {
             this.props.navigator.push({
               type: 'HorizontalSwipeJump',
               name: 'reviewList',
               passProps : {
                 placeId: marker.place_id,
                 showMap: 'true'
               }
             });
           }}>
            {this.getCalloutContent(marker)}
           </TouchableOpacity>
          </MapView.Callout>
        </MapView.Marker>
      ))}
      </MapView>
    </View>
    )
  }

  callOutPressed(){

  }

  getCalloutContent(marker){

    var distance = null;
    if (marker.geometry) {
      var {lat, lng} = marker.geometry.location;
      var {latitude,longitude} = this.props.region;
      var distance = Math.round(this.getDistance(latitude,longitude,lat,lng,'M')*10)/10;

    }

    var openNow = null;
    if(marker.opening_hours){
       if(marker.opening_hours.open_now === 'true') {
         openNow = <Text style={{color:'green', fontSize:10}}>Open</Text>
       } else {
         openNow = <Text style={{color:'red', fontSize:10}}>Closed</Text>
       }
    }

    return (
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
        {this.getRating(marker.rating)}
        <Text style={{fontWeight:'normal'}}>{marker.name?marker.name:this.props.place.name}</Text>
        <Text style={{fontSize:12,color:'gray'}}>{marker.vicinity}</Text>
        </View>
        <View style={styles.attributesContainer}>
         <View style={styles.openClosed}>
          {openNow}
         </View>
         <View style={styles.distance}>
          <Text style={{fontSize:10, borderWidth:0, color:'gray'}}>{'1 mile'}</Text>
         </View>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row',
    borderWidth:0,
    justifyContent:'center',
    //alignItems:'flex-start'

  },
  detailsContainer:{
    flex:5,
    justifyContent:'flex-end',
    //alignItems:'flex-'
    //borderWidth:1
  },
  attributesContainer: {
    marginLeft:5,
    flex:1,
    //borderWidth:1

  },
  openClosed: {
    flex:1,
    alignItems:'center',
    justifyContent:'flex-start',
    borderWidth:0
  },
  distance: {
    flex:1,
    padding:1,
    alignItems:'center',
    justifyContent:'flex-end',
    borderWidth:0
  }
});
