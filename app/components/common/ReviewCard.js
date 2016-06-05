import React, {
  Text,
  Component,
  ListContainer,
  TextInput,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';

const StyleSheet = require('F8StyleSheet');
import moment from 'moment';
import Touchable from '../common/Touchable';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import ItemList from '../common/ItemList';
import Button from '../common/button';
import AppConfig from './AppConfig';
import { SegmentedControls } from 'react-native-radio-buttons'
var { width, height } = Dimensions.get('window');



export default class ReviewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getStarRating () {
    return(
     <View>
      <Text style={{fontSize:11, fontWeight:'300'}}>How satisfied are you with your purchase?</Text>
      <View style={{width:100, borderWidth:0}}>
        <StarRating
        disabled={false}
        emptyStar={'ios-star-outline'}
        fullStar={'ios-star'}
        halfStar={'ios-star-half'}
        iconSet={'Ionicons'}
        maxStars={5}
        rating={1}
        selectedStar={() => null}
        starColor={AppConfig.themeStarColor()}
        starSize={20}
      />
    </View>



    </View>
    );
  }

  getRewardCoin(amount, currency) {
    var currencySymbol = null;
    if(currency==='cent'){
      currencySymbol='¢';
    }
    if(currency==='dollar'){
      currencySymbol='$';
    }
    this.anim = new Animated.Value(0);

    var animateFlip = this.anim.interpolate({
      inputRange: [0,1],
      outputRange: ['0deg','720deg'],
    });

    var animateY = this.anim.interpolate({
      inputRange: [0,1],
      outputRange: [0, (height+10)],

    });
    return(


      <Animated.View style={[styles.rewardCoin, {transform:[
        {skewY: animateFlip}, {translateY: animateY}
      ]}]}>

        <Text style={styles.rewardAmount}>{amount}</Text>
        <Text style={styles.rewardCurrency}>{currencySymbol}</Text>

      </Animated.View>

    );
  }

  getDetails (items){
      if (items && items.length > 0){
        return (
          <View>
          <Text style={{marginBottom:5, fontSize:11, fontWeight:'300' }}>Details</Text>

          <ItemList itemPress={this.props.itemPress} items={items} {...this.props}/>

          </View>
        );
      }
      return null;

  }

  onSubmitPress(){
    Animated.spring(this.anim,{
      toValue:1,
      tension:0,
      friction:15,
    }).start();
  }

  render() {
    //console.log("im in RCard render");
    let placeName = this.props.data[this.props.index].name;
    let address = this.props.data[this.props.index].address;
    let time = moment.unix(this.props.data[this.props.index].time).format("MM/DD/YYYY HH:mm A");
    let amount = this.props.data[this.props.index].amount;
    let items = this.props.data[this.props.index].order_details;
    let question = "How likely will you recommend this restaurant?"

    let title = (
      <View>
        <TouchableOpacity onPress={this.props.titlePress}>
          <Text style={styles.titleText}>{placeName}</Text>
        </TouchableOpacity>
        <Text style={{color:'black', }}>{address}</Text>
        <Text style={{color:'black', fontSize:11, marginTop: 5, fontWeight:'300'}}>{time}</Text>
      </View>
    );

    return(
      <View style={styles.container}>


        <View style={styles.offerContainer}>
           <View style={styles.titleContainer}>
            {title}
           </View>
           <View style={styles.rewardContainer}>
            {this.getRewardCoin(95,'cent')}
           </View>
        </View>

        <View style={{flexDirection:'row', alignItems:'flex-start', paddingHorizontal:15, paddingTop:15, borderWidth:0}}>
          <View style={{flex:1,flexDirection:'row', alignItems:'center', borderWidth:0}}>
            <Icon style={{padding:2}} name="dollar" size={13} color={AppConfig.themeTextColor()}/>
            <Text style={{alignSelf:'center', fontSize:25, fontWeight:'normal', color:AppConfig.themeTextColor()}}>{amount}</Text>
          </View>
          <View style={{flex:3, alignItems:'flex-end', borderWidth:0,}}>
            {this.getStarRating()}
          </View>
        </View>

        <View style={{margin:15, borderBottomWidth:0.5, borderBottomColor: 'lightgray'}}>
        {this.getDetails(items)}
        </View>
        <View style={{marginHorizontal:15}}>
        <Text style={{marginBottom:20, borderWidth:0, alignSelf:'center'}}>{question}</Text>
        <SegmentedControls
          containerBorderRadius={2}
          tint={AppConfig.themeStarColor()}
          containerBorderWidth={0}
          options={ ['Yes','No','Maybe'] }
          onSelection={()=>null }
          selectedOption={ () => null }
        />
        </View>
        <View style={{padding:15, alignItems:'center'}}>
        <TouchableOpacity>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            <Text style={{marginRight:7,alignSelf:'flex-start', borderWidth:0, color:AppConfig.themeTextColor()}}>Leave a comment</Text>
            <Icon style={{borderWidth:0, alignSelf:'center'}} name="edit" size={14} color={AppConfig.themeTextColor()} />
          </View>
        </TouchableOpacity>
        </View>

        <View style={{justifyContent:'center',alignItems:'center', marginTop:10}}>
          <Button  text="Submit" onPress={ () => {this.props.onSubmitPress.bind(this);this.onSubmitPress()}}/>
        </View>

    </View>
    );
  }
}

styles = StyleSheet.create({

  container: {
    flex:5,
    borderRadius: 5,
    //margin:20,
    marginTop: 50,
    marginBottom:7,
    marginHorizontal:3.5,
    backgroundColor: AppConfig.themeBackgroundColor(),
    //borderWidth:1
  },

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

  rewardCoin: { margin: 0, padding:0, backgroundColor: 'gold', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth:0, borderRadius:30 , height:60, width:60},
  rewardCurrency: {alignSelf:'flex-end',fontWeight: 'bold', color: 'gray', marginBottom:18, paddingHorizontal:0 },
  rewardAmount: {fontSize: 25,fontWeight: 'bold', color: 'gray', },
  offerContainer: {
    flexDirection:'row', padding:15, borderWidth:0,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    borderRadius: 5,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  titleContainer: {flex:3, alignItems:'flex-start', justifyContent:'flex-start', padding:0 ,borderWidth:0},
  rewardContainer: {flex:1, alignItems:'flex-end', borderWidth:0, shadowRadius:50, shadowColor:'gray', padding:0,},

  titleText: {
    fontSize:25, fontWeight:'400', color:AppConfig.themeTextColor(), borderWidth:0,
  },

  reviews: {
    borderWidth:0, alignItems: 'center', flexDirection:'row', justifyContent:'center', marginBottom:0
  },

  totalAmount: {
    flexDirection:'row', alignItems:'center', padding:15, margin:0
  },


});
