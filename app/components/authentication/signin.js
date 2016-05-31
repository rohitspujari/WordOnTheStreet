import React, {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicatorIOS,
  Component,
  AlertIOS
} from 'react-native';


import store from 'react-native-simple-store';
import Firebase from 'firebase';
import TouchID from 'react-native-touch-id';

const ref = new Firebase("https://wots.firebaseio.com");
var buffer = require('buffer');
var Button = require('../common/button');


export default class Signin extends Component {

  constructor(props){
    super(props);

    this.state = {
      showProgress: true,
    }
  }


  renderLoadingView() {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicatorIOS
            animating={true}
            size="small" />
      </View>
    );
  }

  render() {



    if ( this.state.showProgress) {
      return this.renderLoadingView();
    }





    var errorCtrl = <View />;

    if(!this.state.success){
      errorCtrl = <Text style={Styles.error}>
      {this.state.message}
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
    <Button text={'Authenticate with Touch ID'} onPress={this.onTouchIdPress.bind(this)}/>


    {errorCtrl}

    </View>
  }


  onTouchIdPress () {
    TouchID.authenticate('Word On The Street')
      .then(success => {
        this.success();
      })
      .catch(error => {
        AlertIOS.alert('Authentication Failed');
      });

  }

  authHandler (error, authData) {

  }

  success() {
    this.setState({
      showProgress: false,
      message: 'success',
      success: true
    });
    this.props.navigator.immediatelyResetRouteStack([{ name:'tab', type:'FadeAndroid'}]);
  }



  componentDidMount(){


    if(this.props.shouldLogin){
      this.onSigninPress()
      return;
    }

    //this.setState({showLogInWindow:false})
    store.get('username').then((username) => {
      if(username) {
        return store.get(username)
      }
      else {
        //console.log('Username not present')
        this.setState({showProgress: false});
      }
    }).then((token) => {
      if(token) {
        ref.authWithCustomToken(token, (error, authData) => {
          if (error) {
            //console.log("Token Failed!", error);
            this.setState({showProgress: false});
          } else {
            //console.log("Authenticated successfully from AsyncStorage:", authData);
            this.success()
          }
        });
      } else{
        //console.log("Token not present!");
        this.setState({showProgress: false});
      }
    })
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validation(username, password) {

    if(username && username.length === 0){
      return {
        message: 'Please enter valid email address',
        success: false
      }
    }
    if(password && password.length === 0){
      return {
        message: 'Please enter valid password',
        success: false
      }
    }

    if(!this.validateEmail(username)){
      return {
        message: 'Please enter valid email address',
        success: false
      }
    }

    return {
      message: 'success',
      success: true
    }
  }



  onSigninPress() {

    var username = this.props.username?this.props.username:this.state.username;
    var password = this.props.password?this.props.password:this.state.password;

    console.log(username);
    var check = this.validation(username,password)

    if(check.success) {
      this.setState({
        message: check.message,
        success: check.success,
        showProgress: true
      })

      ref.authWithPassword({
        email : username,
        password : password
      }, (error, authData) => {
        if (error) {
          console.log(error.message);
          console.log("Login Failed!", error);
          this.setState({
            showProgress: false,
            message: error.message,
            success: false
          });
        } else {
          store.save('username',username);
          store.save( username, authData.token);
          //console.log("Authenticated successfully with payload:", authData);
          this.success()
        }
      });
    }
    else{
      this.setState({
        message: check.message,
        success: check.success
      });
    }
  }

  onSigninPress__GITHUB(){
    this.setState({showProgress: true})

    var authService = require('./authservice');

    authService.login({
      username: this.state.username,
      password: this.state.password
    },(results)=>{
      this.setState(
        Object.assign({
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

    this.props.navigator.push({
      name: 'signup',
      type: 'Modal',
    });
    //this.props.navigator.push({name:'signup'});
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


//module.exports = Signin;
