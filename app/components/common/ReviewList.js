import React, {
  Component,
  StyleSheet,
  View,
  Text,
  ListView
} from 'react-native';
import DataService from './DataService';
import StarRating from 'react-native-star-rating';
import MapComponent from './MapComponent';
const PLACE_DETAILS = 'https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyAmbpYyzqv7aPDFpdbvsHo5zIEruNBuiNI&placeid=';



export default class ReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      location: {
        latitude:41.975290,
        longitude:-87.668768
      },
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
      <View style={styles.container}>
        <Text>
          Loading Reviews...
        </Text>
      </View>
    );
  }

  render() {

    if (!this.state.isLoaded) {
      return this.renderLoadingView();
    }
    //let name = this.state.placeDetails? this.state.placeDetails.name:'loading..';
    //let location = this.state.placeDetails? this.state.placeDetails.geometry.location:DEFAULT_LOCATION;
    //let reviews = this.state.placeDetails? this.state.placeDetails.reviews:'loading..';
    //let name = this.state.placeDetails.name;

    console.log('reviewList Render '+this.state.location.latitude+', '+this.state.location.longitude);





    return(

      <View style={{flex:1,}}>
        <MapComponent location={this.state.location} style={{marginBottom:10}}/>
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
