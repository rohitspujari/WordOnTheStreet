import React, {
  StyleSheet,
  Component,
  View,
  ListView,
  ScrollView
} from 'react-native';
import Item from './Item';

//var REQUEST_URL = 'https://www.googleapis.com/books/v1/volumes?q=subject:suspense';
export default class ItemList extends Component{
  constructor(props){
  //console.log("i am in itemlist constructor");
   super(props);
   this.state = {
     dataSource: new ListView.DataSource({
       rowHasChanged: (r1, r2) => r1 !== r2
     })
   };
  }

  componentDidMount(){
    //this.fetchData(REQUEST_URL);
    //this.fetchReceipts();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.items)
    });
  }

  // fetchData(url){
  //   fetch(url)
  //   .then((response)=>response.json())
  //   .then((responseData)=>{
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(responseData.items),
  //       isLoading: false
  //     });
  //   })
  //   .done();
  // }

  render(){
    return(
      <ScrollView scrollEnabled={false}>
        <View style={styles.container}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData, section, index)=>{
              return(
                <Item
                  key={index}
                  itemName={rowData.order}
                  itemIndex={index}
                  onPress={this.props.itemPress}
                  {...this.props}
                />
              );
            }}/>
        </View>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    borderWidth: 0,
    padding:0
  },
});
