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
      <View style={styles.container}>
        <View style={styles.name}>
        <Text>{this.props.itemName}</Text>
        </View>
        <View style={styles.rating}>
        <StarRating
         disabled={false}
         emptyStar={'ios-star-outline'}
         fullStar={'ios-star'}
         halfStar={'ios-star-half'}
         iconSet={'Ionicons'}
         maxStars={5}
         rating={0}
         selectedStar={(rating) => this.onStarRatingPress(rating)}
         starColor={'gray'}
         startSize={1}/>
         </View>
         <View style={styles.separator} />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  conainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'

  },
  name:{
    //flex:3,
    borderWidth:4,
    borderColor:'red'
  },
  rating:{
    flex:1,
    borderWidth:4,
    borderColor:'blue'
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
   }
});

module.exports= Item;
