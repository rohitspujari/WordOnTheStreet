'use strict';

var React = require('react-native');
var Itemlist = require('./itemlist');
var {

  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableHighlight,
  ScrollView
} = React;

var ViewPager = require('react-native-viewpager');
//var ViewPager = require('./ViewPager');
var deviceWidth = Dimensions.get('window').width;

var IMGS = [
  'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
  'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
  'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',
  'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
  'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
  'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
  'https://images.unsplash.com/photo-1440847899694-90043f91c7f9?h=1024'
];

var PageList = React.createClass({
  getInitialState: function() {
    var dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });

    return {
      dataSource: dataSource.cloneWithPages(IMGS),
    };
  },

  border: function(color){
    return {
      //borderColor: color,
      //borderWidth: 4
    }
  },
  render: function() {
    return (

      <ViewPager
        style={this.props.style}
        dataSource={this.state.dataSource}
        renderPage={this._renderPage}
        isLoop={true}
        autoPlay={false}>
      </ViewPager>

    );
  },


  onPress: function(){

  },
  _renderPage: function(
    data: Object,
    pageID: number | string,) {
    return (
      <View style={[styles.container,this.border('red')]}>
      <View style={[styles.info, this.border('yellow')]}>
      <Image
        source={{uri: data}}
        style={{flex:1}} />
      </View>
      <View style={[styles.items,this.border('green')]}>
        <Itemlist />
      </View>
      <View style={[styles.comments,this.border('purple')]}>
      <TextInput placeholder='Comments'
      autofocus={true}
      onChangeText={(text)=>this.setState({password: text})}
      style={{

        alignItems:'flex-start',
        justifyContent:'flex-end',
        flex: 1
      }}/>
      </View>
      <View style={[styles.submit,this.border('blue')]}>
      <TouchableHighlight
      underlayColor="gray"
      onPress={this.onPress}>
      <Text style={styles.buttonText}>
      Post Review
      </Text>
      </TouchableHighlight>
      </View>

      </View>

    );
  },
});

var styles = StyleSheet.create({
  info:{
    flex: 4
  },
  items:{
    flex: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  comments:{
    flex:2,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#F5FCFF'
  },
  submit:{
    flex:2,
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'gray'


  },
  buttonText:{
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 20

  },
  container:{
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'stretch'
  }
});

module.exports = PageList;
