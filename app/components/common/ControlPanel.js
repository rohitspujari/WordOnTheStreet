import React, {
  Component,
  View,
  StyleSheet,
  Text,
  StatusBar,

} from 'react-native';

import Touchable from './Touchable';

import store from 'react-native-simple-store';


export default class ControlPanel extends Component {
  render() {

    //console.log(this);
    return (
      <View style={styles.container}>

        <View style={styles.body}>
          <Text style={styles.text}>Payment</Text>
            <Text style={styles.text}>History</Text>
              <Text style={styles.text}>Help</Text>
                <Text style={styles.text}>Notifications</Text>
                <Touchable onPress={()=> this.logout()}>
                  <Text style={styles.text}>Logout</Text>
                </Touchable>
                <Text style={styles.text}>Analytics</Text>
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
    backgroundColor:'white',
    marginTop:20
  },
  body:{
    justifyContent:'center',
    margin:10
  },
  text :{
    margin:10
  },
  seperator:{
    borderWidth:1,
    borderColor:'red'
  }
});
