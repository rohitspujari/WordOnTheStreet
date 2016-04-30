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
    super(props);

    this.state = {
     isLoading: true,
     dataSource: new ListView.DataSource({
       rowHasChanged: (r1, r2) => r1 !== r2
     })
   };
  }

  componentDidMount(){
    this.fetchData(REQUEST_URL);
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
    if(this.state.isLoading){
      return this.renderLoadingView();
    }
    return(
      <ScrollView>
      <View style={styles.container}>
          <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)} />
        </View>
        </ScrollView>
    );
  }


  renderRow(rowData){
    return(
        <View>
          <Item itemName={rowData.volumeInfo} />
          <View style={styles.separator} />
        </View>
    );
  }
}




module.exports = Itemlist;
