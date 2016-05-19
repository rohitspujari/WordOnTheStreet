import React, {
  StyleSheet,
  Component,
  Text,
  TabBarIOS,
  Navigator,
  View
} from 'react-native';

import Reviews from './reviews.ios';
var Search = require('./search.ios');
//var Reviews = require('./reviews.ios');
var Cash = require('./cash.ios');
var Example = require('../common/modal')


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
      <Example />
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
