import React, {
  Text,
  Component,
  ListContainer,
  TextInput,
  View,
  TouchableOpacity,
  Animated,
  Alert,
  StyleSheet,
  Dimensions
} from 'react-native';
var { width, height } = Dimensions.get('window');

export default class PlayGround extends Component {
  constructor(props) {
    super(props);
  }

  onPress() {
    Animated.spring(this.anim,{
      toValue:1,
      tension:0,
      friction:15,
    }).start();
  }

  render() {

    this.anim = new Animated.Value(0);

    var animateFlip = this.anim.interpolate({
      inputRange: [0,1],
      outputRange: ['0deg','720deg'],
    });

    var animateY = this.anim.interpolate({
      inputRange: [0,1],
      outputRange: [0, (height+10)],

    });

    return(
      <View style={styles.container}>
        <Animated.View style={[styles.animationContainer,{transform:[
          {skewY: animateFlip}, {translateY: animateY}
        ]}]}>
          <Text style={{alignSelf: 'center', justifyContent: 'center', borderWidth:0}}>Hello</Text>
        </Animated.View>
        <TouchableOpacity style={{marginTop:70}} onPress={this.onPress.bind(this)}>
          <Text>Animate</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex:1
  },
  animationContainer: {
    position:'absolute',

    margin:40,
    height:100,
    width:100,
    borderRadius:50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'gold',
    shadowOpacity: 0.6,
    shadowRadius:5,
    shadowColor:'gold',
    //borderRadius: 5,
    shadowOffset: {
      height: 1,
      width: 1
    }
  }
});
