import React, {
  StyleSheet,
  Component,
  Text,
  View,
  ListView,
  ActivityIndicatorIOS,
  TextInput,
  ScrollView
} from 'react-native';

import StarRating from 'react-native-star-rating';
const Firebase = require('firebase');

var customData = require('./receipts.json');
var ViewPager = require('react-native-viewpager');
var Item = require('../reviewcard/item')
//var StarRating = require('react-native-star-rating');

var REQUEST_URL = 'https://www.googleapis.com/books/v1/volumes?q=subject:suspense';

var styles = StyleSheet.create({
  container:{

    //flex: 1,
    //flexDirection: 'row',
    //justifyContent: 'center',
    //alignItems: 'center',

  },
  separator: {
    height: 1,

   }
})

class Itemlist extends Component{
  constructor(props){
    //console.log("i am in itemlist constructor");
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
   }
  }

  componentDidMount(){
    //console.log("i am in Itemlist did mount");
    //this.fetchData(REQUEST_URL);
    //this.fetchReceipts();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.items)
    });


  }

  fetchReceipts(){
    this.firebaseRef = new Firebase('https://wots.firebaseio.com/receipts');
    this.firebaseRef.once("value",(dataSnapshot)=>{
      var items = dataSnapshot.val();
      this.setState({
        items: items,
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
    })
  }

  fetchData(url){
    fetch(url)
    .then((response)=>response.json())
    .then((responseData)=>{
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.items),
        isLoading: false
      });
    })
    .done();
  }

  renderLoadingView(){
    return(
      <View style>
      <ActivityIndicatorIOS
       size="large"/>
       <Text>Loading View</Text>
      </View>
    )
  }

  render(){
    return(
      <ScrollView>
      <View style={styles.container}>
          <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow} />
        </View>
        </ScrollView>
    );
  }


  renderRow(rowData){
    return(
        <View>
          <Item itemName={rowData.order} />
          <View style={styles.separator} />
        </View>
    );
  }
}




module.exports = Itemlist;
