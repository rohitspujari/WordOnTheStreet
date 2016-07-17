 import React, {
  StyleSheet,
  Component,
  Text,
  View,
  Navigator,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import Payment from './components/tabs/ReviewTab/Control/Payment'
import Signin from './components/authentication/SignIn';
import Signup from './components/authentication/SignUp';
import Tab from './components/tabs/Tabs';
import Reviews from './components/tabs/ReviewTab/Reviews';
import Search from './components/tabs//SearchTab/Search';
import ReviewList from './components/tabs/ReviewTab/ReviewList';
import MapComponent from './components/tabs/SearchTab/MapComponent';
import NearByPlacesList from './components/tabs/SearchTab/NearByPlacesList';
//import PlaceDetails from './components/common/PlaceDetails';

var ROUTES = {
  payment: Payment,
  signin: Signin,
  nearbyPlacesList: NearByPlacesList,
  signup: Signup,
  tab: Tab,
  reviews: Reviews,

  reviewList: ReviewList,
  //comment: Comment,
  search: Search,
  mapComponent: MapComponent,
  //placeDetails: PlaceDetails
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


  renderScene (route, navigator){
    var Component = ROUTES[route.name];
    return (

      <Component route={route} navigator={navigator} {...route.passProps}  />


    );

  }

  configureScene(route, routeStack){
    if(route.type == 'Modal') {
      return Navigator.SceneConfigs.FadeAndroid;
    }
    if(route.type == 'Blend') {
      return Navigator.SceneConfigs.FadeAndroid;
    }
    if(route.type == 'VerticalUpSwipeJump')
    {
      return Navigator.SceneConfigs.VerticalUpSwipeJump;
    }
    if(route.type == 'HorizontalSwipeJump'){
      return Navigator.SceneConfigs.FadeAndroid
    }
    if(route.type == 'FadeAndroid'){
      return Navigator.SceneConfigs.FadeAndroid
    }

    return Navigator.SceneConfigs.FloatFromBottom;
  }




  render() {
    return (
        <Navigator
          ref="nav"
          style={styles.container}
          initialRoute={false?{name:'tab'}:{name:'signin'}}
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
