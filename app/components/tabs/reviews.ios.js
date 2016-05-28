//'use strict';
import React, {
  Component,
  View,
  StyleSheet,
  Text,
  ActivityIndicatorIOS,
  StatusBar,
  Alert
} from 'react-native';

import CommentModal from '../common/CommentModal';
import ReviewsModal from '../common/ReviewsModal';
import RestaurantCard from '../common/RestaurantCard';
import Carousel from '../common/Carousel';
import Firebase from 'firebase';
import Button from '../common/button';
import AppConfig from '../common/AppConfig';
import NavigationBar from 'react-native-navbar';
import Drawer from 'react-native-drawer'
import ControlPanel from '../common/ControlPanel';
var ExampleMaps = require('../../examples/EventListner')



const firebaseReceiptsRef = new Firebase('https://wots.firebaseio.com/receipts');
const firebaseUrl = 'https://wots.firebaseio.com/';
const firebaseReceiptUrl = 'https://wots.firebaseio.com/receipts/';
const firebaseReviewUrl = 'https://wots.firebaseio.com/reviews/';

var REQUEST_URL = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=AIzaSyAmbpYyzqv7aPDFpdbvsHo5zIEruNBuiNI';
//var REQUEST_URL = 'https://www.googleapis.com/books/v1/volumes?q=subject:suspense';

export default class Reviews extends Component{

  constructor(props){
    super(props);
    //console.log('review constructor');
    this.state = {
      cards: [],
      selectedIndex: 0,
      isCommentModalOpen: false,
      isReviewModalOpen: false,
      isDisabled: false,
      isLoaded: false,
      showStatusBar: true,
      // swipeToClose: true,
      // sliderValue: 0.3
    };
    this.onSelectedIndexChange = this.onSelectedIndexChange.bind(this);
    this.renderCard = this.renderCard.bind(this);
  }

  onSelectedIndexChange(selectedIndex: number) {
    //console.log('selectedIndexChanged')
    this.setState({
      selectedIndex: selectedIndex,
      isCommentModalOpen: false,
      isReviewModalOpen: false
    });
  }


  openCommentModal(itemProps) {

    // this.props.navigator.push({
    //   name: 'comment',
    //   type: 'bottomUp',
    //   passProps : {
    //     item: itemProps
    //   }
    // });
    this.setState({isCommentModalOpen: true, isReviewModalOpen: false, itemProps:itemProps });
    console.log("this is openModal5 ")
    //console.log(itemProps);
  }

  onAddComment(comment) {

    if(!comment || comment ==='') {
      Alert.alert('Please comment');
      return;
    }

    let cardId = this.state.itemProps.index;
    let placeId = this.state.itemProps.data[this.state.itemProps.index].place_id;
    let itemName = this.state.itemProps.itemName
    let reviewUrl = firebaseReviewUrl + placeId + "/" + itemName;
    let updateUrl = firebaseReceiptUrl + cardId;

    let reviewRef = new Firebase(reviewUrl)
    reviewRef.push({
      comment: comment,
      timestamp: Date()
    })

    let updateRef = new Firebase(updateUrl);
    updateRef.update({
      reviewed: true
    })
  }


  closeCommentModal() {
    this.setState({isCommentModalOpen: false});
    console.log("this is closeModal5 ")
  }

  openReviewsModal(){

    //console.log(this);
    this.props.navigator.push({
      name: 'reviewList',
      type: 'Modal',
      title:'Reviews',
      passProps : {
        placeId: this.state.cards[this.state.selectedIndex].place_id,
        showMap: true
      }
    });

    //this.setState({isReviewModalOpen: true, isCommentModalOpen: false});
    //console.log("this is reviewsPress, fetching reviews ");



    //this.fetchData(REQUEST_URL);
  }

  fetchData(url){
    fetch(url)
    .then((response)=>response.json())
    .then((responseData)=>{
      this.setState({
        isReviewModalOpen: true,
        isCommentModalOpen: false,
        reviews: responseData.result.reviews,
        isLoaded: true
      });
    })
    .done();
  }



  onSubmitPress(){
    console.log("this is onSubmitPress ")
  }

  titlePress(){
    //console.log(this);
    console.log("this is titletPress ")
    // this.props.navigator.push({
    //   name:'search'
    // });
    console.log(this.props.switchTab);

  }

  renderLoadingView() {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicatorIOS
            animating={true}
            size="small" />
      </View>
    );
  }

  render(){

    if (!this.state.isLoaded) {
      return this.renderLoadingView();
    }

    const leftButtonConfig = {
      title: 'settings',
      tintColor:AppConfig.themeTextColor(),
      handler: () => this.props.navigator.pop(),
      };

    const titleConfig = {
      tintColor: AppConfig.themeTextColor(),
      title: 'Word on the street',
    };

    //console.log("im in review render");
    //console.log(this.props);
    return (
    <View style={styles.container}>

    <Drawer
      type="overlay"
      ref={"drawer"}
      content={<ControlPanel />}
      captureGestures={true}
      openDrawerOffset={0.3}
      panOpenMask={0}
      negotiatePan={false}
      panCloseMask={0}
      tapToClose={true}
      closedDrawerOffset={0}

      tweenHandler={(ratio) => ({ main: { opacity: (2 - ratio) / 2 } })}
    >
     <View style={{borderWidth:0}}>
     <NavigationBar
        statusBar={{hidden:false}}
        tintColor={AppConfig.themeColor()}
        leftButton={<Button type="navBar" icon="navicon" onPress={()=> this.refs.drawer.open()}/>}
        title={titleConfig}/>
     </View>
        <Carousel
          data={this.state.cards}
          selectedIndex={this.state.selectedIndex}
          onSelectedIndexChange={this.onSelectedIndexChange}
          renderCard={this.renderCard}
        />
        <CommentModal
          isOpen={this.state.isCommentModalOpen}
          isDisabled={false}
          backdropPressToClose={true}
          onClosed={this.closeCommentModal}
          onPress={this.onAddComment.bind(this)}
        />
        <ReviewsModal
          isOpen={this.state.isReviewModalOpen}
          place={this.state.cards[this.state.selectedIndex]}
        />


      </Drawer>
    </View>

    );
  }

  renderCard(index, data): ReactElement {
    return(
        <RestaurantCard
          key={index}
          data={data}
          index={index}
          reviewsPress={this.openReviewsModal.bind(this)}
          titleClick={this.openReviewsModal.bind(this)}
          itemPress={this.openCommentModal.bind(this)}
          onSubmitPress={this.onSubmitPress.bind(this)}
        />
    );
  }

  componentDidMount(){
    this.fetchReceipts();
  }

  fetchReceipts(){
  //  this.firebaseRef = new Firebase('https://wots.firebaseio.com/receipts');
    firebaseReceiptsRef.on("value",(dataSnapshot)=>{
      var items = dataSnapshot.val();
      this.setState({
        cards: items,
        isLoaded: true
      });
    })
  }

}

var styles = StyleSheet.create({
   container: {
     flex:1,
     borderWidth:0,
     marginTop:0,
     marginBottom:50, //This is a tab margin
     backgroundColor: AppConfig.themeColor()
     //backgroundColor: '#f87931'
  },
});
