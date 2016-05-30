import React, {
  StyleSheet,
  Component,
  View,
  ListView,
  ScrollView,
  Text,
} from 'react-native';
import Button from '../common/button';
import AppConfig from '../common/AppConfig';
import NavigationBar from 'react-native-navbar';
import Item from '../reviewcard/Item';
import PlaceCell from './PlaceCell';

export default class NearByPlacesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
  }

  componentDidMount(){
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.nearbyPlaces)
    });
  }
  render(){
    return(
      <View style={{flex:1}}>
        <NavigationBar
          statusBar={{hidden:false}}
          tintColor= {AppConfig.themeColor()}
          leftButton={<Button type="navBar" icon="chevron-left" onPress={() => this.props.navigator.pop()}/>}
          title={{
            tintColor: AppConfig.themeTextColor(),
            title: 'Places',
          }}
        />
        <View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData, section, index)=>{
              return(
                <PlaceCell place={rowData}/>
              );
            }}/>
        </View>


      </View>
    );
  }

}
