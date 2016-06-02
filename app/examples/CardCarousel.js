'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var Carousel = require('react-native-carousel');

var CardCarousel = React.createClass({
  render: function() {
    return (
      <Carousel
      width={375}
      animate={false}
      loop={false}
      >
        <View style={styles.container1}>
          <Text>Page 1</Text>
        </View>
        <View style={styles.container}>
          <Text>Page 2</Text>
        </View>
        <View style={styles.container}>
          <Text>Page 3</Text>
        </View>
        <View style={styles.container}>
          <Text>Page 4</Text>
        </View>
        <View style={styles.container}>
          <Text>Page 5</Text>
        </View>
        <View style={styles.container}>
          <Text>Page 6</Text>
        </View>
      </Carousel>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    width: 375,
    flex: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },

});

module.exports = CardCarousel;
