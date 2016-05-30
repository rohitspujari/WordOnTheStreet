
import React, {
  Component,
  StyleSheet,
  View,
  Text,
} from 'react-native';

export default class ActivityProgress extends Component {
  render() {

    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicatorIOS
            animating={true}
            size="small" />
      </View>
    )

  }
}
