'use strict';


import React, {
  Component,
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  View,
  ScrollView,

} from 'react-native';

import NavigationBar from 'react-native-navbar';
import AppConfig from '../common/AppConfig';

import Button from '../common/button';
import ReviewList from '../common/ReviewList';

//import {CircularProgress}  from 'react-native-circular-progress';

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



  render(){

    const leftButtonConfig = {
      title: 'Settings',
      tintColor: AppConfig.themeTextColor(),
      handler: () => this.props.navigator.pop(),
    };

    const titleConfig = {
      title: 'Cash',
      tintColor: AppConfig.themeTextColor(),
    };

    navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log(position);
  },
  (error) => {alert(error.message)},
  {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  );

//ChIJFVZR1t3RD4gRVvYqcGhnaxw
    return(
      <View>
      <View style={{flex:1}}>
      <NavigationBar
         title={titleConfig}
         statusBar={{hidden:false}}
         tintColor={AppConfig.themeColor()}
         leftButton={leftButtonConfig}
      />
      </View>
      <View style={styles.container}>
      <Text style={styles.caption}>You have earned</Text>
      <Text style={styles.cash}>$40</Text>
      <Button  text="Redeem" onPress={()=> null}/>
      </View>
      </View>
    );
  }
}


var styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth:2,
    marginTop:150

    //marginBottom:50
  },

  cash: {
    //fontWeight:'bold',
    fontSize: 50,
    margin:20,
    color: AppConfig.themeTextColor()
  },

  caption:{
    fontSize: 17,
  //  fontWeight: 'bold',
    color: AppConfig.themeTextColor()
  },

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
