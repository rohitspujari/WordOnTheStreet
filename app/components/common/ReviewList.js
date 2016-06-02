import React, {
  Component,
  StyleSheet,
  View,
  Text,
  ListView,
  ActivityIndicatorIOS,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Linking,
  ScrollView,
} from 'react-native';
import DataService from './DataService';
import moment from 'moment';
import NavigationBar from 'react-native-navbar';
import StarRating from 'react-native-star-rating';
import MapComponent from './MapComponent';
import Button from '../common/button';
import AppConfig from '../common/AppConfig';
import Icon from 'react-native-vector-icons/FontAwesome';
const PLACE_DETAILS = 'https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyAmbpYyzqv7aPDFpdbvsHo5zIEruNBuiNI&placeid=';

var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class ReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })

    };
    //console.log('in reviewlist constructor');
  }


  componentDidMount() {
    this.fetchPlaceDetails(this.props.placeId);
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        currentLocation:{
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      });
     },(error) => {alert(error.message)}, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  fetchPlaceDetails(placeId){
    let url = `${PLACE_DETAILS}${placeId}`;
    fetch(url)
    .then((response)=>response.json())
    .then((responseData)=>{//console.log(this.responseData)
      this.setState({
        placeDetails: responseData.result,
        dataSource: this.state.dataSource.cloneWithRows(responseData.result.reviews),
        location: {
          latitude: responseData.result.geometry.location.lat,
          longitude: responseData.result.geometry.location.lng
        },
        isLoaded: true
      });
    })
    .done();
  }

  renderLoadingView() {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicatorIOS
            animating={true}
            size="small" />
      </View>
    );
  }

  onMapPress() {
    this.props.navigator.push({
      name: 'mapComponent',
      type: 'Modal',
      passProps : {
        place: this.state.placeDetails,
        region:{
          latitude:this.state.location.latitude,
          longitude:this.state.location.longitude,
          latitudeDelta:LATITUDE_DELTA,
          longitudeDelta:LONGITUDE_DELTA
        },
        markers: [this.state.location],
        isChild: false
      }
    });
  }

  getRating(rating){
    return (
      <View style={{flex:1, borderWidth:0, flexDirection:'row', alignItems:'center' }}>
      <View>
        <Text style={{fontSize:12, color: AppConfig.themeStarColor()}}>{rating}</Text>
      </View>
      <View style={{marginLeft:10,}}>
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

  render() {

    if (!this.state.isLoaded) {
      return this.renderLoadingView();
    }
    console.log(this.state.placeDetails);
    let map = null;
    if(this.props.showMap) {
      map = (
         <TouchableOpacity style={{flex:1, borderWidth:0}} onPress={this.onMapPress.bind(this)}>
          <MapComponent
            place={this.state.placeDetails}
            markers={[this.state.location]}
            region={{
              latitude:this.state.location.latitude,
              longitude:this.state.location.longitude,
              latitudeDelta:LATITUDE_DELTA,
              longitudeDelta:LONGITUDE_DELTA
            }}
            isChild={true}
          />
         </TouchableOpacity>
      );
    }
    const rightButtonConfig = {
      title: 'Close',
      tintColor: AppConfig.themeTextColor(),
      handler: () => this.props.navigator.pop(),
    };
    const titleConfig = {
      title: 'Details',
      tintColor: AppConfig.themeTextColor()
    };

    let placeDetails = this.state.placeDetails
    let phoneNumber = placeDetails.formatted_phone_number.replace(/[\s+()\-+]/g, "");

    var distance = null;

    if(this.state.currentLocation){
      let dLat = this.state.location.latitude;
      let dLng = this.state.location.longitude;
      let sLat = this.state.currentLocation.latitude;
      let sLng = this.state.currentLocation.longitude;
      distance = AppConfig.getDistance(sLat, sLng, dLat, dLng, "M");
    }

    var openNowContent = null;
    if(placeDetails.opening_hours){
      if(placeDetails.opening_hours.open_now === true){
        openNowContent = <Text style={{marginTop:10, borderWidth:0, fontSize: 13, color: 'green'}}>{'Open'}</Text>;
      }
      else {
        openNowContent = <Text style={{marginTop:10, borderWidth:0, fontSize: 13, color: 'red'}}>{'Closed'}</Text>;
      }
    }

    return(
      <View style={{flex:1}}>
        <NavigationBar
          title={titleConfig}
          statusBar={{hidden:false}}
          tintColor={AppConfig.themeColor()}
          rightButton={<Button type="navBar" icon="close" onPress={() => this.props.navigator.pop()}/>}
        />

        <View style={styles.container}>
        <ScrollView>
        <View style={styles.infoContainer}>
        <View style={{ flex:1, flexDirection:'row', alignItems:'flex-end',borderWidth:0 }}>
          <View style={{flex: 2, alignItems:'flex-start'}}>
            <TouchableOpacity onPress={()=> {
              if(placeDetails.website){
                Linking.openURL(placeDetails.website)
              }

            }}>
              <Text style={{fontSize:20, fontWeight: '500', color: AppConfig.themeTextColor()}}>{placeDetails.name}</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex:1, alignItems:'flex-end', borderWidth:0}}>
            {this.getRating(placeDetails.rating)}
          </View>
        </View>

        <Text style={{marginTop:5, fontSize:13, color:'gray'}}>{((placeDetails.types.toString()).replace(/_/g, " ")).replace(/,/g, ", ")}</Text>
        <View style={{marginTop:10,flexDirection: 'row', alignItems:'center'}}>
          <Icon style={{paddingBottom:1}}name={'map-marker'} size={12} color='gray' />
          <TouchableOpacity>
            <Text style={{marginLeft:5, fontSize: 14, color: AppConfig.themeTextColor()}}>{placeDetails.formatted_address}</Text>
          </TouchableOpacity>

        </View>

          <TouchableOpacity onPress={()=> (Linking.openURL('tel:'+phoneNumber))}>
            <Text style={{marginTop:0, fontSize: 14, color: AppConfig.themeTextColor()}}>{placeDetails.formatted_phone_number}</Text>
          </TouchableOpacity>
          <View style={{flexDirection:'row', alignItems:'center'}}>
           <View style={{ flex:1,alignItems:'flex-start'}}>
            {openNowContent}
           </View>
           <View style={{alignItems:'flex-end', borderWidth:0}}>
            <Text style={{marginTop:10, fontSize: 13, color:'darkgray'}} >{distance}</Text>
           </View>
          </View>

        </View>
        </ScrollView>
        <View style={{flex:0.75, padding: 10}}>
          {map}
        </View>
        <View style={styles.listView}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData)=>{
            let time = moment.unix(rowData.time).format("M/DD/YYYY");
            return(
              <View style={styles.reviewContainer}>
               <View style={styles.reviewTitleContainer}>
                <View style={{flexDirection:'row', borderWidth:0, flex:2, alignItems:'flex-start'}}>
                  <View style={{flex:1, alignItems:'flex-start'}}>
                    <Text style={styles.nameText}>{rowData.author_name}</Text>
                  </View>
                  <View style={{flex:1, alignItems:'flex-end'}}>
                    <Text style={styles.time}>{time}</Text>
                  </View>
                </View>
                <View style={{flex: 1, borderWidth:0, alignItems:'flex-end'}}>
                    {this.getRating(rowData.rating)}
                </View>

               </View>
               <View style={styles.reviewTextContainer}>
                  <Text style={styles.reviewText}>{rowData.text}</Text>
               </View>
              </View>


            );
        }}/>
        </View>
        </View>

      </View>

    );

  }
}

var styles = StyleSheet.create({

  container: {
    flex:1,
    //borderWidth:1
  },
  reviewContainer:{
    margin:7,
    borderBottomColor:'lightgray',
    borderBottomWidth:0.7,
    padding:5,
    borderWidth:0,
    flex:4
  },
  reviewTitleContainer:{
    flexDirection:'row',
    alignItems:'center',
    //justifyContent: 'space-between',
    marginBottom:10,
    //borderWidth: 1
  },
  reviewTextContainer: {
    marginTop: 5
  },
  reviewText:{
    //color:'gray',
    fontSize:13,
    textAlign: 'left',
    fontWeight: 'normal',
  },
  time:{
    flex:1,
    color:'gray',
    //borderWidth:1,

    fontSize: 12,
  },
  listView:{
    flex:2
  },
  nameText:{
    flex:2,
    fontSize:13,
    fontWeight:'bold'
  },
  infoContainer: {
    flex:2,
    padding: 10,
    marginTop:5,
    paddingBottom: 0,
    //borderWidth:1
  }
});
