import React, {
  StyleSheet,
  Component,
  View,
  Text,
  Image

} from 'react-native';

import Button from '../common/button';
import AppConfig from '../common/AppConfig';
import StarRating from 'react-native-star-rating';

export default class PlaceCell extends Component {

  getRating(rating){
    return (
      starRating = <StarRating
      disabled={true}
      emptyStar={'ios-star-outline'}
      fullStar={'ios-star'}
      halfStar={'ios-star-half'}
      iconSet={'Ionicons'}
      maxStars={5}
      rating={rating}
      selectedStar={(rating) => null}
      starColor={AppConfig.themeColor()}
      starSize={15}
    />);
  }

  render() {

    //console.log(this.props.place)
    return(
      <View style={styles.container}>
       <View style={{flexDirection:'row'}}>
        <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={{uri:this.props.place.icon }}
        />
        </View>
        <View style={styles.detailsContainer}>
          <View style={{width:10}}>
            {this.getRating(this.props.place.rating)}
          </View>
          <Text style={styles.nameText}>{this.props.place.name}</Text>
          <Text style={styles.addressText}>{this.props.place.vicinity}</Text>

            <Button type="inline" text="Directions" onPress={()=> null}/>
          

        </View>
       </View>


      </View>

    );
  }
}


var styles = StyleSheet.create({
  container:{
    flex:1,
    margin:5,
    borderBottomColor:'olivedrab',
    //borderBottomWidth:,
    padding:5
  },
  nameText:{
    fontSize:15,
    fontWeight:'bold'
  },
  addressText:{
    color:'gray'
  },
  logoContainer:{
    flex:1,
    //borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center'

  },
  detailsContainer: {
    //borderWidth:1,
    flex:5,
    marginLeft:10

  },
  logo:{
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
    //marginRight: 10,
  }
});
