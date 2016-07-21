import React, {
  Text,
  Component,
  ListContainer,
  TextInput,
  StyleSheet,
  View
} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import StarRating from 'react-native-star-rating';
import AppConfig from '../../common/AppConfig';
const firebaseUrl = 'https://wots.firebaseio.com/';


export default class CommentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submitComment() {
    let ref = new Firebase(firebaseUrl)
    let receiptIndex = this.props.itemProps.index
    let receiptId = this.props.itemProps.receiptData[receiptIndex].key
    var item = null
    if(this.props.itemProps.itemIndex){
      let itemIndex = this.props.itemProps.itemIndex
      item = this.props.itemProps.receiptData[receiptIndex].data.order_details[parseInt(itemIndex)].order
    }

    ref.child('users/'+this.props.uid+'/receipts/'+receiptId+'/reviews/')
    .push({item: item, comment: this.state.text}, function(err){
      if (err){
        console.log('error in writing comment');
      }
    })
    this.props.onButtonPressed('close')
  }
  render() {
    //console.log(this.props.itemProps)
    return (

      <View style={{ alignItems: 'center', marginTop: 200, padding: 15, borderWidth:0, marginHorizontal: 20,
      backgroundColor: AppConfig.themeBackgroundColor(),
      shadowColor: "#000000",
      //shadowColor: AppConfig.themeColor(),
      shadowOpacity: 0.5,
      borderRadius: 5,
      shadowOffset: {
        height: 1,
        width: 1
      }
    }}>
      <StarRating
        disabled={false}
        emptyStar={'ios-star-outline'}
        fullStar={'ios-star'}
        halfStar={'ios-star-half'}
        iconSet={'Ionicons'}
        maxStars={5}
        rating={0}
        selectedStar={(rating) => {
          return null;
        }}
        starColor={AppConfig.themeColor()}
        starSize={25}
      />
      <TextInput
          placeholder={"Comments"}
          autoFocus={true}
          multiline={true}
          style={{height: 100, backgroundColor: 'white', borderWidth: 0, fontSize: 15, marginTop:10, padding: 10}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}>
          </TextInput>
          <View style={{flexDirection:'row', marginTop: 15}}>
          <Button
            containerStyle={{padding:10, width: 100, height: 40, alignItems:'center',overflow:'hidden', borderRadius:4, backgroundColor: AppConfig.themeColor()}}
            onPress={() => this.submitComment()}           

          >
             <Text style={{color:'white' }}>Submit</Text>
          </Button>
          <Button
            containerStyle={{ marginLeft: 10,padding:10, width: 100, height: 40, alignItems:'center',overflow:'hidden', borderRadius:4, backgroundColor: AppConfig.themeColor()}}
            onPress={ () => {
              this.props.onButtonPressed('close')
            }}
          >
             <Text style={{color:'white' }}>Cancel</Text>
          </Button>
          </View>


    </View>
    );
  }
}
var styles = StyleSheet.create({
  modal: {
    //justifyContent: 'top',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10
  },
  modal4: {
    height: 215,
    width: 300,
    borderRadius:5
  },
})
