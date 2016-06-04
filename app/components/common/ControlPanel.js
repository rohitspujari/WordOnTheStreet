import React, {
  Component,
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity

} from 'react-native';

import Touchable from './Touchable';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppConfig from './AppConfig';

import store from 'react-native-simple-store';


export default class ControlPanel extends Component {


  getMenuItem(text, icon) {
    return (
      <View style={styles.menuItemContainer}>
        <View style={styles.menuIconContainer}>
          <Icon name={icon} size={16} color={AppConfig.themeTextColor()} />
        </View>
        <View style={styles.menuTextContainer}>
          <Text style={{color:AppConfig.themeTextColor()}}>{text}</Text>
        </View>
      </View>
    );
  }

  render() {

    //console.log(this);
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={{borderWidth:0, marginBottom:10, width:100, height: 100, borderRadius: 50, alignItems:'center', backgroundColor: 'lightgray'}}>
            <Icon style={{marginTop:15}} name="user" size={60} color={AppConfig.themeTextColor()} />
          </View>
          <Text>Rohit Pujari</Text>
          <Text>rohitspujari@gmail.com</Text>
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={()=> null}>
           {this.getMenuItem('Payment','credit-card')}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> null}>
           {this.getMenuItem('History','history')}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> null}>
           {this.getMenuItem('Help','question-circle')}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> null}>
           {this.getMenuItem('Notification','bell')}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.logout()}>
           {this.getMenuItem('Logout','sign-out')}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.logout()}>
           {this.getMenuItem('Analytics','line-chart')}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  logout() {



    store.get('username').then((username)=>{
      if(username) {
        store.delete(username).then(store.delete('username')).then(this.props.navigator.immediatelyResetRouteStack([{ name:'signin', type: 'Blend'}]));
      }
      else {
        this.props.navigator.immediatelyResetRouteStack([{ name:'signin', type: 'Blend'}])
      }
    });
    // store.delete('username').then((username) => store.delete(username).then(()=> {
    //   this.props.navigator.immediatelyResetRouteStack([{ name:'signin'}]);
    // }));

  }
}

var styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:AppConfig.themeBackgroundColor(),

  },
  menuContainer:{flex:2},
  profileContainer:{
    //borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    flex:1,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    borderRadius: 5,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  menuItemContainer: {flexDirection:'row', flex:1, alignItems:'center', justifyContent:'flex-start', padding:20, borderWidth:0},
  menuIconContainer: {flex:1, alignItems:'center', borderWidth:0},
  menuTextContainer: {flex:6, alignItems:'flex-start', borderWidth:0},

  // body:{
  //   justifyContent:'center',
  //   margin:10
  // },

  seperator:{
    borderWidth:1,
    borderColor:'red'
  }
});
