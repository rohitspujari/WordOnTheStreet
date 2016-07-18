import React, {
  Component,
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
  Modal, TextInput,
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from 'react-native-button';
import Firebase from 'firebase';

import AppConfig from '../../../common/AppConfig';

const firebaseUrl = 'https://wots.firebaseio.com/';
export default class Payemnt extends Component {

  constructor(props) {
    super(props);
    this.state = {modalVisible: false}
  }

  getButtons () {
    return (
      <View style={styles.buttonContainer}>
        <View>
          <Text>Expiry</Text>
          <TextInput
            keyboardType={'numbers-and-punctuation'}
            style={styles.inputExpiry}
            placeholder={'00/00'}
            onChangeText={(inputExpiry) => this.setState({inputExpiry})}
            value={this.state.inputExpiry}
          />
        </View>
        <Button
          containerStyle={{padding:10, width: 100, height: 40, alignItems:'center',overflow:'hidden', borderRadius:4, backgroundColor: AppConfig.themeColor()}}
          onPress={this.addPaymentCard.bind(this)}
        >
           <Text style={{color:AppConfig.themeTextColor() }}>Add</Text>
        </Button>
        <Button
          containerStyle={{ marginLeft: 10,padding:10, width: 100, height: 40, alignItems:'center',overflow:'hidden', borderRadius:4, backgroundColor: AppConfig.themeColor()}}
          onPress={() => {this.setModalVisible(!this.state.modalVisible)}}
        >
           <Text style={{color:AppConfig.themeTextColor() }}>Cancel</Text>
        </Button>

      </View>
    )
  }

  addPaymentCard(){

    let paymentInfo = {uid: this.props.uid, cc:this.state.inputCC, cvc:this.state.inputCVC, expiry: this.state.inputExpiry}
    paymentRef = new Firebase(firebaseUrl)
    paymentRef.child('payment/'+this.state.inputCC).set(paymentInfo, function(err){
        if(err){
          console.log('Error writing!');
        }
      })
      .then(
        paymentRef.child('users/'+this.props.uid).push(paymentInfo, function(err){
          if(err){
            console.log('Error writing!');
          }
        }))
      .then(this.setModalVisible(!this.state.modalVisible))

  }

  getModal() {
    return (
      <View style={{ alignItems: 'center', marginTop: 100, padding: 15, borderWidth:0, marginHorizontal: 20, backgroundColor: AppConfig.themeBackgroundColor()}}>
        <View style={{flexDirection: 'row', borderWidth: 0, alignItems: 'center',}}>
              <View>
                <Text>16 Digit Number </Text>
                <TextInput
                  keyboardType={'numbers-and-punctuation'}
                  style={styles.inputCC}
                  placeholder={'0000-0000-0000-0000'}
                  onChangeText={(inputCC) => this.setState({inputCC})}
                  value={this.state.inputCC}
                />
              </View>
              <View>
                <Text style={{marginLeft: 10}}>CVC</Text>
                <TextInput
                  keyboardType={'numbers-and-punctuation'}
                  style={styles.inputCVC}
                  placeholder={'000'}
                  onChangeText={(inputCVC) => this.setState({inputCVC})}
                  value={this.state.inputCVC}
                />
              </View>
            </View>

            <View style={styles.inputIcon}>
              <Icon name="credit-card" size={15} color={AppConfig.themeTextColor()} />
              </View>



          {this.getButtons()}

      </View>
    )
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  render(){

    var modalBackgroundStyle = {
      backgroundColor: this.state.modalVisible === true ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };

    var navCloseButton = (
      <Button
        containerStyle={{padding:15, overflow:'hidden', borderRadius:4, backgroundColor: AppConfig.themeColor()}}
        onPress={() => this.props.navigator.pop()}
        style={{fontSize: 20, color: 'green'}}>
        <Icon name="chevron-left" size={15} color={AppConfig.themeTextColor()} />
      </Button>
    );
    const titleConfig = {
      title: 'Payment Details',
      tintColor: AppConfig.themeTextColor()
    };

    return (
      <View style={[styles.container]}>
      <NavigationBar
        title={titleConfig}
        statusBar={{hidden:false}}
        tintColor={AppConfig.themeColor()}
        leftButton={this.state.modalVisible === false ? navCloseButton:<Text></Text>}
      />
      <View style={styles.content}>
        <Modal
          animated = {true}
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
        >
          {this.getModal()}
        </Modal>
        <Button
          containerStyle={{padding:10, overflow:'hidden', borderRadius:0, backgroundColor: AppConfig.themeBackgroundColor()}}
          style={{fontSize: 15, color: 'black'}}
          onPress={() => {this.setModalVisible(true)}}
        >
          <Icon name="plus" size={15} color={AppConfig.themeTextColor()} />
          <Text style={{marginLeft:5, color:AppConfig.themeTextColor() }}>Add Payment</Text>
        </Button>
      </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container:{
    flex: 1,
    //borderWidth: 1,
    borderColor:  'blue'
  },
  content:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //borderWidth: 1,
    borderColor:  'red'
  },
  buttonContainer: { flex:1 , marginTop:5, flexDirection: 'row', alignItems: 'flex-end', borderWidth:0 },
  inputCC: {marginTop: 5, height: 40, width: 230, borderColor: 'gray', borderWidth: 0, paddingLeft: 30, backgroundColor: 'white'},
  inputCVC: {marginTop: 5,marginLeft: 10, height: 40, width:50, borderColor: 'gray', borderWidth: 0, paddingLeft:10, backgroundColor: 'white'},
  inputExpiry: {marginTop: 5, height: 40, width:70, marginRight: 10, borderColor: 'gray', borderWidth: 0, paddingLeft:10, backgroundColor: 'white'},
  inputIcon: {position: 'absolute', top:48,left: 30, bottom: 100}
})
