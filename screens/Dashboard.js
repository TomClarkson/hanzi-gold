import React, { 
	Component, Image, AsyncStorage, StyleSheet, View, Text, TextInput, TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux/native';
import Colors from 'Colors';
import Dimensions from 'Dimensions';
import ExNavigator from '@exponent/react-native-navigator';
import ExRouter from 'ExRouter';
import getCardsToStudy from '../domain/getCardsToStudy';
import { getCards, getAttempts } from 'Storage';
import { loadDeck } from '../redux/deck';
import CurrentDeck from '../components/CurrentDeck';
import Button from '../components/Button';
import Header from '../components/Header';
import DrawerLayout from 'react-native-drawer-layout';
import SidebarNav from '../components/SidebarNav';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      attempts: []
    };
  }
  componentDidMount() {
    this.props.dispatch(loadDeck(5)); 
    // getCards().then(cards => {
    //   this.setState({cards});
    // });
    // getAttempts().then(attempts => {
    //  this.setState({attempts});
    // });
  }
  learn() {
    this.props.navigator.push(ExRouter.getLearnRoute());
  }
  openDrawer() {
    this.drawer.openDrawer();
  }
  closeDrawer() {
    this.drawer.closeDrawer();
  }
  render() {
    let {cardsInDeck, points, wordsLearnt, correct, wrong, username, allCardsCompleted, navigator} = this.props;
    let {cards} = this.state;

    return (
      <DrawerLayout
        ref={(drawer) => { return this.drawer = drawer }}
        drawerWidth={310}
        renderNavigationView={() => <SidebarNav navigator={navigator} onToggleDraw={this.closeDrawer.bind(this)} />}>
        <View style={styles.contentContainer}>
          <Header onToggleDraw={this.openDrawer.bind(this)} title="Hanzi Gold" />
          <View style={styles.statsContainer}>
            <Text style={{flex: 2, marginTop: 15, fontWeight: "bold", fontSize: 44, color: Colors.BLACK, alignSelf: 'center'}}>{points}</Text>
            <View style={{flex: 1, marginRight: 15, marginLeft: 15, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-around'}}>
              <Text style={{fontSize: 18}}>Learnt: {wordsLearnt}</Text>
              <Text style={{fontSize: 18}}>Correct: {correct}</Text>
              <Text style={{fontSize: 18}}>Incorrect: {wrong}</Text>
            </View>
          </View>
          <View style={styles.learnContainer}>
            <View style={styles.currentDeckWrapper}>
              <View style={{marginLeft: 35, marginTop: 25}}>
                <Text style={{fontSize: 18, marginBottom: 15, fontWeight: "bold"}}>
                  Next Hanzi to learn
                </Text>
              </View>
              <View style={{flex: 1, marginLeft: 15}}>
                {allCardsCompleted && (<Text>You have completed all Hanzi</Text>)}
                {!allCardsCompleted && 
                  <CurrentDeck cards={cardsInDeck} />
                }
              </View>
            </View>
            <View style={styles.learnButtonWrapper}>
              <Button onPress={this.learn.bind(this)}>Learn</Button>
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
  points: state.user.points,
  correct: state.user.correct,
  wrong: state.user.wrong,
  wordsLearnt: state.user.wordsLearnt
}))(Dashboard);

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