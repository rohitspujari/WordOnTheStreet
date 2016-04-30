//'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

var PageList = require('../common/pagelist');

var Reviews = React.createClass({

  render: function(){
    return (
    <View style={[styles.container,this.border('blue')]}>
    <PageList />
    </View>
    );
  },

  border: function(color){
    return {
      //borderColor: color,
      //borderWidth: 4
    }
  }
});

var styles = StyleSheet.create({
   container: {
     flex: 1,
     marginTop:20,
     marginBottom:50
  }
});

module.exports = Reviews;
