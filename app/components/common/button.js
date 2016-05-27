import React, {
 StyleSheet,
 Text,
 TouchableHighlight,
 View
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import AppConfig from './AppConfig';

var Button = React.createClass({
  render: function(){

    let buttonStyle = null;
    var content = <Text>Nothing!!</Text>;

    switch(this.props.type) {
      case 'round':
        buttonStyle = Styles.roundButton;
        content = <Icon name={this.props.icon} size={30} color={AppConfig.themeTextColor()} />;
        break;

      case 'inline':
        buttonStyle = Styles.inlineButton;
        content = <Text style={Styles.buttonText}>{this.props.text}</Text>;
        break;

      default:
        buttonStyle = Styles.button;
        content = <Text style={Styles.buttonText}>{this.props.text}</Text>;
    }



  return (
      <TouchableHighlight underlayColor={AppConfig.themeColor()}
        onPress={this.props.onPress}
        style={buttonStyle}>
        <View>
          {content}
        </View>
      </TouchableHighlight>);
    }
  });

var Styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 5,
    padding: 15,
    borderColor: 'black',
    margin:10,
    width: 280,
    backgroundColor:'#f6f7f8'

  },

  inlineButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 5,
    width: 100,
    padding:5,
    height:40
  },

  roundButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    height:70,
    width:70,
    borderRadius: 35,
    padding: 15,
    borderColor: 'black',
    backgroundColor:'#f6f7f8'

  },

  buttonText: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
    fontWeight: '500',

    color:AppConfig.themeTextColor(),
  }
});

module.exports = Button;
