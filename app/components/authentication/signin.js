import React, {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicatorIOS,
  Component,
  AlertIOS,
  TouchableOpacity
} from 'react-native';


import store from 'react-native-simple-store';
import Firebase from 'firebase';
import TouchID from 'react-native-touch-id';
import AppConfig from '../common/AppConfig';
import { SegmentedControls } from 'react-native-radio-buttons'
import LinearGradient from 'react-native-linear-gradient';

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



  onTouchIdPress () {
    TouchID.authenticate('Word On The Street')
      .then(success => {
        this.success("");
      })
      .catch(error => {
        AlertIOS.alert('Authentication Failed');
      });

  }

  authHandler (error, authData) {

  }

  success(uid) {
    this.setState({
      showProgress: false,
      message: 'success',
      success: true,
      uid: uid
    });


    this.props.navigator.immediatelyResetRouteStack([{
      name:'tab', type:'FadeAndroid',
      passProps : {
        username: this.state.username,
        uid: this.state.uid

      }
    }]);
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
    }).then((auth) => {
      if(auth) {
        ref.authWithCustomToken(auth.token, (error, authData) => {
          if (error) {
            //console.log("Token Failed!", error);
            this.setState({showProgress: false});
          } else {

            //console.log("Authenticated successfully from AsyncStorage:", authData);
            this.success(authData.uid)
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

    //console.log(username);
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
          //store.save('uid',authData.uid);
          store.save( username, authData);
          //console.log("Authenticated successfully with payload:", authData);
          this.success(authData.uid)
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



  onSignupPress(){

    this.props.navigator.push({
      name: 'signup',
      type: 'Modal',
    });
    //this.props.navigator.push({name:'signup'});
  }

  render() {

    if ( this.state.showProgress) {
      return this.renderLoadingView();
    }

    var errorCtrl = <View />;

    if(!this.state.success){
      errorCtrl = <Text style={styles.error}>
      {this.state.message}
      </Text>;
    }

    var bottomButtons = (

      <View>
      </View>

    )

    return (
      <LinearGradient colors={['#E4FF7F','#B3CD52','#739711']}  style={styles.container}>

        <View style={styles.loginContainer}>
          <TextInput placeholder='Username'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(text)=>this.setState({username: text})}
            style={styles.input}
            clearButtonMode="while-editing"
          />
          <TextInput placeholder='Password'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(text)=>this.setState({password: text})}
            secureTextEntry={true} style={styles.input}
            clearButtonMode="while-editing"
          />
          <TouchableOpacity style={{width:300, alignSelf:'center', borderWidth:0}} onPress={this.onSigninPress.bind(this)}>
            <Text style={{ alignSelf:'center', justifyContent:'center',fontSize:16, padding:10, color: AppConfig.themeBackgroundColor()}}>Sign In</Text>
          </TouchableOpacity>
          {errorCtrl}
        </View>

        <View style={styles.ribbonContainer}>
          <TouchableOpacity onPress={this.onSignupPress.bind(this)} style={{flex:1, borderRightWidth:0.0, borderRightColor: AppConfig.themeBackgroundColor(), justifyContent:'center' }}>
            <Text style={{alignSelf:'center', color: AppConfig.themeBackgroundColor(), fontSize:15}}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:2, borderWidth:0, justifyContent:'center',borderRightWidth:0.0, borderRightColor: AppConfig.themeBackgroundColor() }}>
            <Text style={{alignSelf:'center', color: AppConfig.themeBackgroundColor(), fontSize:15}}>Forgot Password</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={this.onTouchIdPress.bind(this)} style={{flex:1, borderRightWidth:0.0, justifyContent:'center' }}>
            <Text style={{alignSelf:'center', color: AppConfig.themeBackgroundColor(), fontSize:15}}>Touch ID</Text>
          </TouchableOpacity>
        </View>

      </LinearGradient>
    );
  }



};

var styles = StyleSheet.create({

  container:{
    flex:1,
    //backgroundColor: AppConfig.themeColor(),
    //borderWidth:1
  },
  loginContainer: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center', //borderWidth:1,
  },

  ribbonContainer:{
    flex:1.5,
    borderWidth:0,
    borderTopWidth: 0.0,
    borderTopColor: AppConfig.themeBackgroundColor(),
    flexDirection:'row'
  },

  error: {
    color:'red',
    paddingTop: 10
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0,
    padding:10,
    marginBottom:10,
    borderRadius: 2,
    width: 300,
    alignSelf: 'center',
  //  backgroundColor:'white',
    backgroundColor:AppConfig.themeBackgroundColor(),
  }
});


//module.exports = Signin;
rts = Signin;
