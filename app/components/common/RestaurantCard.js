import React, {
  Text,
  Component,
  ListContainer,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';

const StyleSheet = require('F8StyleSheet');
import Touchable from '../common/Touchable';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import ItemList from '../common/ItemList';
import Button from '../common/button';
import AppConfig from './AppConfig';


export default class RestaurantCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    //console.log("im in RCard render");
    return(
      <View key={this.props.key} style={styles.card}>

        <View style={styles.info}>
          <TouchableOpacity onPress={this.props.titleClick}>
            <Text style={styles.titleText}>{this.props.data[this.props.index].name}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.reviews}>
          <StarRating disabled={true}
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            halfStar={'ios-star-half'}
            iconSet={'Ionicons'}
            maxStars={5}
            rating={4}
            selectedStar={(rating) => {
              return null;
            }}
            starColor={AppConfig.themeColor()}
            starSize={15}
          />
          <Touchable onPress={this.props.reviewsPress}>
          <Text style={{fontSize:13, fontWeight: 'bold',color:AppConfig.themeTextColor()}}>{' (54)'}</Text>
          </Touchable>
        </View>

        <View style={styles.totalAmount}>
          <Icon name="dollar" size={15} color={AppConfig.themeTextColor()}/>
          <Text style={{alignSelf:'center', fontSize:25, color:AppConfig.themeTextColor()}}>{" "+this.props.data[this.props.index].amount}</Text>
        </View>
        <View style={{borderWidth:0}}>
          <ItemList itemPress={this.props.itemPress} items={this.props.data[this.props.index].order_details} {...this.props}/>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-around', padding:20, marginTop:0}}>
          <View style={{alignItems:'center'}}>
            <Button type="round" icon="bicycle" onPress={()=> null}/>
            <Text style={{color:AppConfig.themeTextColor(), marginTop:10}}>Delivery</Text>
          </View>
          <View style={{alignItems:'center',}}>
            <Button type="round" icon="cutlery" onPress={()=> null}/>
            <Text style={{color:AppConfig.themeTextColor(), marginTop:10}}>Dine In</Text>
          </View>
        </View>
        <View style={{justifyContent:'center',alignItems:'center', marginTop:0}}>
          <Button  text="Submit" onPress={this.props.onSubmitPress}/>
        </View>
    </View>
    );
  }
}

styles = StyleSheet.create({
  info: {
    ios: {
      alignSelf: 'center',
      backgroundColor: 'white',
      marginTop:20,
      marginBottom:0,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 2,
      marginHorizontal: 3,
      backgroundColor: 'white'
    }
  },

  titleText: {
    fontSize:25,fontWeight:'bold', color:AppConfig.themeTextColor(), borderWidth:0,
  },

  reviews: {
    borderWidth:0, alignItems: 'center', flexDirection:'row', justifyContent:'center', marginBottom:0
  },

  totalAmount: {
    flexDirection:'row', alignItems:'center', padding:10, margin:20
  },

  card: {
    ios: {
      flex:5,
      borderRadius: 5,
      //margin:20,
      marginTop: 0,
      marginBottom:7,
      marginHorizontal:3.5,
      backgroundColor: 'white',
      borderWidth:0
    }
  }
});
