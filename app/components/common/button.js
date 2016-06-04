import React, {
 StyleSheet,
 Text,
 TouchableHighlight,
 View,
 Platform,
 ActivityIndicatorIOS,
} from 'react-native';

import GenericButton from 'react-native-button';
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
        content= (<GenericButton containerStyle={Styles.inlineButton}
                       style={Styles.buttonText}
                       onPress={this.props.onPress}>
        {this.props.text}
      </GenericButton>)
        break;

      case 'navBar':
        buttonStyle = Styles.navButton;
        content = <Icon name={this.props.icon} size={15} color={AppConfig.themeTextColor()} />;
        break;
      case 'search':
        buttonStyle = Styles.searchButton;
        content = (
          <View style={{flexDirection:'row', alignItems:'center'}}>
            {this.props.showProgress===true?this.getLoader():<Text style={Styles.buttonText}>{this.props.text}</Text>}
          </View>
        );
        break;

      default:
        buttonStyle = Styles.button;
        content = <Text style={Styles.buttonText}>{this.props.text}</Text>;
    }


    if(this.props.type === 'inline'){
      return content;
    }



    return (

      <TouchableHighlight underlayColor={AppConfig.themeColor()} onPress={this.props.onPress}>
        <View style={[buttonStyle, (this.props.width?{width:this.props.width}:null)]}>
          {content}
        </View>
      </TouchableHighlight>
      );
    },

    getLoader() {
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

    },

  });

var Styles = StyleSheet.create({
  button: {
    flex:1,
    borderWidth:0,
    borderColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    padding: 10,
    width: 300,
  },

  inlineButton: {
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1,
    borderRadius: 5,
    marginHorizontal:2,
    overflow:'hidden',
  //width: 100,
    padding:5,
    paddingHorizontal:15,
    backgroundColor:'#dce79e'
    //height:40
  },

  navButton: {
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth:1,
    paddingLeft:20,
    paddingRight:20,

    //backgroundColor:'#f6f7f8'
  },

  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth:1,
    paddingLeft:20,
    paddingRight:20,

    //backgroundColor:'#f6f7f8'
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
    backgroundColor: AppConfig.themeBackgroundColor()

  },


});

module.exports = Button;
