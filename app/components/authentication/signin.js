import React, {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicatorIOS,
  Component
} from 'react-native';


var buffer = require('buffer');
var Button = require('../common/button');


class Signin extends Component {

  constructor(props){
    super(props);

    this.state = {
      showProgress: false
    }


  }

  render() {

    var errorCtrl = <View />;

    if(!this.state.success && this.state.badCredentials){
      errorCtrl = <Text style={Styles.error}>
      That username password combination did not work
      </Text>;
    }
    if(!this.state.success && this.state.unknownError){
      errorCtrl = <Text style={Styles.error}>
      We experienced unexpected issue
      </Text>;
    }

    return <View style={Styles.container}>

    <TextInput placeholder='username'
     autoCapitalize='none'
     autoCorrect={false}
     onChangeText={(text)=>this.setState({username: text})}

     style={Styles.input}/>

    <TextInput placeholder='password'
    autoCapitalize='none'
    autoCorrect={false}
    onChangeText={(text)=>this.setState({password: text})}

     secureTextEntry={true} style={Styles.input}/>
    <Button text={'Sign In'} onPress={this.onSigninPress.bind(this)}/>
    <Button text={'I need an account'} onPress={this.onSignupPress.bind(this)}/>

    {errorCtrl}

    <ActivityIndicatorIOS style={{
        marginTop: 20
        }}
        animating={this.state.showProgress}
        size="large" />
    </View>
  }

  onSigninPress(){
    this.setState({showProgress: true})

    var authService = require('./authservice');

    authService.login({
      username: this.state.username,
      password: this.state.password
    },(results)=>{
      this.setState(Object.assign({
        showProgress:false
      },results));

     if(this.state.success){
       this.props.navigator.immediatelyResetRouteStack([{ name:'tab' }]);
     }

    });


    //
    //
    // var b = new buffer.Buffer(this.state.username+':'+this.state.password);
    // var encodedAuth = b.toString('base64');
    //
    // fetch('https://api.github.com/user',{
    //   headers: {
    //     'Authorization' : 'Basic ' + encodedAuth
    //   }
    // })
    // .then((response)=> {
    //   if(response.status >= 200 && response.status < 300){
    //     return response;
    //   }
    //   throw {
    //     badCredentials: response.status == 401,
    //     unknownError: response.status !=401
    //   }
    // })
    // .then((results)=> {
    //   console.log(results);
    //   this.setState({success: true})
    //   this.setState({showProgress:false});
    //   this.props.navigator.immediatelyResetRouteStack([{ name:'tab' }]);
    // })
    // .catch((err)=>{
    //   console.log('login failed ' + err);
    //   this.setState(err);
    // })
    // .finally(()=>{
    //   this.setState({showProgress:false});
    // });
    //


  }
  onSignupPress(){
    this.props.navigator.push({name:'signup'});
  }


};

var Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  error: {
    color:'red',
    paddingTop: 10
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


module.exports = Signin;
