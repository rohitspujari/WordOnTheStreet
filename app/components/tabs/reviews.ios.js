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
import Modal from 'react-native-modalbox';
import StarRating from 'react-native-star-rating';
var PageList = require('../common/pagelist');
var Carousel = require('../common/Carousel');
var F8PageControl = require('../common/F8PageControl');
var Button = require('../common/button');
const StyleSheet = require('F8StyleSheet');
const url = "https://wots.firebaseio.com/receipts";


export default class Reviews extends Component{

  constructor(props){
    super(props);
    this.state = {
      cards: [],
      selectedIndex: 0,
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3
    };
    (this: any).handleIndexChange = this.handleIndexChange.bind(this);
  }

  handleIndexChange(selectedIndex: number) {
    this.setState({
    selectedIndex: selectedIndex
    });
  }

  closeModal5(id) {
    this.setState({isOpen: false});
  }

  openModal5(id) {
    this.setState({isOpen: true});
  }

  onSubmitPress(){

  }
  onStarRatingPress() {

  }

  titlePress(){
    console.log('hello from title')
  }

  render(){

    //var commentModal = ();
    //var BContent = (<Button onPress={this.closeModal5.bind(this)} style={[styles.btn, styles.btnModal]}>X</Button>);

    var starRating = function(size,ratingScore,active){ return <StarRating
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
        starColor={'gray'}
        starSize={size}
      />;}


    return (
     <View style={[styles.container,this.border('blue')]}>
      <View style={{flex:5}}>
        <Carousel
          data={this.state.cards}
          selectedIndex={this.state.selectedIndex}
          onSelectedIndexChange={this.handleIndexChange}
          renderCard={(index, data) => {
            return(
              <View style={styles.container}>
                <View style={styles.card}>
                  <View style={styles.info}>
                    <Touchable onPress={this.titlePress.bind(this)}>
                      <Text style={{fontSize:20,fontWeight:'bold', color:'#34495e'}}>{data[index].name}</Text>
                    </Touchable>
                  </View>
                  <View style={{borderWidth:0, alignSelf: 'center', flexDirection:'row', marginBottom:50}}>
                  {starRating(15,4,true)}
                  <Text style={{fontSize:13,color:'#34495e'}}>{' (54)'}</Text>
                  </View>
                  <View style={{borderWidth:0}}>
                    <Itemlist item_click={this.openModal5.bind(this)} items={data[index].order_details} {...this.props}/>
                  </View>
                  <View style={{flexDirection:'row', justifyContent:'space-around', padding:20, marginTop:20}}>
                    <Text>Delivery</Text>
                    <Text>Dine In</Text>
                  </View>
                  <View style={{justifyContent:'center',alignItems:'center', marginTop:20}}>
                  <Button  text={'Submit'}  onPress={this.onSubmitPress}/>
                  </View>
                </View>
              </View>
            );
          }}
        />


        <Modal animationDuration={350} position='top' isOpen={this.state.isOpen} onClosed={this.closeModal5.bind(this)} style={[styles.modal, styles.modal4]} position={"center"}>
          {starRating(25,0,false)}
          <TextInput
              placeholder={"Comments"}
              autoFocus={true}
              multiline={true}
              style={{height: 100, backgroundColor: 'white', borderWidth: 0, fontSize: 15, marginTop:10}}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}>
              </TextInput>
          <Button  text={'Submit'}  onPress={this.onSubmitPress}/>
        </Modal>

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

  // renderCard(index: number, data): ReactElement {
  //   console.log(this);
  //
  // }

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
     backgroundColor: 'white',
     //backgroundColor: '#b3cd52',
     //backgroundColor: 'black'
  },
  modal: {
    //justifyContent: 'top',
    alignItems: 'center',
    backgroundColor: '#f6f7f8',
    padding: 10

  },
  modal4: {
    height: 215,
    width: 300,
    borderRadius:2


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
      backgroundColor: '#dce79e'
    }

  },
  card: {
    ios: {
      flex:5,
      marginTop:0,
      borderRadius: 5,
      marginHorizontal: 3,
      backgroundColor: '#dce79e',
      borderWidth:0

    },
  }
});

//module.exports = Reviews;
