import React, {
  StyleSheet,
  Component,
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity

} from 'react-native';

import AppConfig from '../common/AppConfig';
import NavigationBar from 'react-native-navbar';
import ActivityProgress from './ActivityProgress';
import Button from '../common/button';

export default class PlaceDetails extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <NavigationBar
          statusBar={{hidden:false}}
          tintColor= {AppConfig.themeColor()}
          leftButton={<Button type="navBar" icon="chevron-left" onPress={() => this.props.navigator.pop()}/>}
          title={{
            tintColor: AppConfig.themeTextColor(),
            title: 'Place Detail',
          }}
        />
        <Text>Hello</Text>
      </View>
    );
  }
}
