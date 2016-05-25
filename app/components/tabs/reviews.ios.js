//'use strict';
import React, {
  Component,
  View,
  StyleSheet,
  Text,
  ActivityIndicatorIOS
} from 'react-native';

import CommentModal from '../common/CommentModal';
import ReviewsModal from '../common/ReviewsModal';
import RestaurantCard from '../common/RestaurantCard';
import Carousel from '../common/Carousel';
import Firebase from 'firebase';

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
      isLoaded: false
      // swipeToClose: true,
      // sliderValue: 0.3
    };
    this.onSelectedIndexChange = this.onSelectedIndexChange.bind(this);
    this.renderCard = this.renderCard.bind(this);
  }

  onSelectedIndexChange(selectedIndex: number) {
    console.log('selectedIndexChanged')
    this.setState({
      selectedIndex: selectedIndex,
      isCommentModalOpen: false,
      isReviewModalOpen: false
    });
  }


  openCommentModal() {
    this.setState({isCommentModalOpen: true, isReviewModalOpen: false });
    console.log("this is openModal5 ")
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

  onPostComment() {
    console.log("this is onPostComment")
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
    //console.log("im in review render");
    //console.log(this.props);
    return (
     <View style={styles.container}>
        <Carousel
          data={this.state.cards}
          selectedIndex={this.state.selectedIndex}
          onSelectedIndexChange={this.onSelectedIndexChange}
          renderCard={this.renderCard}
        />
        <CommentModal
          isOpen={this.state.isCommentModalOpen}
          onClosed={this.closeCommentModal}
          onPress={this.onPostComment}
        />
        <ReviewsModal
          isOpen={this.state.isReviewModalOpen}
          place={this.state.cards[this.state.selectedIndex]}
        />



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
    this.firebaseRef = new Firebase('https://wots.firebaseio.com/receipts');
    this.firebaseRef.once("value",(dataSnapshot)=>{
      var items = dataSnapshot.val();
      this.setState({
        cards: this.state.cards.concat(items),
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
     backgroundColor: '#b2cb53'
  },
});
