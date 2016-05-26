'use strict';

const React = require('react-native');
const ViewPage = require('./ViewPage');
const StyleSheet = require('F8StyleSheet');

type Props = {

  data: Array<Object>;
  selectedIndex: number;
  onSelectedIndexChange?: (index: number) => void;
  renderCard: (index: number, data: Array<Object>) => ReactElement;
  style?: any;
};

class Carousel extends React.Component {
  props: Props;

  render() {
    let cards = [];
    const {data, selectedIndex, renderCard} = this.props;

    for (let i = 0; i < this.props.data.length; i++) {
      let content = null;
      //if (Math.abs(i - selectedIndex) < 2) {
        content = this.props.renderCard(i, data);
    //  }
      cards.push(content);
    }
    return (
      <ViewPage style={styles.carousel} {...this.props} bounces={true}>
        {cards}
      </ViewPage>
    );
  }
}

var styles = StyleSheet.create({
  carousel: {
    ios: {
      borderColor: 'red',
      //borderWidth: 1,
      overflow: 'visible',// thi is overflow property
      marginHorizontal: 10, //This is space for the overflow
    },
  }
});

module.exports = Carousel;
