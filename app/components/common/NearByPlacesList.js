import React, {
  StyleSheet,
  Component,
  View,
  ListView,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
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
    navBackButton = (
      <TouchableOpacity  onPress={() => this.props.navigator.pop()} style={{borderWidth:0, marginLeft:15, marginTop:15}}>
        <Icon name="chevron-left" size={15} color={AppConfig.themeTextColor()} />
      </TouchableOpacity>
    );

    if(this.state.isLoaded === false){
      return <ActivityProgress/>
    }
    return(
      <View style={{flex:1}}>
        <NavigationBar
          statusBar={{hidden:false}}
          tintColor= {AppConfig.themeColor()}
          leftButton={navBackButton}
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
                <PlaceCell origin={this.props.origin} place={rowData} {...this.props}/>
              );
            }}/>
       </ScrollView>
      </View>



    );
  }

}
