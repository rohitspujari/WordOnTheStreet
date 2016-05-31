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
import Icon from 'react-native-vector-icons/FontAwesome';
import Drawer from 'react-native-drawer'
//var Reviews = require('./reviews.ios');
import Cash from './cash.ios';
var Example = require('../common/modal')
var ExampleMaps = require('../../examples/DisplayLatLng')


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
      selectedTab: 'search'
    };

  }

  switchTab(){
    console.log('switching tabs');
  }

  render() {




    return (


      <TabBarIOS selectedTab={this.state.selectedTab}>
        <Icon.TabBarItemIOS
        selected={this.state.selectedTab ==='search'}
        iconName='search'
        title='search'
        onPress={()=> {
          this.setState({
            selectedTab: 'search'
          });
        }}>
        <Search {...this.props}/>
        </Icon.TabBarItemIOS>

        <Icon.TabBarItemIOS
        title="Review"
        selected={this.state.selectedTab ==='reviews'}
        iconName='tags'
        onPress={()=> {
          this.setState({
            selectedTab: 'reviews'
          });
        }}>
        <Reviews switchTab={this.swtitchTab} {...this.props} />
        </Icon.TabBarItemIOS>

        <Icon.TabBarItemIOS
        selected={this.state.selectedTab ==='cash'}
        title="Cash"
        iconName="money"
        onPress={()=> {
          this.setState({
            selectedTab: 'cash'
          });
        }}>
        <ExampleMaps/>
        </Icon.TabBarItemIOS>
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
