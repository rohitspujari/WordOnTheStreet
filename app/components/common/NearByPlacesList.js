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
import ActivityProgress from './ActivityProgress';

export default class NearByPlacesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      isLoaded: false
    };
  }

  componentDidMount(){
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.nearbyPlaces),
      isLoaded: true
    });
  }
  render(){
    if(this.state.isLoaded === false){
      return <ActivityProgress/>
    }
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
        <ScrollView>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData, section, index)=>{
              return(
                <PlaceCell origin={this.props.origin} place={rowData}/>
              );
            }}/>
       </ScrollView>
      </View>



    );
  }

}
