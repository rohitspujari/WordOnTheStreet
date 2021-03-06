import React, {
  StyleSheet,
  Component,
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity

} from 'react-native';

//import Button from '../common/button';
import Button from 'react-native-button';
import StarRating from 'react-native-star-rating';
import AppConfig from '../../common/AppConfig';


export default class PlaceCell extends Component {

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

  onAddressPress(){

    let latitude = this.props.place.geometry.location.lat;
    let longitude = this.props.place.geometry.location.lng;
    let url = 'comgooglemaps://?q=Pizza&center=37.759748,-122.427135';
    //var url = "http://maps.apple.com/?ll="+latitude+","+longitude;
    //LinkingIOS.openURL(url);
    Linking.openURL(url);
  }

  getRating(rating){
    return (
      <View style={{flexDirection:'row', alignItems:'center'}}>
      <View>
        <Text style={{fontSize:12, color: AppConfig.themeStarColor()}}>{rating}</Text>
      </View>
      <View style={{marginLeft:10}}>
          <StarRating
          disabled={true}
          emptyStar={'ios-star-outline'}
          fullStar={'ios-star'}
          halfStar={'ios-star-half'}
          iconSet={'Ionicons'}
          maxStars={5}
          rating={rating}
          selectedStar={(rating) => null}
          starColor={AppConfig.themeStarColor()}
          starSize={15}
        />
     </View>

    </View>
  );
  }

  onPress() {

    //console.log(this.props)
    this.props.navigator.push({
      type: 'HorizontalSwipeJump',
      name: 'reviewList',
      passProps : {
        placeId: this.props.place.place_id,
        showMap: 'true'
      }
    });
  }


  render() {

    var addessButton = (
      <Button containerStyle={{overflow:'hidden', borderRadius:4, backgroundColor: 'white' }}
              style={styles.addressText}
              onPress={this.onAddressPress.bind(this)}
              >

        {this.props.place.vicinity}
      </Button>
    );

    let {lat, lng} = this.props.place.geometry.location;
    let {latitude,longitude} = this.props.origin;
    let distance = Math.round(this.getDistance(latitude,longitude,lat,lng,'M')*10)/10;

    //console.log(this.props.place)
    return(
    <TouchableOpacity onPress={this.onPress.bind(this)}>
      <View style={styles.container}>
       <View style={{flexDirection:'row'}}>
        <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={{uri:this.props.place.icon }}
        />
        </View>
        <View style={styles.detailsContainer}>

          <Text style={styles.nameText}>{this.props.place.name}</Text>
          <View style={{width:10}}>
            {this.props.place.rating?this.getRating(this.props.place.rating):null}
          </View>
          <View style={{overflow:'hidden', borderRadius:4, backgroundColor: 'white' }}>
          <Text style={styles.addressText}>{this.props.place.vicinity}</Text>

          </View>

        </View>
        <View style={styles.distanceContainer}>
          <Text style={styles.distanceText}>{distance+" mile"}</Text>
        </View>
       </View>


      </View>
     </TouchableOpacity>

    );
  }
}


var styles = StyleSheet.create({
  container:{
    flex:1,
    margin:5,
    borderBottomColor:'lightgray',
    borderBottomWidth:0.7,
    padding:5
  },
  nameText:{
    fontSize:15,
    //fontWeight:'bold'
  },
  addressText:{
    color:'gray',
    fontSize:13,
    textAlign: 'left',
    fontWeight: 'normal',
  },
  distanceText:{
    color:'gray',
    fontSize:11,
    textAlign: 'center',
    fontWeight: 'normal',
  },
  logoContainer:{
    flex:1,
    //borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center'

  },
  detailsContainer: {
    //borderWidth:1,
    flex:8,
    marginLeft:10

  },
  distanceContainer:{
    //borderWidth:1,
    flex:2,
    marginLeft:10
  },
  logo:{
    width: 25,
    height: 25,
    backgroundColor: 'transparent',
    //marginRight: 10,
  }
});
