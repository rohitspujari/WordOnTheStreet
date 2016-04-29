import React, {
  StyleSheet,
  Component,
  Text,
  TabBarIOS,
  Navigator,
  View
} from 'react-native';

var Search = require('./search.ios');
var Reviews = require('./reviews.ios');
var Cash = require('./cash.ios');


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

  render() {
    return (
      <View>
      <Text>I am Tab View</Text>
      </View>
    );
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
      title="Reviews"
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


    );
  }
};

var Styles = StyleSheet.create({
  container: {
    flex: 1
  }

});

module.exports = Tab;
