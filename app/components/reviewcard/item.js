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
      <View style={styles.container_itemReview}>
        <View style={styles.name}>
          <Text>{this.props.itemName.title}</Text>
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
            starSize={20}
          />
        </View>
      </View>
      <View style={styles.container_itemComment}>

      <TextInput
        placeholder='Comments'
        onChangeText={(text)=>this.setState({comment: text})}
        style={{
          alignItems:'center',
          justifyContent:'center',
          flex: 1,
          height:20,
          paddingLeft: 15,

          //borderWidth: 1,
          //borderColor: 'red',
          //backgroundColor:'#e6e7ea'
        }}/>
      </View>
     </View>
    );
  }
});

var styles = StyleSheet.create({
  container:{
    flex:1,
    padding:10,
    //borderWidth:1,
    //borderColor: 'green'
  },
  container_itemReview:{
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    //borderWidth:1,
    //borderColor:'red'

  },
  container_itemComment:{
    flex:1,
    paddingTop: 5,
    paddingBottom: 5,


    //borderWidth:1,
    //borderColor:'blue'
  },
  name:{
    flex:1,
    alignSelf: 'center',
    //borderWidth:1,
    //borderColor:'red'
  },
  rating:{
    flex:1,
    alignItems: 'flex-end',
    //borderWidth:1,
    //borderColor:'blue'
  },

});

module.exports= Item;
