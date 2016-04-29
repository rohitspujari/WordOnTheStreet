import React, {
 StyleSheet,
 Text,
 View,
 Navigator,
 TextInput
} from 'react-native';

var Button = require('../common/button');

var SignUp = React.createClass({

  getInitialState: function(){
    return{
      username: '',
      password: '',
      confirmPassword: ''
    }
  },

  render: function(){
    return <View style={Styles.container}>

    <TextInput placeholder='username'
     onChangeText={(text)=>this.setState({username: text})}
     value={this.state.username}
     style={Styles.input}/>

    <TextInput placeholder='password'
     onChangeText={(text)=>this.setState({password: text})}
     value={this.state.password}
     secureTextEntry={true} style={Styles.input}/>

    <TextInput placeholder='confirm password'
     onChangeText={(text)=>this.setState({confirmPassword: text})}
     value={this.state.confirmPassword}
     secureTextEntry={true} style={Styles.input}/>

    <Button text={'Sign Up'} onPress={this.onSignUpPress}/>
    <Button text={'I have an account'} onPress={this.onSignInPress}/>

    </View>
  },
  onSignInPress: function(){
    this.props.navigator.pop();

  }
});

var Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    //borderRadius: 5,
    margin: 5,
    width: 300,
    alignSelf: 'center'

  }
});

module.exports = SignUp;
