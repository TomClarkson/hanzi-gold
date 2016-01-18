import React, { 
  Component, Image, StyleSheet, View, Text, TextInput, TouchableHighlight
} from 'react-native';
import moment from 'moment';
import LeitnerBox from './LeitnerBox';

export default class CharacterList extends Component {
  render() {
    let {cards} = this.props;
    
    return (
      <View style={styles.container}>
        <View style={styles.rowWrapper} key={-1}>
          <Text style={[styles.headerText, styles.quarterGrid]}>Word</Text>
          <Text style={[styles.headerText, styles.quarterGrid]}>Hanzi</Text> 
          <Text style={[styles.headerText, styles.quarterGrid]}>Level</Text>
          <Text style={[styles.headerText, styles.quarterGrid]}>Detail</Text> 
        </View>
        {cards.map(c =>
         <View style={styles.rowWrapper} key={c.id}>
          <Text style={[styles.englishText, styles.quarterGrid]}>{c.english}</Text>
          <Text style={[styles.hanziText, styles.quarterGrid]}>{c.hanzi}</Text> 
          <View style={styles.quarterGrid}>
            <LeitnerBox leitnerBox={c.leitnerBox} />
          </View>
          <Text style={[styles.headerText, styles.quarterGrid]}>-></Text>
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
    marginLeft: 20, 
    marginRight: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-around'
  },
  hanziText: {
    fontSize: 24,
  },
  englishText: {
    fontSize: 22,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  quarterGrid: {
    flex: 0.25
  }
}); 