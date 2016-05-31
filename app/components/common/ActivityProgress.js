
import React, {
  Component,
  StyleSheet,
  View,
  Text,
  Platform,
  ActivityIndicatorIOS
} from 'react-native';

export default class ActivityProgress extends Component {
  render() {

    let content = null
    if (Platform.OS === 'android') {
      content = (
        <ProgressBarAndroid
          styleAttr="Inverse"
        />
      );
    }
    else {
      content = (
        <ActivityIndicatorIOS
          animating={true}
          size="small"
        />
      );
    }

    return(
      <View>
      {content}
      </View>
    );

  }
}
