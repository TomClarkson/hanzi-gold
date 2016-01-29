import React, {
  Component, Image, StyleSheet, View, Text, TextInput, TouchableHighlight, ScrollView, Dimensions
} from 'react-native';
import moment from 'moment';
import LeitnerBox from './LeitnerBox';
import { loadCharacter } from '../redux/characterDetail';
import ExRouter from 'ExRouter';

export default class CharacterList extends Component {
  goToCharacter(characterId) {

    this.props.dispatch(loadCharacter(characterId));
    this.props.navigator.push(ExRouter.getCharacterDetailRoute());
  }
  render() {
    let {cards} = this.props;

    return (
      <ScrollView style={styles.container}>
        {cards.map(c =>
          <TouchableHighlight onPress={this.goToCharacter.bind(this, c.id)} key={c.id}>
           <View style={styles.rowWrapper} key={c.id}>
            <View style={styles.hanziColumn}>
              <Text style={styles.hanziText}>{c.hanzi}</Text>
            </View>
            <View style={{flex: 0.6}}>
              <Text style={{fontSize: 26}}>{c.english}</Text>
            </View>
           </View>
          </TouchableHighlight>
        )}
      </ScrollView>
    );
  }
}

var screenHeight = Dimensions.get('window').height;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    height: screenHeight - 40,
    flexDirection: 'column'
  },
  rowWrapper: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderWidth: 0,
    borderRadius: 5
  },
  hanziColumn: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  hanziText: {
    fontSize: 34,
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
