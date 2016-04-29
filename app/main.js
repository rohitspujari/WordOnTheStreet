 import React, {
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
var Parse = require('parse/react-native')
var Signin = require('./components/authentication/signin');
var Signup = require('./components/authentication/signup');
var Tab = require('./components/tabs/tab.ios');
var AuthService = require('./components/authentication/authservice');

var ROUTES = {
  signin: Signin,
  signup: Signup,
  tab: Tab
};


var Main = React.createClass({

  componentDidMount: function(){

    AuthService.getAuthInfo((err,authInfo)=>{
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo !=null
      })
    });
  },
  // getInitalState: function(){
  //   return{
  //     isLoggedIn:false,
  //     checkingAuth:true
  //   }
  // },

  renderScene: function(route, navigator){



    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />;
  },
  render: function () {

    return <Navigator
    style={styles.container}
    initialRoute={true?{name:'tab'}:{name:'signin'}}
    renderScene={this.renderScene}
    confgureScene={()=>{return Navigator.SceneConfigs.FloatFromRight;}}/>
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  }

});

module.exports = Main;
