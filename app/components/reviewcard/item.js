import React, {
  StyleSheet,
  Text,
  View,
  TextInput,
  Component
} from 'react-native';

import StarRating from 'react-native-star-rating';
import Touchable from '../common/Touchable';


class Item extends Component{

  constructor(props){
    super(props);



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
      starColor={'gray'}
      starSize={25}
    />;





    return(
      <View style={styles.container}>
        <View style={styles.container_itemReview}>
          <View style={styles.name}>
            <Touchable onPress={this.props.onPress}>
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
    padding:5
    //borderWidth:1,
    //borderColor: 'green'
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
    alignSelf: 'center',
    //borderWidth:1,
    //borderColor:'red'
  },
  nameText:{
    fontSize: 16,
    fontWeight:'300',

  },
  rating:{
    flex:1,
    alignItems: 'flex-end',
    //borderWidth:1,
    //borderColor:'blue'
  },

});

module.exports= Item;
