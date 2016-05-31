import React, {
  StyleSheet,
  Component,
  View,
  Text,
  Image,
  Linking

} from 'react-native';

//import Button from '../common/button';
import Button from 'react-native-button';
import AppConfig from '../common/AppConfig';
import StarRating from 'react-native-star-rating';

export default class PlaceCell extends Component {

  onAddressPress(){
    Linking.openURL('geo:37.484847,-122.148386');
  }

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
            {this.props.place.rating?this.getRating(this.props.place.rating):null}
          </View>
          <Text style={styles.nameText}>{this.props.place.name}</Text>
          <Button containerStyle={{overflow:'hidden', borderRadius:4, backgroundColor: 'white' }}
                  style={styles.addressText}
                  onPress={this.onAddressPress}
                  >

            {this.props.place.vicinity}
          </Button>


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
    borderBottomColor:'lightgray',
    borderBottomWidth:1,
    padding:5
  },
  nameText:{
    fontSize:15,
    fontWeight:'bold'
  },
  addressText:{
    color:'gray',
    fontSize:13,
    textAlign: 'left',
    fontWeight: 'normal',
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
    flex:8,
    marginLeft:10

  },
  logo:{
    width: 25,
    height: 25,
    backgroundColor: 'transparent',
    //marginRight: 10,
  }
});
