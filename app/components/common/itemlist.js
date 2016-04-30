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
var FAKE_BOOK_DATA = [
    {volumeInfo: {title: 'The Catcher in the Rye', authors: "J. D. Salinger", imageLinks: {thumbnail: 'http://books.google.com/books/content?id=PCDengEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'}}}
];
var REQUEST_URL = 'https://www.googleapis.com/books/v1/volumes?q=subject:suspense';

var styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5FCFF'
  },
  item:{
    flex:1,
    fontSize:15,
    paddingTop: 20,
    paddingBottom: 20
  },
  separator: {
       height: 1,
       backgroundColor: '#dddddd'
   }

})

class Itemlist extends Component{


  constructor(props){
    super(props);

   this.state = {
     isLoading: true,
     starCount: 3.5,
     dataSource: new ListView.DataSource({
       rowHasChanged: (r1, r2) => r1 !== r2
     })
   };
  }

  onStarRatingPress(rating) {
    // this.setState({
    //   starCount: rating
    // });
  }

  componentDidMount(){
    this.fetchData();
  }
  fetchData(){
    fetch(REQUEST_URL)
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
      <View style={{

      }}>
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
        <View>
        <Item itemName={rowData.volumeInfo.title}/>
        
        </View>
        <View>


        </View>
        <View style={styles.separator}/>
      </View>
    );
  }
}




module.exports = Itemlist;
