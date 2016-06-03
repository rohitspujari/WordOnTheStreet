const React = require('react');
const ReactNative = require('react-native');
const {TextInput, View, ListView, Image, Text, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Platform, ActivityIndicatorIOS, ProgressBarAndroid, PixelRatio} = ReactNative;
const Qs = require('qs');

const defaultStyles = {
  container: {
    flex: 1,
  },
  textInputContainer: {
    backgroundColor: '#C9C9CE',
    height: 44,
    borderTopColor: '#7e7e7e',
    borderBottomColor: '#b5b5b5',
    borderTopWidth: 1 / PixelRatio.get(),
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    height: 28,
    borderRadius: 5,
    paddingTop: 4.5,
    paddingBottom: 4.5,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 7.5,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 15,
  },
  poweredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  powered: {
    marginTop: 15,
  },
  listView: {
    // flex: 1,
  },
  row: {
    padding: 13,
    height: 44,
    flexDirection: 'row',
  },
  separator: {
    height: 1,
    backgroundColor: '#c8c7cc',
  },
  description: {
  },
  loader: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
  androidLoader: {
    marginRight: -15,
  },
};

var Autocomplete = React.createClass({

  propTypes: {
    placeholder: React.PropTypes.string,
    AddressAutoComplete: React.PropTypes.bool,
    displayField: React.PropTypes.string,
    limitItems:  React.PropTypes.number,
    onPress: React.PropTypes.func,
    minLength: React.PropTypes.number,
    autoFocus: React.PropTypes.bool,
    getDefaultValue: React.PropTypes.func,
    timeout: React.PropTypes.number,
    onTimeout: React.PropTypes.func,
    query: React.PropTypes.object,
    GooglePlacesSearchQuery: React.PropTypes.object,
    styles: React.PropTypes.object,
    textInputProps: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      AddressAutoComplete: false,
      placeholder: 'Search',
      onPress: () => {},
      minLength: 0,
      autoFocus: false,
      getDefaultValue: () => '',
      timeout: 20000,
      onTimeout: () => console.warn('google places autocomplete: request timeout'),
      query: {
        key: 'AIzaSyDaKls5tJ2u0RY5QEICM8QDSdPqMe9lAsc',
        language: 'en',
        types: 'geocode',
      },
      GooglePlacesSearchQuery: {
        rankby: 'distance',
        types: 'food',
      },
      styles: {
      },
      textInputProps: {},
    };
  },

  getInitialState() {
    const ds = new ListView.DataSource({rowHasChanged: function rowHasChanged(r1, r2) {
      if (typeof r1.isLoading !== 'undefined') {
        return true;
      }
      return r1 !== r2;
    }});
    return {
      text: this.props.getDefaultValue(),
      dataSource: ds.cloneWithRows([]),
      listViewDisplayed: false,
    };
  },

  componentWillUnmount() {
    this._abortRequests();
  },

  _abortRequests() {
    for (let i = 0; i < this._requests.length; i++) {
      this._requests[i].abort();
    }
    this._requests = [];
  },

  triggerBlur() {
    if (this.refs.textInput) this.refs.textInput.blur();
  },

  _onBlur() {
    this.triggerBlur();
    this.setState({listViewDisplayed: false});
  },

  _onPress(rowData) {
    //console.log(rowData);
    this._onBlur();
    this.props.onPress(rowData);
    this.setState({
      text: rowData[this.props.displayField],
    });
  },
  _results: [],
  _requests: [],

  _request(text) {
    this._abortRequests();
    if (text.length >= this.props.minLength) {
      const request = new XMLHttpRequest();
      this._requests.push(request);
      request.timeout = this.props.timeout;
      request.ontimeout = this.props.onTimeout;
      request.onreadystatechange = () => {
        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          const responseJSON = JSON.parse(request.responseText);
          if (typeof responseJSON.predictions !== 'undefined') {
            if (this.isMounted()) {
              this._results = responseJSON.predictions;
              this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseJSON.predictions),
              });
            }
          }
          if (typeof responseJSON.error_message !== 'undefined') {
            console.warn('google places autocomplete: ' + responseJSON.error_message);
          }
        } else {
          // console.warn("google places autocomplete: request could not be completed or has been aborted");
        }
      };
      request.open('GET', 'https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=' + encodeURI(text) + '&' + Qs.stringify(this.props.query));
      request.send();
    } else {
      this._results = [];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows([]),
      });
    }
  },

  _onChangeText(text) {

   console.log('changing tetx')
   if(this.props.data) {
      var data = this.props.data;
      var limitItems = this.props.limitItems?this.props.limitItems:6
      var filteredData = (data.filter((row) => {
          return row[this.props.displayField].toLowerCase().startsWith(text.toLowerCase())
      }).map((row) => {
          return row;
      })).slice(0,(limitItems-1));
      this.props.filterResults(filteredData, text);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(filteredData),
        text: text,
        listViewDisplayed: true,
      });
      return;
    }

    if(this.props.AddressAutoComplete === true){
      this._request(text);
      this.setState({
        text: text,
        listViewDisplayed: true,
      });
    }

  },

  _renderRow(rowData = {}) {
    //console.log(rowData)
    return (
      <TouchableOpacity onPress={() => this._onPress(rowData)}>
        <View>
          <View style={[defaultStyles.row, this.props.styles.row]}>
            <Text style={[{flex: 1}, defaultStyles.description, this.props.styles.description]} numberOfLines={1}>
              {rowData[this.props.displayField]}
            </Text>
          </View>
          <View style={[defaultStyles.separator, this.props.styles.separator]} />
        </View>
      </TouchableOpacity>
    );
  },

  _onFocus() {
    this.setState({listViewDisplayed: true});
  },

  _getListView() {
    if (this.state.text !== '' && this.state.listViewDisplayed === true) {
      return (
        <ListView
          keyboardShouldPersistTaps={true}
          keyboardDismissMode="on-drag"
          style={[defaultStyles.listView, this.props.styles.listView]}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          automaticallyAdjustContentInsets={false}
          enableEmptySections={true}
          {...this.props}
        />
      );
    }
    return null;
  },
  render() {
    let { onChangeText, onFocus, ...userProps } = this.props.textInputProps;
    //console.log('i am rendering')
    return (
      <View style={[defaultStyles.container, this.props.styles.container]}>
        <View style={[defaultStyles.textInputContainer, this.props.styles.textInputContainer]}>
          <TextInput
            { ...userProps }
            ref="textInput"
            autoFocus={this.props.autoFocus}
            style={[defaultStyles.textInput, this.props.styles.textInput]}
            onChangeText={onChangeText ? text => {this._onChangeText(text); onChangeText(text)} : this._onChangeText}
            value={this.state.text}
            placeholder={this.props.placeholder}
            onFocus={onFocus ? () => {this._onFocus(); onFocus()} : this._onFocus}
            clearButtonMode="while-editing"
            onEndEditing={()=> this.setState({listViewDisplayed: false})}
          />

        </View>

          {this._getListView()}

      </View>
    );
  },
});

module.exports = Autocomplete;
