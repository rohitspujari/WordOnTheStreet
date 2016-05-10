import React, {
 StyleSheet,
 Text,
 TouchableHighlight,
 View
} from 'react-native';

var Button = React.createClass({
  render: function(){
    return <TouchableHighlight underlayColor='gray'
    onPress={this.props.onPress}
    style={Styles.button}>
    <Text style={Styles.buttonText}>{this.props.text}</Text>
    </TouchableHighlight>
  }
});

var Styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    //borderRadius: 5,
    padding: 15,
    borderColor: 'black',
    margin:10,
    width: 280,
    backgroundColor:'#dce79e'

  },
  buttonText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 15
  }
});

module.exports = Button;
