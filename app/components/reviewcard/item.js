import React, {
  StyleSheet,
  Text,
  View,
  TextInput,
  Component
} from 'react-native';

import StarRating from 'react-native-star-rating';

var Item = React.createClass({
  onStarRatingPress: function(){

  },
  render:function(){
    return(
      <View style={styles.name}>
        <Text>{this.props.itemName}</Text>
        <StarRating
         disabled={false}
         emptyStar={'ios-star-outline'}
         fullStar={'ios-star'}
         halfStar={'ios-star-half'}
         iconSet={'Ionicons'}
         maxStars={5}
         rating={0}
         selectedStar={(rating) => this.onStarRatingPress(rating)}
         starColor={'gray'}/>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  name:{
    flex: 1
  }
});

module.exports= Item;
