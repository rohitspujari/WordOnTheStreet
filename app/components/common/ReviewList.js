import React, {
  Component,
  StyleSheet,
  View,
  Text,
  ListView
} from 'react-native';
import DataService from './DataService';
import StarRating from 'react-native-star-rating';

export default class ReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
    //console.log('in reviewlist constructor');
  }


  componentDidMount() {
    //console.log('in reviewlist componentDidMount');
    DataService.fetchPlaceDetails(this.props.placeId, (response)=> {
      //console.log(response);
      this.setState({
        placeDetails: response,
        dataSource: this.state.dataSource.cloneWithRows(response.reviews)
      })
    })

  }
  render() {

    //let name = this.state.placeDetails? this.state.placeDetails.name:'loading..';
    let rating = this.state.placeDetails? this.state.placeDetails.rating:'loading..';
    //let reviews = this.state.placeDetails? this.state.placeDetails.reviews:'loading..';
    //let name = this.state.placeDetails.name;
    //console.log(this.state.placeDetails);




    return(

      <View style={{flex:1, backgroundColor:'#f6f7f8'}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData)=>{
            return(

              <View style={{paddingLeft:10, paddingRight:10}}>
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
