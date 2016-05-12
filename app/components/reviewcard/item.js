import React, {
  StyleSheet,
  Text,
  View,
  TextInput,
  Component
} from 'react-native';

import StarRating from 'react-native-star-rating';
import Touchable from '../common/Touchable';
import Modal from 'react-native-modalbox';
import Button from'../common/button';



class Item extends Component{

  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3
    }
  }

  closeModal5(id) {
    this.setState({isOpen: false});
  }

  openModal5(id) {
    //console.log('in open modal5')
    //console.log(id)
    this.setState({isOpen: true});
    console.log("this is openModal5 ")
  }

  commentModal () {
    return <Modal animationDuration={400} position='top' isOpen={this.state.isOpen} onClosed={this.closeModal5.bind(this)} style={[styles.modal, styles.modal4]} position={"center"}>
      <TextInput
          placeholder={"Comments"}
          autoFocus={true}
          multiline={true}
          style={{height: 100, backgroundColor: '#f6f7f8', borderWidth: 0, fontSize: 15, marginTop:10}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}>
          </TextInput>
      <Button  text="Post" onPress={()=> null}/>
    </Modal>;
  }
  onStarRatingPress(){

  }
  render(){

    var starRating = <StarRating
      disabled={false}
      emptyStar={'ios-star-outline'}
      fullStar={'ios-star'}
      halfStar={'ios-star-half'}
      iconSet={'Ionicons'}
      maxStars={5}
      rating={0}
      selectedStar={(rating) => this.onStarRatingPress(rating)}
      starColor={'#b2cb53'}
      starSize={25}
    />;





    return(
      <View style={styles.container}>
        <View style={styles.container_itemReview}>
          <View style={styles.name}>
            <Touchable onPress={this.props.itemPress}>
              <Text style={styles.nameText}>{this.props.itemName}</Text>
            </Touchable>
          </View>
          <View style={styles.rating}>
            {starRating}
          </View>

        </View>
       </View>
    );
  }

  onPress() {
    console.log("I am pressed");
  }
}

var styles = StyleSheet.create({
  container:{
    flex:1,
    //padding:10,
    paddingLeft:20,
    paddingRight:20,
    borderWidth:0,

    //borderColor: 'green'
  },
  container_itemReview:{
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    //borderWidth:1,
    //borderColor:'red'
  },
  name:{
    flex:1,
    alignItems: 'flex-start',
    alignSelf: 'center',
    borderWidth:0,


    //borderColor:'red'
  },
  nameText:{
    fontSize: 16,
    fontWeight:'500',
    color:'#34495e'

  },
  rating:{
    flex:1,
    alignItems: 'flex-end',
    borderWidth:0,
    //borderColor:'blue'
  },
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

});

module.exports= Item;
