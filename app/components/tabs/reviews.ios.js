//'use strict';
import React, {
  Component,
  View,
  StyleSheet
} from 'react-native';

import CommentModal from '../common/CommentModal';
import RestaurantCard from '../common/RestaurantCard';
import Carousel from '../common/Carousel';
import Firebase from 'firebase';

export default class Reviews extends Component{

  constructor(props){
    super(props);
    //console.log('review constructor');
    this.state = {
      cards: [],
      selectedIndex: 0,
      isCommentModalOpen: false,
      isDisabled: false,
      // swipeToClose: true,
      // sliderValue: 0.3
    };
    this.onSelectedIndexChange = this.onSelectedIndexChange.bind(this);
    this.renderCard = this.renderCard.bind(this);
  }

  onSelectedIndexChange(selectedIndex: number) {
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

  titlePress(){
    console.log(this);
    console.log("this is titletPress ")
  }

  render(){
    //console.log("im in review render");
    return (
     <View style={styles.container}>
      <View style={{flex:5}}>
        <Carousel
          data={this.state.cards}
          selectedIndex={this.state.selectedIndex}
          onSelectedIndexChange={this.onSelectedIndexChange}
          renderCard={this.renderCard}
        />
        <CommentModal
          isOpen={this.state.isOpen}
          onClosed={this.closeCommentModal}
          onPress={this.onPostComment}
        />
      </View>
    </View>
    );
  }

  renderCard(index, data): ReactElement {
    return(
        <RestaurantCard
          key={index}
          data={data}
          index={index}
          titleClick={this.titlePress.bind(this)}
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
        cards: this.state.cards.concat(items)
      });
    })
  }

}

var styles = StyleSheet.create({
   container: {
     flex:1,
     borderWidth:0,
     marginTop:20,
     marginBottom:23,
     backgroundColor: 'black'
  },
});
