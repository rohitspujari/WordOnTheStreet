


import React, {
  StyleSheet,
  Component,
  Text,
  View,
  ListView,
  ActivityIndicatorIOS,
  TextInput,
  ScrollView,
  TouchableHighlight
} from 'react-native';

var Itemlist = require('./itemlist');
var ViewPager = require('react-native-viewpager');
const url = "https://wots.firebaseio.com/receipts";
var items = [];

var IMGS = [
  'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
  'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
  'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',
  'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
  'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
  'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
  'https://images.unsplash.com/photo-1440847899694-90043f91c7f9?h=1024'
];

class PageList extends Component{

 constructor(props) {
   super(props);
    var dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 != p2
    });

   this.state = {
      dataSource: dataSource.cloneWithPages(IMGS)
    };
  }


  componentDidMount(){
    console.log("i am in component did mount phase")
    this.fetchReceipts();




  }



  fetchReceipts(){
    this.firebaseRef = new Firebase('https://wots.firebaseio.com/receipts');
    this.firebaseRef.once("value",(dataSnapshot)=>{
      var items = dataSnapshot.val();
      console.log("fetch receipts");
      console.log(items);
      this.setState({
        dataSource: this.state.dataSource.cloneWithPages(items)
      });
    })
  }





  render() {
    return (
      <ViewPager
        style={this.props.style}
        dataSource={this.state.dataSource}
        renderPage={this.renderPage}
        isLoop={true}
        autoPlay={false}>
      </ViewPager>
    );
  }


  onPress(){

  }

  renderPage(data: Object, pageID: number | string)

    {
    return (
      <View style={styles.container}>
      <View style={styles.info}>
        <Text>{data.name}</Text>
      </View>

      <View style={styles.itemList}>
        <Itemlist />
      </View>


      <View style={styles.submit}>
      <TouchableHighlight
      underlayColor="gray"
      onPress={this.onPress}>
      <Text style={styles.buttonText}>
      Post Preview
      </Text>
      </TouchableHighlight>
      </View>

      </View>

    );
  }
}

var styles = StyleSheet.create({
  info:{
    flex: 4,

  },
  itemList:{
    flex: 10,

  },

  submit:{
    flex:2,
    justifyContent: 'center',
    borderColor: 'gray'


  },
  buttonText:{
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 20

  },
  container:{
    flex: 1,
    padding: 20,

    //justifyContent: 'center',
    //alignItems: 'stretch'
  }
});

module.exports = PageList;
