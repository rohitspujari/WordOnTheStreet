'use strict';


import React, {
  Component,
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  View,
  ScrollView
} from 'react-native';

import Button from '../common/button';
import ReviewList from '../common/ReviewList';

var styles = StyleSheet.create({
  description: {
    fontSize: 20,
    textAlign: 'center',
    color: '#000000'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#654321'
  }
});
export default class Cash extends Component{

  constructor(props) {
    super(props);
    console.log('i am constructor')
    this.state = {}
  }

  adjustCardSize(e: any) {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: (e.nativeEvent.layout.height),
    });
  }

  render(){

  navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log(position);
  },
  (error) => {alert(error.message)},
  {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  );

//ChIJFVZR1t3RD4gRVvYqcGhnaxw
    return(
      <View style={{flex:1, justifyContent: 'center', borderWidth:1 ,alignItems: 'center', backgroundColor:'#eeece9'}}>
      <ScrollView horizontal={true} pagingEnabled={true} onLayout={this.adjustCardSize.bind(this)} >
        <View style={{flex:1, width:350, height: 600, margin:5, backgroundColor:'green'}}>
         <Text>Hello</Text>
        </View>
        <View style={{flex:1, width:350, height: 600, margin:5, backgroundColor:'green'}}>
         <Text>Hello</Text>
        </View>


      </ScrollView>
      </View>
    );
  }
}


var Styles = StyleSheet.create({

  input: {

    padding: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    //borderRadius: 5,

    width: 300,
    alignSelf: 'center'

  }

})
