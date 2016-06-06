import React, {
 StyleSheet,
 Text,
 View,
 Component,
 ActivityIndicatorIOS,
 TouchableOpacity,

 TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
var Button = require('../common/button');
import Firebase from 'firebase';
const ref = new Firebase("https://wots.firebaseio.com");
import AppConfig from '../common/AppConfig';

export default class SignUp extends Component {

  constructor(props){
    super(props);
    this.state = {
      showSignUpProgress: false,
      success:true,
      username: '',
      password: '',
      confirmPassword: ''
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


  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }


  validation() {

    if(this.state.username.length === 0){
      return {
        message: 'Please enter valid email address',
        success: false
      }
    }
    if(this.state.password.length === 0){
      return {
        message: 'Please enter valid password',
        success: false
      }
    }
    if(this.state.confirmPassword.length === 0){
      return {
        message: 'Please confirm your password',
        success: false
      }
    }

    if(!this.validateEmail(this.state.username)){
      return {
        message: 'Please enter valid email address',
        success: false
      }
    }

    if(this.state.password === this.state.confirmPassword) {
      if(this.state.password.length < 5){
        return {
          message: 'Password should be greater than 5 characters',
          success: false
        }
      }
    } else {
      return {
        message: 'Passwords do not match',
        success: false
      }
    }

    return {
      message: 'success',
      success: true
    }
  }
  onSignUpPress() {

    var check = this.validation();

    if(check.success) {
      this.setState({
        message: check.message,
        success: check.success,
        showSignUpProgress: true
      })
      ref.createUser({
        email    : this.state.username,
        password : this.state.password
      }, (error, userData) => {
        if (error) {
          console.log("Error creating user:", error);
          this.setState({
            showSignUpProgress: false,
            message: error.message,
            success: false
          });
        }
        else {
          console.log("Successfully created user account with uid:", userData.uid);
          this.props.navigator.push({
            name: 'signin',
            title:'Sign In',
            type:'Blend',
            passProps : {
              username: this.state.username,
              password: this.state.password,
              shouldLogin: true
            }
          });
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

  onSignInPress(){
    //console.log(this)
    this.props.navigator.pop();

  }
  render(){

    if (this.state.showSignUpProgress) {
      return this.renderLoadingView();
    }
    var errorMsg = null;
    if(!this.state.success) {
      errorMsg = <Text style={styles.error}>{this.state.message}</Text>;
    }
    return (
      <LinearGradient colors={['#E4FF7F','#B3CD52','#739711']} style={styles.container}>
        <View style={styles.loginContainer}>
          <TextInput placeholder='Username'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(text)=>this.setState({username: text})}
            value={this.state.username}
            style={styles.input}
            clearButtonMode="while-editing"
          />
          <TextInput placeholder='Password'
            onChangeText={(text)=>this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true} style={styles.input}
            clearButtonMode="while-editing"
          />
          <TextInput placeholder='Confirm password'
            onChangeText={(text)=>this.setState({confirmPassword: text})}
            value={this.state.confirmPassword}
            secureTextEntry={true} style={styles.input}
            clearButtonMode="while-editing"
          />

          <TouchableOpacity style={{width:300, alignSelf:'center', borderWidth:0}} onPress={this.onSignUpPress.bind(this)}>
            <Text style={{ alignSelf:'center', justifyContent:'center',fontSize:16, padding:10, color: AppConfig.themeBackgroundColor()}}>Sign Up</Text>
          </TouchableOpacity>
           {errorMsg}
        </View>

        <View style={styles.ribbonContainer}>
          <TouchableOpacity onPress={this.onSignInPress.bind(this)} style={{flex:1, borderRightWidth:0.0, borderRightColor: AppConfig.themeBackgroundColor(), justifyContent:'center' }}>
            <Text style={{alignSelf:'center', color: AppConfig.themeBackgroundColor(), fontSize:15}}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:2, borderWidth:0, justifyContent:'center',borderRightWidth:0.0, borderRightColor: AppConfig.themeBackgroundColor() }}>
            <Text style={{alignSelf:'center', color: AppConfig.themeBackgroundColor(), fontSize:15}}>Forgot Password</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={()=>null} style={{flex:1, borderRightWidth:0.0, justifyContent:'center' }}>
            <Text style={{alignSelf:'center', color: AppConfig.themeBackgroundColor(), fontSize:15}}>Touch ID</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

}

var styles = StyleSheet.create({

  container:{
    flex:1,
    //backgroundColor: AppConfig.themeColor(),
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
    //borderRadius: 5,
    width: 300,
    alignSelf: 'center',
  //  backgroundColor:'white',
    backgroundColor:AppConfig.themeBackgroundColor(),
  }
});
module.exports = SignUp;
