import React, {
  Text,
  Component,
  ListContainer,
  TextInput,
  View
} from 'react-native';

const StyleSheet = require('F8StyleSheet');
import Touchable from '../common/Touchable';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import ItemList from '../common/ItemList';
import Button from '../common/button';


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
          <Touchable onPress={this.props.titleClick}>
            <Text style={styles.titleText}>{this.props.data[this.props.index].name}</Text>
          </Touchable>
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
            starColor={'#b2cb53'}
            starSize={15}
          />
          <Touchable onPress={this.props.reviewsPress}>
          <Text style={{fontSize:13, fontWeight: 'bold',color:'#34495e'}}>{' (54)'}</Text>
          </Touchable>
        </View>

        <View style={styles.totalAmount}>
          <Icon name="dollar" size={15} color="#34495e"/>
          <Text style={{alignSelf:'center', fontSize:25, color:"#34495e"}}>{" "+this.props.data[this.props.index].amount}</Text>
        </View>
        <View style={{borderWidth:0}}>
          <ItemList itemPress={this.props.itemPress} items={this.props.data[this.props.index].order_details} {...this.props}/>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-around', padding:20, marginTop:0}}>
          <View style={{alignItems:'center'}}>
            <Button type="round" icon="bicycle" onPress={()=> null}/>
            <Text style={{color:'#34495e', marginTop:10}}>Delivery</Text>
          </View>
          <View style={{alignItems:'center',}}>
            <Button type="round" icon="cutlery" onPress={()=> null}/>
            <Text style={{color:'#34495e', marginTop:10}}>Dine In</Text>
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
      marginBottom:10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 2,
      marginHorizontal: 3,
      backgroundColor: 'white'
    }
  },

  titleText: {
    fontSize:25,fontWeight:'bold', color:'#34495e', borderWidth:0,
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
      marginTop:30,
      marginBottom:22,
      borderRadius: 5,
      marginHorizontal: 3,
      backgroundColor: 'white',
      borderWidth:0
    }
  }
});
