'use strict';


import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

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
  }

  render(){
    return(
      <View style={styles.container}>
      <Text style={styles.description}>
      Welcome to your Csh!
      </Text>
      </View>
    );
  }
}
