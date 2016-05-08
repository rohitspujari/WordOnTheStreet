//'use strict';
import React, {
  Component,
  Text,
  View
} from 'react-native';
var Itemlist = require('../common/itemlist');
var PageList = require('../common/pagelist');
var Carousel = require('../common/Carousel');
const StyleSheet = require('F8StyleSheet');
const url = "https://wots.firebaseio.com/receipts";


class Reviews extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      cards: [],
      selectedIndex: 0
    };
    (this: any).handleIndexChange = this.handleIndexChange.bind(this);
  }

  handleIndexChange(selectedIndex: number) {
    this.setState({
    selectedIndex: selectedIndex
    });
  }

  render(){
    return (
      <View style={[styles.container,this.border('blue')]}>
        <Carousel
          data={this.state.cards}
          selectedIndex={this.state.selectedIndex}
          onSelectedIndexChange={this.handleIndexChange}
          renderCard={this.renderCard}
        />
      </View>
    );
  }

  componentDidMount(){
    this.fetchReceipts();
  }

  fetchReceipts(){
    this.firebaseRef = new Firebase('https://wots.firebaseio.com/receipts');
    this.firebaseRef.once("value",(dataSnapshot)=>{
      var items = dataSnapshot.val();
      this.setState({
        cards: this.state.cards.concat(items)
      });
    })
  }


  renderCard(index: number, data): ReactElement {
    return(
      <View style={styles.card}>
        <Text>{data[index].name}</Text>
        <Itemlist items={data[index].order_details}/>
      </View>
    );
  }

  border(color){
    return {
      //borderColor: color,
      //borderWidth: 4
    }
  }

}

var styles = StyleSheet.create({
   container: {
     flex: 1,
     //marginTop:20,
     marginBottom:50,
     backgroundColor: '#c8c864'
     //backgroundColor: '#b3cd52'
  },
  card: {
    ios: {
      flex:1,
      marginTop:10,
      borderRadius: 2,
      marginHorizontal: 3,
      backgroundColor: 'white'

    },
  }
});

module.exports = Reviews;
