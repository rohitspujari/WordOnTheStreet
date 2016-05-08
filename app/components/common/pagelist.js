


import React, {
  StyleSheet,
  Component,
  Text,
  View,
  ListView,
  ActivityIndicatorIOS,
  TextInput,
  ScrollView,
  TouchableHighlight,
  Animated,
  Easing
} from 'react-native';

var Itemlist = require('./itemlist');
var ViewPager = require('react-native-viewpager');
const url = "https://wots.firebaseio.com/receipts";
var items = [];

class PageList extends Component{

 constructor(props) {
   //console.log("i am in pagelist constructor");
   super(props);
    var dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 != p2
    });
   var items = [];
   this.state = {
      dataSource: dataSource.cloneWithPages(items)
    };
  }


  componentDidMount(){
    //console.log("i am in pagelist did mount");
    this.fetchReceipts();
  }



  fetchReceipts(){
    this.firebaseRef = new Firebase('https://wots.firebaseio.com/receipts');
    this.firebaseRef.on("value",(dataSnapshot)=>{
      var items = dataSnapshot.val();
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
        autoPlay={false}
        animation = {(animatedValue, toValue, gestureState) => {
        // Use the horizontal velocity of the swipe gesture
        // to affect the length of the transition so the faster you swipe
        // the faster the pages will transition
        console.log("------------");
        console.log(animatedValue);
        console.log(toValue);
        console.log(gestureState);
        var velocity = Math.abs(gestureState.vx);
        //console.log("logging velocity");
        //console.log(velocity)
        var baseDuration = 150;
        var duration = (velocity > 1) ? 1/velocity * baseDuration : baseDuration;
        //console.log(toValue);
        return Animated.timing(animatedValue,
          {
            toValue: toValue,
            duration: 120,
            easing: Easing.out(Easing.exp)
          });
        }}
       >
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
            <Itemlist items={data.order_details} />
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
