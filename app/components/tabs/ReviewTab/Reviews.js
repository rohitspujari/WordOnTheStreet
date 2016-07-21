//'use strict';
import React, {
  Component,
  View,
  StyleSheet,
  Text,
  ActivityIndicatorIOS,
  StatusBar,
  Alert,
  TouchableOpacity,
  Modal, TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'
import StarRating from 'react-native-star-rating';
import Button from 'react-native-button';
import NavigationBar from 'react-native-navbar';
import Drawer from 'react-native-drawer'
import Firebase from 'firebase';

import CommentModal from './CommentModal';
import ReviewCard from './ReviewCard';
import Carousel from './Carousel';

import AppConfig from '../../common/AppConfig';
import ControlPanel from './Control/ControlPanel';

//const firebaseReceiptsRef = new Firebase('https://wots.firebaseio.com/receipts');
const firebaseUrl = 'https://wots.firebaseio.com/';
const firebaseReceiptUrl = 'https://wots.firebaseio.com/receipts/';
const firebaseReviewUrl = 'https://wots.firebaseio.com/reviews/';

var REQUEST_URL = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=AIzaSyAmbpYyzqv7aPDFpdbvsHo5zIEruNBuiNI';

export default class Reviews extends Component{

  constructor(props){
    super(props);
    //console.log('review constructor');
    this.state = {
      cards: [],
      selectedIndex: 0,
      modalVisible: false,
      isCommentModalOpen: false,
      isReviewModalOpen: false,
      isDisabled: false,
      isLoaded: false,
      isStatusBarHidden: false
    };
    this.onSelectedIndexChange = this.onSelectedIndexChange.bind(this);
    this.renderCard = this.renderCard.bind(this);
  }

  onSelectedIndexChange(selectedIndex: number) {
    //console.log('selectedIndexChanged')
    this.setState({
      selectedIndex: selectedIndex,
      //isCommentModalOpen: false,
      //isReviewModalOpen: false
    });
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

  openReviews(){
    //console.log(this);
    this.props.navigator.push({
      name: 'reviewList',
      type: 'Modal',
      title:'Reviews',
      passProps : {
        placeId: this.state.cards[this.state.selectedIndex].data.place_id,
        showMap: true
      }
    });
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

    var navButton = (
      <TouchableOpacity  onPress={()=> this.refs.drawer.open()} style={{borderWidth:0, padding:15, marginLeft:0, marginTop:0}}>
        <Icon name="navicon" size={15} color={AppConfig.themeTextColor()} />
      </TouchableOpacity>
    );
    //console.log("im in review render");
    //console.log(this.props);
    return (
    <View style={styles.container}>
      <StatusBar hidden={this.state.isStatusBarHidden}/>
      <Drawer
        type="overlay"
        ref={"drawer"}
        content={<ControlPanel {...this.props} />}
        captureGestures={true}
        openDrawerOffset={0.3}
        panOpenMask={0}
        negotiatePan={false}
        panCloseMask={0}
        tapToClose={true}
        closedDrawerOffset={0}
        onOpenStart={()=> this.setState({isStatusBarHidden: true})}
        onClose={()=> this.setState({isStatusBarHidden: false})}
        tweenHandler={(ratio) => ({ main: { opacity: (2 - ratio) / 2 } })}
      >
        <View style={{borderWidth:0}}>
          <NavigationBar
            statusBar={{hidden:false}}
            tintColor={AppConfig.themeColor()}
            leftButton={navButton}
            title={titleConfig}
          />
        </View>
        <Carousel
          data={this.state.cards}
          selectedIndex={this.state.selectedIndex}
          onSelectedIndexChange={this.onSelectedIndexChange}
          renderCard={this.renderCard}
        />
        <Modal
          animated = {true}
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
        >
          <CommentModal {...this.props} itemProps={this.state.itemProps} onButtonPressed={this.commentButtonPressed.bind(this)}/>
        </Modal>
      </Drawer>
    </View>
    );
  }

  openCommentModal(itemProps) {
    //this.setState({isCommentModalOpen: true, isReviewModalOpen: false, itemProps:itemProps });
    //console.log("this is openModal5 ")
    //console.log(itemProps);
    this.setState({
      modalVisible:true,
      itemProps:itemProps
    })
  }

  commentButtonPressed(operation){

    this.setState({modalVisible:false})
  }



  getReviewCard(index, data) {
    return (
      <ReviewCard
        key={index}
        receiptData={data}
        index={index}
        dimmed={this.state.modalVisible}
        titlePress={this.openReviews.bind(this)}
        itemPress={this.openCommentModal.bind(this)}
        onSubmitPress={this.onSubmitPress.bind(this)}
        {...this.props}
      />
    );
  }

  renderCard(index, data): ReactElement {
    let nullCard = <View key={index}/>;
    let ReviewCard = this.getReviewCard(index, data)

    return(
      ReviewCard
    );
  }

  componentDidMount(){
    this.fetchReceipts();
  }

  fetchReceipts(){
    //const firebaseUrl = 'https://wots.firebaseio.com/';
    var firebaseReceiptsRef =  new Firebase(firebaseUrl+'users/'+this.props.uid+'/receipts/')
  //  this.firebaseRef = new Firebase('https://wots.firebaseio.com/receipts');
    var items = [];
    firebaseReceiptsRef.on("child_added",(snapshot)=>{
      var key = snapshot.key();
      var childData = snapshot.val();
      items.push({key: key, data: childData});


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
     //backgroundColor: 'gray'
     backgroundColor: AppConfig.themeColor()
     //backgroundColor: '#f87931'
  },
});
