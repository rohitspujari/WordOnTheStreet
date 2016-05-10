//'use strict';
import React, {
  Component,
  Text,
  ListContainer,
  Button,
  View
} from 'react-native';
var Itemlist = require('../common/itemlist');
import Modal from 'react-native-modalbox';
var PageList = require('../common/pagelist');
var Carousel = require('../common/Carousel');
var F8PageControl = require('../common/F8PageControl');
const StyleSheet = require('F8StyleSheet');
const url = "https://wots.firebaseio.com/receipts";


class Reviews extends React.Component{

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

  render(){

    var commentModal = <Modal isOpen={this.state.isOpen} onClosed={this.closeModal5.bind(this)} style={[styles.modal, styles.modal4]} position={"center"} backdropContent={BContent}>
          <Text>{'Modal with backdrop content'}</Text>
        </Modal>;
    var BContent = <Button onPress={this.closeModal5.bind(this)} style={[styles.btn, styles.btnModal]}>X</Button>;


    return (
     <View style={[styles.container,this.border('blue')]}>
      <View style={{flex:5}}>
        <Carousel
          data={this.state.cards}
          selectedIndex={this.state.selectedIndex}
          onSelectedIndexChange={this.handleIndexChange}
          renderCard={(index: number, data)=>{
            return(
              <View style={styles.container}>
                <View style={styles.card}>

                  <Text style={[styles.info,{fontSize:20}]}>{data[index].name}</Text>
                  <Itemlist item_click={()=>this.setState({isOpen: true})} items={data[index].order_details} {...this.props}/>
                  {commentModal}
                </View>
              </View>
            );
          }}
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
     //marginTop:20,
     marginBottom:50,
     //backgroundColor: '#c8c864',
     backgroundColor: '#b3cd52',
     //backgroundColor: 'black'
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dadbca'

  },
  modal4: {
    height: 300
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
      marginBottom:50,
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
      marginTop:10,
      borderRadius: 2,
      marginHorizontal: 3,
      backgroundColor: 'white'

    },
  }
});

module.exports = Reviews;
