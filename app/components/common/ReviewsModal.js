import React, {
  Text,
  Component,
  ListContainer,
  TextInput,
  StyleSheet,
  View,
  ScrollView,

} from 'react-native';
import Modal from 'react-native-modalbox';
var window  = require('Dimensions').get('window');


export default class ReviewsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderList() {
    var list = [];

    for (var i=0;i<50;i++) {
      list.push(<Text style={styles.text} key={i}>Elem {i}</Text>);
    }

    return list;
  }

  render() {
    return (

      <Modal position={"bottom"} swipeArea={20} isOpen={this.props.isOpen} style={[styles.modal4, styles.modal]}>

        <ScrollView>
          <View style={{width: window.width, paddingLeft: 10, height:100}}>
            {this.renderList()}
          </View>
        </ScrollView>

      </Modal>
    );
  }
}
var styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal4: {
    height: 400,
    borderWidth:0
  },

});
