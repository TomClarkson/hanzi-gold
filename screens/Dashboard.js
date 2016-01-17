import React, { 
	Component, Image, AsyncStorage, StyleSheet, View, Text, TextInput, TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux/native';
import Colors from 'Colors';
import Dimensions from 'Dimensions';
import ExNavigator from '@exponent/react-native-navigator';
import ExRouter from 'ExRouter';
import getCardsToStudy from '../domain/getCardsToStudy';
// import { getCards, getAttempts } from '../storage';
import { loadDeck } from '../redux/deck';
import CurrentDeck from '../components/CurrentDeck';

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
    //   console.log('cards', cards)
    //   this.setState({cards});
    // });
    // getAttempts().then(attempts => {
    //  this.setState({attempts});
    // });
  }
  learn() {
    this.props.navigator.push(ExRouter.getLearnRoute());
  }
  render() {
    let {cardsInDeck} = this.props;
    let points = 20;
    let wordsLearnt = 20;
    let correct = 20;
    let wrong = 20;
    return (
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Hanzi Gold</Text>
        </View>
        <View style={styles.statsContainer}>
          <Text style={{flex: 3, marginTop: 25, fontSize: 80, color: '#666', alignSelf: 'center'}}>{points}</Text>
          <View style={{flex: 1, marginBottom: 0, flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text>Learnt: {wordsLearnt}</Text>
            <Text>Correct: {correct}</Text>
            <Text>Incorrect: {wrong}</Text>
          </View>  

        </View>
        <View style={styles.currentDeckController}>
          <View style={{flex: 0.8}}>
            <CurrentDeck cards={cardsInDeck} />
          </View>
          <View style={{flex: 0.2}}>
            <TouchableHighlight onPress={this.learn.bind(this)}>
              <Text>Learn</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(state => ({
  cardsInDeck: state.deck.cards,
  allCardsCompleted: state.deck.allCardsCompleted,
  username: state.user.username,
  points: state.user.points
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
    flex: 0.3,
    margin: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'column'
  },
  currentDeckController: {
    flex: 0.7,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 5
  }
}); 