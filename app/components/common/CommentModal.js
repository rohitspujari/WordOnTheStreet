import React, {
  Text,
  Component,
  ListContainer,
  TextInput,
  StyleSheet,
  View
} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from '../common/button';
import StarRating from 'react-native-star-rating';
import AppConfig from './AppConfig';


export default class CommentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<Modal backdrop={true} animationDuration={400} position='top' isOpen={this.props.isOpen} onClosed={this.props.isClosed} style={[styles.modal, styles.modal4]} position={"center"}>
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
          style={{height: 100, backgroundColor: '#f6f7f8', borderWidth: 0, fontSize: 15, marginTop:10}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}>
          </TextInput>
      <Button  text="Add Comment" onPress={this.props.onPress.bind(this,this.state.text)}/>
    </Modal>);
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
