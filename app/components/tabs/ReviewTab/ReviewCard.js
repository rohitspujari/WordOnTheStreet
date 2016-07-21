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
import Touchable from '../../common/Touchable';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import ItemList from './ItemList';
import Button from 'react-native-button';
import AppConfig from '../../common/AppConfig';
import { SegmentedControls } from 'react-native-radio-buttons'
var { width, height } = Dimensions.get('window');
const firebaseUrl = 'https://wots.firebaseio.com/';



export default class ReviewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getPriceRating () {
    return(
       <View>
       <SegmentedControls
         containerBorderRadius={5}
         tint={AppConfig.themeColor()}
         backTint= {AppConfig.themeBackgroundColor()}
         onSelection={this.setSelectedPriceOption.bind(this)}
         separatorWidth={1}
         selectedOption={this.state.selectedPriceSegment}
         paddingTop={10}
         paddingBottom={5}
         containerBorderWidth={0}
         options={ ['$',
                    '$$',
                    '$$$'] }

         textAlign="center"
         containerStyle={{flex:0, height:40, width:170, alignSelf :'center',  borderWidth:0}}
         optionStyle={{fontWeight:'normal', marginTop: 0, color:'red'}}
       />
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
      return null
  }

  onSubmitPress(){

    Alert.alert("Hello")



  }

  submitReceipt(){
    //console.log('hello');
  }



  setSelectedPriceOption(selectedPriceSegment){
    let ref = new Firebase(firebaseUrl);
    let receiptID = this.props.receiptData[this.props.index].key
    ref.child('users/'+this.props.uid+'/receipts/'+receiptID+'/').child('price_experience').set(selectedPriceSegment, (err)=> {
      if(err){
        console.log('writing price_experience failed')
      }
      else{
        this.setState({selectedPriceSegment})
      }
    })
  }

  setSelectedExperienceOption(selectedExperienceSegment){

    let ref = new Firebase(firebaseUrl);
    let receiptID = this.props.receiptData[this.props.index].key
    ref.child('users/'+this.props.uid+'/receipts/'+receiptID+'/').child('customer_experience').set(selectedExperienceSegment, (err)=> {
      if(err){
        console.log('writing customer_experience failed')
      }
      else{
        this.setState({selectedExperienceSegment})
      }
    })
  }


