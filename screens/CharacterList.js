import React, { 
	Component, Image, AsyncStorage, StyleSheet, View, Text, TextInput, TouchableHighlight
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

class CharacterListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []    
    };
  }
  componentDidMount() {
    // getCards();
    // merge with characters
      // .then(cards => cards.map(makeCard))
      // .then(cards => {
      //   console.log('c', cards);
      //   this.setState({cards});
      // });
  }
  openDrawer() {
    this.drawer.openDrawer();
  }
  closeDrawer() {
    this.drawer.closeDrawer();
  }
  render() {
    let {navigator} = this.props;
    let {cards} = this.state;
    var correct = cards.reduce((acc,c) => acc + c.correct, 0);
    var wrong = cards.reduce((acc,c) => acc + c.wrong, 0);
    var wordsLearnt = cards.filter(c => c.leitnerBox == 5).length;

    return (
      <DrawerLayout
        ref={(drawer) => { return this.drawer = drawer }}
        drawerWidth={310}
        renderNavigationView={() => <SidebarNav navigator={navigator} onToggleDraw={this.closeDrawer.bind(this)} />}>
        <View style={styles.contentContainer}>
          <Header onToggleDraw={this.openDrawer.bind(this)} title="All Characters" />
          <View style={styles.learnContainer}>
            <View style={styles.currentDeckWrapper}>
              <View style={{flex: 1, marginLeft: 15}}>
                <CharacterList cards={cards} />
              </View>
            </View>
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
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.GREY_BG,
    flexDirection: 'column'
  },
  header: {
    height: 70,
    paddingTop: 10,
    backgroundColor: Colors.GOLD,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    color: Colors.WHITE,
    fontSize: 22,
    fontWeight: "bold"
  },
  statsContainer: {
    flex: 0.2,
    margin: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'column'
  },
  learnContainer: {
    flex: 0.8,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 5
  },
  currentDeckWrapper: {
    flex: 0.8
  },
  learnButtonWrapper: {
    marginLeft: 30,
    marginRight: 30,
    flex: 0.2,
    marginTop: 15
  }
}); 