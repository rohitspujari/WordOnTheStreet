import React, {
  StyleSheet,
  Component,
  Text,
  View,
  ListView,
  ActivityIndicatorIOS,
  TextInput,
  ScrollView,
  Button
} from 'react-native';

import StarRating from 'react-native-star-rating';
import Modal from 'react-native-modalbox';
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
    //borderColor: 'red',
    borderWidth: 0,
    padding:0

  },
  separator: {
    height: 1,

  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dadbca'

  },
  modal4: {
    height: 300
  },
  btn: {
    margin: 10,
    backgroundColor: "black",
    color: "white",
    padding: 10
  },

  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },

})

class Itemlist extends Component{
  constructor(props){
    //console.log("i am in itemlist constructor");
   super(props);
   this.state = {
      dataSource: new ListView.DataSource({
                  rowHasChanged: (r1, r2) => r1 !== r2
                  }),
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3
   };


   //this.rednerRow = this.renderRow.bind(this);
   //this.onPress = this.onPress.bind(this);
  }

  componentDidMount(){

    //this.fetchData(REQUEST_URL);
    //this.fetchReceipts();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.items)
    });


  }

  fetchReceipts(){
    this.firebaseRef = new Firebase('https://wots.firebaseio.com/receipts');
    this.firebaseRef.on("value",(dataSnapshot)=>{
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

  closeModal5(id) {
    this.setState({isOpen: false});
  }

  openModal5(id) {
    this.setState({isOpen: true});
  }

  render(){


    // var commentModal = <Modal isOpen={this.state.isOpen} onClosed={this.closeModal5.bind(this)} style={[styles.modal, styles.modal4]} position={"center"} backdropContent={BContent}>
    //       <Text>{'Modal with backdrop content'}</Text>
    //     </Modal>;
    // var BContent = <Button onPress={this.closeModal5.bind(this)} style={[styles.btn, styles.btnModal]}>X</Button>;

    return(

      <ScrollView scrollEnabled={false}>
      <View style={styles.container}>
          <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData)=>{
                return(
                    <View>
                      <Item itemName={rowData.order} onPress={this.props.item_click} {...this.props} />
                      <View style={styles.separator} />
                    </View>
                  );
              }}/>
        </View>

        </ScrollView>



    );
  }


  // renderRow(rowData){
  //     //console.log(this);
  //   return(
  //
  //       <View>
  //         <Item itemName={rowData.order} onPress={()=> navigator.push({name:'signup'})} />
  //         <View style={styles.separator} />
  //       </View>
  //   );
  // }

  onPress(){
    console.log(this.props);
  }
}




module.exports = Itemlist;