  render() {
    //console.log("im in RCard render");

    let cardBackgroundColor = {
      backgroundColor: this.props.dimmed === true ? 'rgba(255,255,255, 0.5)' : AppConfig.themeBackgroundColor(),
    }
    let placeName = this.props.receiptData[this.props.index].data.name;
    let address = this.props.receiptData[this.props.index].data.address;
    let time = moment.unix(this.props.receiptData[this.props.index].data.time).format("MM/DD/YYYY HH:mm A");
    let amount = this.props.receiptData[this.props.index].data.amount;
    let items = this.props.receiptData[this.props.index].data.order_details;
    let question = "How was your experience?"

    let title = (
      <View>
        <TouchableOpacity onPress={this.props.titlePress}>
          <Text style={styles.titleText}>{placeName}</Text>
        </TouchableOpacity>
        <Text style={{color:'black', marginTop:10 }}>{address}</Text>
        <Text style={{color:'gray', marginTop: 10}}>{time}</Text>
      </View>
    );

    return(
      <View style={[styles.container]}>
        <View style={styles.offerContainer}>
           <View style={styles.titleContainer}>
            {title}
           </View>
           <View style={styles.rewardContainer}>
            {null}
           </View>
        </View>

        <View style={styles.pricePaidContainer}>
          <View style={{flex:1,flexDirection:'row', alignItems:'center', borderWidth:0}}>
            <Icon style={{padding:2}} name="dollar" size={13} color={AppConfig.themeTextColor()}/>
            <Text style={{alignSelf:'center', fontSize:25, fontWeight:'normal', color:AppConfig.themeTextColor()}}>{amount}</Text>
          </View>
          <View style={{flex:3, alignItems:'flex-end', borderWidth:0,}}>
            {this.getPriceRating()}
          </View>
        </View>

        <View style={styles.serviceDetailContainer}>
          {this.getDetails(items)}
        </View>


        <View style={styles.surveryContainer}>
          <Text style={{marginTop:10, marginBottom:15, borderWidth:0, alignSelf:'center'}}>{question}</Text>
          <SegmentedControls
            containerBorderRadius={5}
            tint={AppConfig.themeColor()}
            backTint= {AppConfig.themeBackgroundColor()}
            onSelection={(this.setSelectedExperienceOption.bind(this))}
            separatorWidth={0.5}
            selectedOption={this.state.selectedExperienceSegment}
            paddingTop={8}
            paddingBottom={5}
            containerBorderWidth={0}
            options={ ['Bad', 'Ok', 'Good']  }

            textAlign="center"

            containerStyle={{flex:0, height:40, width:170, alignSelf :'center', justifyContent:'center' , borderWidth:0, }}
            optionStyle={{fontWeight:'normal', marginTop: 3, color:'red'}}
          />
          <TouchableOpacity onPress={this.props.itemPress.bind(this,this.props)} style={{marginTop:15, alignItems:'center'}}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Text style={{marginRight:7,alignSelf:'flex-start', borderWidth:0, color:AppConfig.themeTextColor()}}>Let us know what you think!</Text>
              <Icon style={{borderWidth:0, alignSelf:'center'}} name="edit" size={14} color={'gray'} />
            </View>
          </TouchableOpacity>

          <View style={{justifyContent:'center',alignItems:'center', marginTop:30}}>
          <Button
            containerStyle={{padding:10, width: 170, height: 40, alignItems:'center',overflow:'hidden', borderRadius:4, backgroundColor: AppConfig.themeColor()}}
            onPress={() => {
              let ref = new Firebase(firebaseUrl)
              let receiptID = this.props.receiptData[this.props.index].key
              ref.child('users').child(this.props.uid).child('receipts').child(receiptID).once('value', (snapshot)=>{
                let data = snapshot.val();
                let customer_experience = data.customer_experience;
                if(customer_experience){
                  ref.child('users').child(this.props.uid).child('receipts').child(receiptID).child('active').set('0', (err)=>{
                    if(err){
                      console.log('error submitting')
                    }
                    else{
                      Animated.spring(this.anim,{
                        toValue:1,
                        tension:0,
                        friction:15,
                      }).start();
                    }
                  })
                }
                else{
                  Alert.alert('Please provide your feedback')
                }
                //console.log(customer_experience)
              })
            }}


          >
             <Text style={{color:'white' }}>Submit</Text>
          </Button>
          </View>
        </View>

        <View style={{position:'absolute', top:15, left:(width-115)}}>
        {this.getRewardCoin(95,'cent')}
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
    marginTop: 0,
    marginBottom:7,
    marginHorizontal:3.5,
    //backgroundColor: 'transparent',
    backgroundColor:  AppConfig.themeTransperentColor(),
    //backgroundColor: AppConfig.themeBackgroundColor(),
    borderWidth:0
  },


  rewardCoin: { margin: 0, padding:0, backgroundColor: 'gold', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth:0, borderRadius:35 , height:70, width:70},
  rewardCurrency: {alignSelf:'flex-end',fontWeight: 'bold', color: 'gray', marginBottom:18, paddingHorizontal:0 },
  rewardAmount: {fontSize: 25,fontWeight: 'bold', color: 'gray', },
  offerContainer: {
    flex:2,
    flexDirection:'row', padding:15, borderWidth:0,
    // shadowColor: "#000000",
    // shadowOpacity: 0.1,
    // borderRadius: 5,
    // shadowOffset: {
    //   height: 1,
    //   width: 1
    // }
  },
  pricePaidContainer: { borderWidth:0, flex:1,flexDirection:'row', alignItems:'center', paddingHorizontal:15, paddingTop:10,},
  serviceDetailContainer: { flex:2, padding:15, borderWidth:0, borderBottomWidth:0, borderBottomColor:'lightgray'},
  surveryContainer: { flex: 5, paddingHorizontal:15, borderWidth:0},

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
