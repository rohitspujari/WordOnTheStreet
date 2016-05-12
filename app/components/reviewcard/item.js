import React, {
  StyleSheet,
  Text,
  View,
  Component
} from 'react-native';

import StarRating from 'react-native-star-rating';
import Touchable from '../common/Touchable';

export default class Item extends Component{

  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3
    }
  }
  onStarRatingPress(){

  }
  render(){
    var starRating = <StarRating
      disabled={false}
      emptyStar={'ios-star-outline'}
      fullStar={'ios-star'}
      halfStar={'ios-star-half'}
      iconSet={'Ionicons'}
      maxStars={5}
      rating={0}
      selectedStar={(rating) => this.onStarRatingPress(rating)}
      starColor={'#b2cb53'}
      starSize={25}
    />;

    return(
      <View style={styles.container}>
        <View style={styles.container_itemReview}>
          <View style={styles.name}>
            <Touchable onPress={this.props.itemPress}>
              <Text style={styles.nameText}>{this.props.itemName}</Text>
            </Touchable>
          </View>
          <View style={styles.rating}>
            {starRating}
          </View>
        </View>
       </View>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    flex:1,
    paddingLeft:20,
    paddingRight:20,
    borderWidth:0,
  },
  container_itemReview:{
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    //borderWidth:1,
    //borderColor:'red'
  },
  name:{
    flex:1,
    alignItems: 'flex-start',
    alignSelf: 'center',
    borderWidth:0,
    //borderColor:'red'
  },
  nameText:{
    fontSize: 16,
    fontWeight:'500',
    color:'#34495e'
  },
  rating:{
    flex:1,
    alignItems: 'flex-end',
    borderWidth:0,
    //borderColor:'blue'
  },
});
