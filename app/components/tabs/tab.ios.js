import React, {
  StyleSheet,
  Component,
  Text,
  TabBarIOS,
  Navigator,
  View,
  StatusBar
} from 'react-native';

import Reviews from './reviews.ios';
import  Search from './search.ios';
//var Reviews = require('./reviews.ios');
import Cash from './cash.ios';
var Example = require('../common/modal')
var ExampleMaps = require('../../examples/EventListner')


// var Tab = React.createClass({
//   render: function(){
//     return <View style={Styles.container}>
//     <Text>Hello Tab</Text>
//     </View>
//   }
// });
class Tab extends Component {

  constructor(props){
    super(props);
    this.state ={
      selectedTab: 'reviews'
    };

  }

  switchTab(){
    console.log('switching tabs');
  }

  render() {
    return (
      <TabBarIOS selectedTab={this.state.selectedTab}>
      <TabBarIOS.Item
      selected={this.state.selectedTab ==='search'}
      systemIcon='search'
      title='search'
      onPress={()=> {
        this.setState({
          selectedTab: 'search'
        });
      }}>
      <Search/>
      </TabBarIOS.Item>

      <TabBarIOS.Item
      title="Reviews"
      selected={this.state.selectedTab ==='reviews'}
      systemIcon='featured'
      onPress={()=> {
        this.setState({
          selectedTab: 'reviews'
        });
      }}>
      <Reviews switchTab={this.swtitchTab} {...this.props} />
      </TabBarIOS.Item>

      <TabBarIOS.Item
      selected={this.state.selectedTab ==='cash'}
      systemIcon='contacts'
      onPress={()=> {
        this.setState({
          selectedTab: 'cash'
        });
      }}>
      <Cash/>
      </TabBarIOS.Item>
      </TabBarIOS>




    );
  }
};

var Styles = StyleSheet.create({
  container: {

    flex: 1
  }

});

module.exports = Tab;
