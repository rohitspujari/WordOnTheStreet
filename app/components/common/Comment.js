import React, {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';


var window  = require('Dimensions').get('window');

class Comment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3
    };
  }

  render() {
    return(
   <View style={[styles.container,styles.modal3]}>
    <Text>I am comment</Text>
   </View>
  );
  }

}


var styles = StyleSheet.create({

  container: {
    //flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  modal2: {
    height: 230,
    backgroundColor: "#3B5998"
  },

  modal3: {
    margin:50,

  },

  modal4: {
    height: 300
  },

  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },

  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },

  text: {
    color: "black",
    fontSize: 22
  }

});

module.exports = Comment;
