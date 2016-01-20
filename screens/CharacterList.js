import React, { 
	Component, Image, AsyncStorage, StyleSheet, ScrollView, View, Text, TextInput, TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux/native';
import Colors from 'Colors';
import Dimensions from 'Dimensions';
import ExNavigator from '@exponent/react-native-navigator';
import ExRouter from 'ExRouter';
import getCardsToStudy from '../domain/getCardsToStudy';
import { getCards } from 'Storage';
import CurrentDeck from '../components/CurrentDeck';
import CharacterList from '../components/CharacterList';
import Header from '../components/Header';
import DrawerLayout from 'react-native-drawer-layout';
import SidebarNav from '../components/SidebarNav';
import makeCard from '../domain/makeCard';
import characters from 'Characters';

class CharacterListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []    
    };
  }
  openDrawer() {
    this.drawer.openDrawer();
  }
  closeDrawer() {
    this.drawer.closeDrawer();
  }
  render() {
    let {navigator, dispatch} = this.props;
    // let {cards} = this.state;
    let cards = characters.map(makeCard);

    return (
      <DrawerLayout
        ref={(drawer) => { return this.drawer = drawer }}
        drawerWidth={310}
        renderNavigationView={() => <SidebarNav navigator={navigator} onToggleDraw={this.closeDrawer.bind(this)} />}>
        <View style={styles.contentContainer}>
          <Header onToggleDraw={this.openDrawer.bind(this)} title="All Characters" />
          <View style={styles.container}>
            <ScrollView style={{flex: 1}}>
              <CharacterList dispatch={dispatch} navigator={navigator} cards={cards} />
            </ScrollView>
          </View>
        </View>
      </DrawerLayout>
    );
  }
}

export default connect(state => ({
  cardsInDeck: state.deck.cards,
  allCardsCompleted: state.deck.allCardsCompleted,
  username: state.user.username,
  points: state.user.points
}))(CharacterListScreen);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GREY_BG
  }
}); 