

import React, {
  Component,
  StyleSheet,
  MapView,
  View,
  Text,
  TextInput
} from 'react-native';

var Styles = StyleSheet.create({
  container:
  {
    flex:1,
    marginTop: 20,
    marginBottom: 50

  },
  map: {
    flex:30,
    alignItems: 'center',
    justifyContent: 'center',

  },
  placeWrap: {
    flex:15,
    alignItems: 'center',
    justifyContent: 'center',

  },
  search: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    //borderWidth:2,
    //alignSelf: 'center',
    padding: 10,
    flex:2
  }
});


//Create a component
var Search = React.createClass({


  render: function(){
    var pins = [{
      latitude: 0,
      longitude: 0
    }];
    return<View style={Styles.container}>

    <TextInput placeholder='search'
     onChangeText={(text)=>this.setState({search: text})}
     value={this.state.search}
     style={Styles.search}/>


    <MapView
    annotations={pins}
    onRegionChangeComplete={this._onRegionChangeComplete}
    style={Styles.map}>
      </MapView>
    <View style={Styles.placeWrap}>
    <Text>Reviews</Text>
    </View>
    </View>

  },
  getInitialState: function(){
    return {
      latitude: 0,
      longitude: 0
    }
  },
  _onRegionChangeComplete: function(region){
    this.setState({
      pin:{
        latitude: region.latitude,
        longitude: region.longitude
      }
    });
  }

});

module.exports = Search;
