/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TabBarIOS,
  NavigatorIOS,
  View
} from 'react-native';

// var Search = require('./app/tabs/search.ios');
// var Reviews = require('./app/tabs/reviews.ios');
//var Cash = require('./app/tabs/cash.ios');
var Main = require('./app/main');


class WordOnTheStreet extends Component {

  constructor(props){
    super(props);
    this.state ={
      selectedTab: 'reviews'
    };
  }
  render() {
    return (



      <TabBarIOS selectedTab={this.state.selectedTab}>
      <TabBarIOS.Item
      selected={this.state.selectedTab ==='search'}
      systemIcon='search'
      onPress={()=> {
        this.setState({
          selectedTab: 'search'
        });
      }}>
      <Search />
      </TabBarIOS.Item>

      <TabBarIOS.Item
      selected={this.state.selectedTab ==='reviews'}
      systemIcon='featured'
      onPress={()=> {
        this.setState({
          selectedTab: 'reviews'
        });
      }}>

      <Reviews />

      </TabBarIOS.Item>

      <TabBarIOS.Item
      selected={this.state.selectedTab ==='cash'}
      systemIcon='contacts'
      onPress={()=> {
        this.setState({
          selectedTab: 'cash'
        });
      }}>
      <Cash />
      </TabBarIOS.Item>
      </TabBarIOS>

      // <NavigatorIOS
      // style={styles.container}
      // initialRoute= {{
      //   title: 'Rohit',
      //   component: Main
      // }} />

      // <View style={styles.container}>
      //   <Text style={styles.welcome}>
      //     Welcome to React Native!
      //   </Text>
      //   <Text style={styles.instructions}>
      //     To get started, edit index.ios.js
      //   </Text>
      //   <Text style={styles.instructions}>
      //     Press Cmd+R to reload,{'\n'}
      //     Cmd+D or shake for dev menu
      //   </Text>
      // </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1
  }

});

AppRegistry.registerComponent('WordOnTheStreet', () => Main);
