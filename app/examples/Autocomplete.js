//'use strict';

var AutoComplete = require('react-native-autocomplete');
var Countries = require('./countries.json');
var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View,
    AlertIOS
} = React;

var Autocomplete = React.createClass({

    getInitialState: function() {
        return {data: []};
    },

    onTyping: function (text) {

        var countries = Countries.filter(function (country) {
            return country.name.toLowerCase().startsWith(text.toLowerCase())
        }).map(function (country) {
            return country.name;
        });

        this.setState({
            data:  countries
        });
    },

    render: function() {
        return (
            <View style={styles.container}>

                <AutoComplete
                    onTyping={this.onTyping}
                    onSelect={(e) => AlertIOS.alert('You choosed', e)}
                    onBlur={() => AlertIOS.alert('Blur')}
                    onFocus={() => null}
                    onSubmitEditing={(e) => AlertIOS.alert('onSubmitEditing')}
                    onEndEditing={(e) => AlertIOS.alert('onEndEditing')}

                    suggestions={this.state.data}

                    placeholder='This is a great placeholder'
                    style={styles.autocomplete}
                    clearButtonMode='always'
                    returnKeyType='go'
                    textAlign='center'
                    clearTextOnFocus={true}

                    maximumNumberOfAutoCompleteRows={10}
                    applyBoldEffectToAutoCompleteSuggestions={true}
                    reverseAutoCompleteSuggestionsBoldEffect={true}
                    showTextFieldDropShadowWhenAutoCompleteTableIsOpen={false}
                    autoCompleteTableViewHidden={false}

                    autoCompleteTableBorderColor='lightblue'
                    autoCompleteTableBackgroundColor='azure'
                    autoCompleteTableCornerRadius={0}
                    autoCompleteTableBorderWidth={1}

                    autoCompleteRowHeight={25}

                    autoCompleteFontSize={15}
                    autoCompleteRegularFontName='Helvetica Neue'
                    autoCompleteBoldFontName='Helvetica Bold'
                    autoCompleteTableCellTextColor={'gray'}
                />
            </View>
        );
    }
});

var styles = StyleSheet.create({
    autocomplete: {
        alignSelf: 'stretch',
        height: 30,
        backgroundColor: '#FFF',
        borderColor: 'lightblue',
        borderWidth: 1
    },
    container: {
        marginTop:20,
        flex: 1,
        backgroundColor: '#F5FCFF',
    },

});

module.exports = Autocomplete;
