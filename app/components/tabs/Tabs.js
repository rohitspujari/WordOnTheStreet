import React, {
  StyleSheet,
  Component,
  Text,
  TabBarIOS,
  Navigator,
  View,
  StatusBar
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Drawer from 'react-native-drawer'

import Reviews from './ReviewTab/Reviews';
import Search from './SearchTab/Search';
import Wallet from './WalletTab/Wallet';
import ExampleMaps from '../../examples/LinearGradientExample';



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
        <Icon.TabBarItemIOS
        selected={this.state.selectedTab ==='search'}
        iconName='search'
        title='Search'
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
        selected={this.state.selectedTab ==='wallet'}
        title="Wallet"
        iconName="money"
        onPress={()=> {
          this.setState({
            selectedTab: 'wallet'
          });
        }}>
        <Wallet {...this.props} />
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
