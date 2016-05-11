import React, {
 StyleSheet,
 Text,
 TouchableHighlight,
 View
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

var Button = React.createClass({
  render: function(){

    var content = <Text>Nothing!!</Text>;
    if(this.props.type ==='round'){
      content = <Icon name={this.props.icon} size={30} color="#34495e" />;
    }
    else {
      content = <Text style={Styles.buttonText}>{this.props.text}</Text>;
    }

    var text = <Text style={Styles.buttonText}>{this.props.text}</Text>;

    return (<TouchableHighlight underlayColor='#b2cb53'
    onPress={this.props.onPress}
    style={this.props.type === 'round'? Styles.roundButton : Styles.button}>
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

    color:'#34495e',
  }
});

module.exports = Button;
