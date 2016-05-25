import React, {
  Text,
  Component,
  StyleSheet,
  View,
  ScrollView,


} from 'react-native';
import Modal from 'react-native-modalbox';
import Search from '../tabs/search.ios';
import ReviewList from './ReviewList';
import MapComponent from './MapComponent';
var window  = require('Dimensions').get('window');
var REQUEST_URL = 'https://www.googleapis.com/books/v1/volumes?q=subject:suspense';
const DEFAULT_PLACE_ID = 'ChIJN1t_tDeuEmsRUsoyG83frY4';
const DEFAULT_LOCATION = {
  lat:41.8932155,
  lng:-87.6207984
}


export default class ReviewsModal extends Component {
  constructor(props) {
    super(props);
     this.state = {renderPlaceholderOnly: true};

  }

  renderList() {
    //var x = this.fetchReviews(REQUEST_URL);



    var list = [];
      for (var i=0;i<40;i++) {
        list.push(
          <View key={i}>
          <Text style={styles.text}>elem {i}</Text>
          <View style={{borderWidth:1}}/>
          </View>
        );

    }
    return list;
  }






  render() {

    return (
      <Modal position={"bottom"} swipeArea={200} isOpen={this.props.isOpen} style={[styles.modal4, styles.modal]}>
        <View style={{flex:1, padding:20}}>
          <Text>{this.props.place.name}</Text>
        </View>
        <View style={{flex:7, paddingTop:20}}>
          <ReviewList placeId={this.props.place.place_id} showMap={true}/>
        </View>
      </Modal>

    );
  }
}
var styles = StyleSheet.create({
  modal: {
    //padding:0,
    borderWidth:0,
    //backgroundColor:'#f6f7f8',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal4: {
    //height: 500,
    borderWidth:0

  },

});
