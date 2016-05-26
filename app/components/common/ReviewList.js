import React, {
  Component,
  StyleSheet,
  View,
  Text,
  ListView,
  ActivityIndicatorIOS,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import DataService from './DataService';
import NavigationBar from 'react-native-navbar';
import StarRating from 'react-native-star-rating';
import MapComponent from './MapComponent';
import Button from '../common/button';
const PLACE_DETAILS = 'https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyAmbpYyzqv7aPDFpdbvsHo5zIEruNBuiNI&placeid=';



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
    console.log('in reviewlist componentDidMount');
    this.fetchPlaceDetails(this.props.placeId);
    // DataService.fetchPlaceDetails(this.props.placeId, (response)=> {
    //   //console.log(response);
    //   this.setState({
    //     placeDetails: response.result,
    //     dataSource: this.state.dataSource.cloneWithRows(response.result.reviews),
    //     location: {
    //       latitude: response.result.geometry.location.lat,
    //       longitude: response.result.geometry.location.lng
    //     }
    //   })
    // })//end

  }

  fetchPlaceDetails(placeId){
    let url = `${PLACE_DETAILS}${placeId}`;
    fetch(url)
    .then((response)=>response.json())
    .then((responseData)=>{
      //console.log(this.responseData)
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
        location: this.state.location,
        markers: [this.state.location],
        isChild: false
      }
    });
  }

  render() {

    if (!this.state.isLoaded) {
      return this.renderLoadingView();
    }



    //console.log(this.props);

    let map = null;
    if(this.props.showMap) {
      map = (
         <TouchableOpacity style={{flex:1, marginBottom:10}} onPress={this.onMapPress.bind(this)}>

        <MapComponent place={this.state.placeDetails} markers={[this.state.location]} location={this.state.location} isChild={true}/>

         </TouchableOpacity>
      );
    }


    const rightButtonConfig = {
      title: 'Close',
      handler: () => this.props.navigator.pop(),
    };

    const titleConfig = {
      title: 'Reviews',
    };

    return(





      <View style={{flex:1}}>
      <StatusBar hidden={false}/>
      <NavigationBar
        title={titleConfig}
        statusBar={{hidden:false}}
        tintColor='#b2cb53'
        rightButton={rightButtonConfig} />
        {map}
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData)=>{
            return(

              <View style={{padding:5}}>
              <StarRating
                disabled={true}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                maxStars={5}
                rating={rowData.rating}
                selectedStar={(rowData) => {
                  return null;
                }}
                starColor={'#b2cb53'}
                starSize={25}
              />
                <Text style={{paddingTop:5, paddingBottom:5}}>{rowData.text}</Text>
                <View style={{borderWidth:0.5, borderColor: 'gray'}}/>
              </View>
            );
        }}/>
      </View>

    );

  }
}
