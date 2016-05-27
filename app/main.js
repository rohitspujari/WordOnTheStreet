 import React, {
  StyleSheet,
  Component,
  Text,
  View,
  Navigator,
  StatusBar,
  TouchableOpacity
} from 'react-native';
var Parse = require('parse/react-native')
var Signin = require('./components/authentication/signin');
var Signup = require('./components/authentication/signup');
var Tab = require('./components/tabs/tab.ios');
var AuthService = require('./components/authentication/authservice');
import Reviews from './components/tabs/reviews.ios';
import Search from './components/tabs/search.ios';
import ReviewsModal from './components/common/ReviewsModal';
import Comment from './components/common/Comment';
import ReviewList from './components/common/ReviewList';
import MapComponent from './components/common/MapComponent';

var ROUTES = {
  signin: Signin,
  signup: Signup,
  tab: Tab,
  reviews: Reviews,
  reviewsModal: ReviewsModal,
  reviewList: ReviewList,
  comment: Comment,
  search: Search,
  mapComponent: MapComponent
};

var NavigationBarRouteMapper = {

  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    var previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {previousRoute.title}
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarRightButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          Close
        </Text>
      </TouchableOpacity>
    );
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title} [{index}]
      </Text>
    );
  },

}

export default class Main extends Component {

  componentDidMount(){

    AuthService.getAuthInfo((err,authInfo)=>{
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo !=null
      })
    });
  }

  renderScene (route, navigator){
    var Component = ROUTES[route.name];
    return (

      <Component route={route} navigator={navigator} {...route.passProps}  />


    );

  }

  configureScene(route, routeStack){
    if(route.type == 'Modal') {
      console.log('this is modal');
      return Navigator.SceneConfigs.FadeAndroid;
    }
    return Navigator.SceneConfigs.FloatFromBom;
  }




  render() {
    return (

        <Navigator
          ref="nav"
          style={styles.container}
          initialRoute={true?{name:'tab'}:{name:'signin'}}
          renderScene={this.renderScene}
          configureScene={this.configureScene}

        />

    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#b2cb53'
  }

});
