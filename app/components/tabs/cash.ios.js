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

import { AnimatedCircularProgress } from 'react-native-circular-progress';



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

    <View style={{borderWidth:0, flex:1, marginBottom:50}}>

          <NavigationBar
           title={titleConfig}
           statusBar={{hidden:false}}
           tintColor={AppConfig.themeColor()}
           leftButton={leftButtonConfig}
           />

      <View style={styles.container}>
        <Text style={styles.caption}>You earned it!</Text>
        <AnimatedCircularProgress
          size={200}
          width={30}
          fill={30}
          tintColor={AppConfig.themeColor()}
          backgroundColor={AppConfig.themeBackgroundColor()}>
          {
            (fill) => (

              <Text style={styles.points}>
                {'$30'}
              </Text>
            )
          }
        </AnimatedCircularProgress>
        <View style={{marginTop:20}}>
          <Button text="Redeem" onPress={()=> null}/>
        </View>
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
    borderColor:'red',
    marginTop:0

    //marginBottom:50
  },

  points:{
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 70,
    left: 56,
    width: 90,
    textAlign: 'center',
    color: AppConfig.themeTextColor(),
    fontSize: 50,
    fontWeight: "100"
  },

  cash: {
    //fontWeight:'bold',
    fontSize: 50,
    margin:20,
    color: AppConfig.themeTextColor()
  },

  caption:{
    fontSize: 17,
    marginBottom: 20,
   //fontWeight: 'bold',
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
