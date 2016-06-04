import React, {
  StyleSheet,
  Text,
  View,
  Component,
  TouchableOpacity
} from 'react-native';

import StarRating from 'react-native-star-rating';
import Touchable from '../common/Touchable';
import AppConfig from '../common/AppConfig';

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
      starColor={AppConfig.themeColor()}
      starSize={25}
    />;

    return(
      <View style={styles.container}>
        <View style={styles.container_itemReview}>
          <View style={styles.name}>
            <TouchableOpacity onPress={this.props.itemPress.bind(this,this.props)}>
              <Text style={styles.nameText}>{this.props.itemName}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.price}>
          <Text style={{fontWeight:'300'}}>5.743</Text>
          </View>

        </View>
       </View>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    flex:1,
    borderWidth:0,
    paddingBottom:6
  },
  container_itemReview:{
    flex: 1,
    flexDirection: 'row',

    //borderWidth:1,
    //borderColor:'red'
  },
  name:{
    flex:6,
    alignItems: 'flex-start',
    borderWidth:0,
    //borderColor:'red'
  },

  price:{flex:1, borderWidth:0, alignItems:'flex-end'},
  nameText:{

    fontWeight:'normal',
    color:AppConfig.themeTextColor()
  },
  rating:{
    flex:1,
    alignItems: 'flex-end',
    borderWidth:0,
    //borderColor:'blue'
  },
});
