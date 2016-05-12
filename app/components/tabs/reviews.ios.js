//'use strict';
import React, {
  Component,
  Text,
  ListContainer,
  TextInput,
  View
} from 'react-native';
var Itemlist = require('../common/itemlist');
import Touchable from '../common/Touchable';
import CommentModal from '../common/CommentModal';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';

var PageList = require('../common/pagelist');
var Carousel = require('../common/Carousel');
var F8PageControl = require('../common/F8PageControl');
var Button = require('../common/button');
const StyleSheet = require('F8StyleSheet');
const url = "https://wots.firebaseio.com/receipts";


export default class Reviews extends Component{

  constructor(props){
    super(props);
    console.log('review constructor');
    this.state = {

      cards: [],
      selectedIndex: 0,
      isCommentModalOpen: false,
      isDisabled: false,
      // swipeToClose: true,
      // sliderValue: 0.3
    };
    (this: any).handleIndexChange = this.handleIndexChange.bind(this);
    this.renderCard = this.renderCard.bind(this);
  }

  handleIndexChange(selectedIndex: number) {
    this.setState({
    selectedIndex: selectedIndex,
    isOpen: false
    });
  }



  openCommentModal() {
    this.setState({isOpen: true});
    console.log("this is openModal5 ")
  }

  closeCommentModal() {
    this.setState({isOpen: false});
    console.log("this is closeModal5 ")
  }

  onPostComment() {
    console.log("this is onPostComment")
  }

  onSubmitPress(){
    console.log("this is onSubmitPress ")
  }
  onStarRatingPress() {
    console.log("this is onRatingPress ")
  }

  titlePress(){
    console.log("this is titletPress ")
  }

  componentWillUnmount(){
    console.log("this is componentWillUnmount ")
  }

  starRating(size,ratingScore,active){ return <StarRating
      disabled={active}
      emptyStar={'ios-star-outline'}
      fullStar={'ios-star'}
      halfStar={'ios-star-half'}
      iconSet={'Ionicons'}
      maxStars={5}
      rating={ratingScore}
      selectedStar={(rating) => {
        return null;
      }}
      starColor={'#b2cb53'}
      starSize={size}
    />;
  }

  render(){
    console.log("im in review render");
    return (
     <View style={[styles.container,this.border('blue')]}>
      <View style={{flex:5}}>
        <Carousel
          data={this.state.cards}
          selectedIndex={this.state.selectedIndex}
          onSelectedIndexChange={this.handleIndexChange}
          renderCard={this.renderCard}
        />
        <CommentModal
          isOpen={this.state.isOpen}
          onClosed={this.closeCommentModal}
          onPress={this.onPostComment}
        />
      </View>
      <View style={{ borderWidth:0}}>
        <F8PageControl style={{borderWidth:0,}}
          count={this.state.cards.length}
          selectedIndex={this.state.selectedIndex}
        />
      </View>
    </View>
    );
  }

  renderCard(index: number, data): ReactElement {
    return(
      <View key={index} style={styles.container}>
        <View style={styles.card}>
          <View style={styles.info}>
            <Touchable onPress={this.titlePress.bind(this)}>
              <Text style={{fontSize:20,fontWeight:'bold', color:'#34495e'}}>{data[index].name}</Text>
            </Touchable>
          </View>
          <View style={{borderWidth:0, alignSelf: 'center', flexDirection:'row', marginBottom:10}}>
          {this.starRating(15,4,true)}
          <Text style={{fontSize:13,color:'#34495e'}}>{' (54)'}</Text>
          </View>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', margin:20}}>
          <Icon name="dollar" size={15} color="#34495e"/>
          <Text style={{alignSelf:'center', fontSize:25, color:"#34495e"}}>{" "+data[index].amount}</Text>
          </View>
          <View style={{borderWidth:0}}>
            <Itemlist item_click={this.openCommentModal.bind(this)} items={data[index].order_details} {...this.props}/>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-around', padding:20, marginTop:10}}>
            <Button type="round" icon="bicycle" onPress={()=> null}/>
            <Button type="round" icon="cutlery" onPress={this.onSubmitPress.bind(this)}/>
          </View>

          <View style={{justifyContent:'center',alignItems:'center', marginTop:20}}>
          <Button  text="Submit" onPress={this.onSubmitPress}/>

          </View>
        </View>
      </View>
    );

  }

  componentDidMount(){
    this.fetchReceipts();
  }

  fetchReceipts(){
    this.firebaseRef = new Firebase('https://wots.firebaseio.com/receipts');
    this.firebaseRef.once("value",(dataSnapshot)=>{
      var items = dataSnapshot.val();
      this.setState({
        cards: this.state.cards.concat(items)
      });
    })
  }




  border(color){
    return {
      //borderColor: color,
      //borderWidth: 4
    }
  }

}

var styles = StyleSheet.create({
   container: {
     flex:1,
     borderWidth:0,
     borderColor: 'red',
     marginTop:20,
     marginBottom:19,
     //backgroundColor: 'white',
     //backgroundColor: '#b3cd52',
     backgroundColor: 'black'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  btn: {
    margin: 10,
    backgroundColor: "black",
    color: "white",
    padding: 10
  },

  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },

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
  card: {
    ios: {
      flex:5,
      marginTop:0,
      borderRadius: 5,
      marginHorizontal: 3,
      //backgroundColor: '#dce79e',
      backgroundColor: 'white',
      borderWidth:0

    },
  }
});

//module.exports = Reviews;
