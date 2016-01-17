import React, { 
  Component, Image, StyleSheet, View, Text, TextInput, TouchableHighlight
} from 'react-native';
import moment from 'moment';

const boxesToColor = [
  '#FF0000',
  '#FF9C00',
  '#F5E701',
  '#9BE603',
  '#5AE539'
];

const LeitnerBox = ({leitnerBox}) => {
  var range = Array.from(Array(leitnerBox).keys());
  var boxes = range.map(index => 
    <View 
    key={index}
    style={{
      backgroundColor: boxesToColor[index],
      width: 15,
      width: (index + 5) * 2,
      height: (index + 1) * 4,
      marginRight: 2,
      marginTop: 20 - ((index + 1) * 4)
    }}>
    </View>
  );

  return (
    <View>
      {boxes}
    </View>
  );
};


export default class CurrentDeck extends Component {
  render() {
    let {cards} = this.props;
    
    return (
      <View style={styles.container}>
        <View style={styles.rowWrapper} key={-1}>
          <Text>Hanzi</Text> 
          <Text>Level</Text>
          <Text>Next Review</Text>
        </View>
        {cards.map(c =>
         <View style={styles.rowWrapper} key={c.id}>
           <Text>{c.hanzi}</Text> 
           <View><LeitnerBox leitnerBox={c.leitnerBox} /></View>
           <Text>{moment(c.nextReview).calendar()}</Text>
         </View>
        )}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column'
  },
  rowWrapper: {
    flex: 1, 
    marginTop: 10, 
    marginLeft: 20, 
    marginRight: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-around'
  }
}); 