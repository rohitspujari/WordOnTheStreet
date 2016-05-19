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
import Reviews from './components/tabs/reviews.ios';
import Search from './components/tabs/search.ios';
import ReviewsModal from './components/common/ReviewsModal';

var ROUTES = {
  signin: Signin,
  signup: Signup,
  tab: Tab,
  reviews: Reviews,
  reviewsModal: ReviewsModal,
  search: Search
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

  renderScene: function(route, navigator){
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />;
  },

  configureScene(route, routeStack){
    if(route.type == 'Modal') {
      console.log('this is modal');
      return Navigator.SceneConfigs.FloatFromBottom;
    }
    return Navigator.SceneConfigs.PushFromRight;
  },

  render: function () {
    return (
      <Navigator
        ref="nav"
        style={styles.container}
        initialRoute={true?{name:'tab'}:{name:'signin'}}
        renderScene={this.renderScene}
        configureScene={this.configureScene}
      />
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#b2cb53'
  }

});

module.exports = Main;
