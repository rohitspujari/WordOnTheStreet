import React, {
  Component,
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
  Modal
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from 'react-native-button';

import AppConfig from '../../../common/AppConfig';
export default class Payemnt extends Component {

  constructor(props) {
    super(props);
    this.state = {modalVisible: false}
  }

  getModal() {
    return (
      <View style={{ alignItems: 'center', marginTop: 50, padding: 20, marginHorizontal: 20, backgroundColor: AppConfig.themeBackgroundColor()}}>
        <View>
          <Text>Add credit card details</Text>
          <TouchableHighlight style={{alignItems: 'center'}} onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
            <Text>Hide Modal</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  render(){

    var navCloseButton = (
      <Button
        containerStyle={{padding:15, overflow:'hidden', borderRadius:4, backgroundColor: AppConfig.themeColor()}}
        onPress={() => this.props.navigator.pop()}
        style={{fontSize: 20, color: 'green'}}>
        <Icon name="close" size={15} color={AppConfig.themeTextColor()} />
      </Button>
    );
    const titleConfig = {
      title: 'Payment Details',
      tintColor: AppConfig.themeTextColor()
    };

    return (
      <View style={{flex:1}}>
      <NavigationBar
        title={titleConfig}
        statusBar={{hidden:false}}
        tintColor={AppConfig.themeColor()}
        rightButton={navCloseButton}
      />
      <View style={styles.container}>
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
          containerStyle={{padding:10, overflow:'hidden', borderRadius:4, backgroundColor: AppConfig.themeBackgroundColor()}}
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
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor:  'red'
  }
})
