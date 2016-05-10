//'use strict';
import React, {
  Component,
  Text,
  ListContainer,
  Button,
  View
} from 'react-native';
var Itemlist = require('../common/itemlist');
var PageList = require('../common/pagelist');
var Carousel = require('../common/Carousel');
var F8PageControl = require('../common/F8PageControl');
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
      <View style={{flex:5}}>
        <Carousel
          data={this.state.cards}
          selectedIndex={this.state.selectedIndex}
          onSelectedIndexChange={this.handleIndexChange}
          renderCard={(index: number, data)=>{
            return(
              <View style={styles.container}>
                <View style={styles.info}>
                  <Text style={{fontSize:20}}>{data[index].name}</Text>
                </View>
                <View style={styles.card}>
                  <Itemlist items={data[index].order_details} {...this.props}/>
                </View>
              </View>
            );
          }}
        />
      </View>
      <View style={{flex:1, borderWidth:0}}>
        <F8PageControl style={{borderWidth:0,}}
              count={this.state.cards.length}
              selectedIndex={this.state.selectedIndex}
            />
      </View>
    </View>
    );
  }

  // renderCard(index: number, data): ReactElement {
  //   console.log(this);
  //
  // }

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




  border(color){
    return {
      //borderColor: color,
      //borderWidth: 4
    }
  }

}

var styles = StyleSheet.create({
   container: {
     flex:1,
     //marginTop:20,
     marginBottom:50,
     //backgroundColor: '#c8c864',
     backgroundColor: '#b3cd52'
  },
  info: {
    ios: {
      flex:1,
      backgroundColor: 'white',
      marginTop:10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 2,
      marginHorizontal: 3,
      backgroundColor: 'white'
    }

  },
  card: {
    ios: {
      flex:5,
      marginTop:10,
      borderRadius: 2,
      marginHorizontal: 3,
      backgroundColor: 'white'

    },
  }
});

module.exports = Reviews;
