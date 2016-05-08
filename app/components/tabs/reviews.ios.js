//'use strict';
import React, {
  Component,
  Text,
  View
} from 'react-native';

var PageList = require('../common/pagelist');
var Carousel = require('../common/Carousel');
const StyleSheet = require('F8StyleSheet');

class Reviews extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      count: 10,
      selectedIndex: 0

    };

    (this: any).handleIndexChange = this.handleIndexChange.bind(this);
  }

  handleIndexChange(selectedIndex: number) {
    //this.track(selectedIndex);
    this.setState({
      selectedIndex: selectedIndex
    });
  }

  render(){
    return (
    <View style={[styles.container,this.border('blue')]}>
    <Carousel
          count={this.state.count}
          selectedIndex={this.state.selectedIndex}
          onSelectedIndexChange={this.handleIndexChange}
          renderCard={this.renderCard}
        />
    </View>
    );
  }

  renderCard(index: number): ReactElement {
    return (
      <View style={styles.card}>
      <Text >{index}</Text>
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
