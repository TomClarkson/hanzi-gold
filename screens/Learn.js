import React, { 
	Component, Image, AsyncStorage, StyleSheet, View, Text, TextInput, TouchableHighlight
} from 'react-native';

import SlideWrapper from '../animation/SlideWrapper';
import Colors from 'Colors';
import Dimensions from 'Dimensions';
import {connect} from 'react-redux/native';
import {loadDeck, markCardAsStudied, markCorrect, markWrong} from '../redux/deck';
import characters from 'Characters';
import {updatePoints} from '../redux/user';
import {Motion, spring} from 'react-motion/native';
import GoBackHeader from '../components/GoBackHeader';
import Button from '../components/Button';

class Learn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
  }
  componentDidMount() {
    // AsyncStorage.removeItem('user');
    this.props.dispatch(loadDeck(5));
  }
  tr() {
    this.setState({activeIndex: this.state.activeIndex + 1});
  }
  markAsStudied() {
    console.log('time ', markCardAsStudied)

    let {currentCard, cards, dispatch} = this.props;
    dispatch(markCardAsStudied(currentCard, cards));
  }
  getItemFromCard(card) {
    var character = characters.find(c => c.id == card.id);
    var id = card.id;
    if(card.lastAction == null || card.lastAction == 'WRONG') {
      var component = <StudyView 
        key={id}
        {...character} 
        markAsStudied={this.markAsStudied.bind(this)} />    

      return {id, component, height: 590};
    }

    var component = <QuestionView 
      key={id}
      {...character} 
      {...this.props} />    

    return {id, component, height: 590};
  }
  render() {
    var {currentCard, cards, points, navigator} = this.props;

    if(! currentCard) {
      return (
        <View style={styles.contentContainer}>
          <Text>...LOADING...</Text>
        </View>
      );      
    }

    var item = this.getItemFromCard(currentCard);

    var character = characters.find(c => c.id == currentCard.id);

    return (
      <View style={styles.contentContainer}>
        <GoBackHeader navigator={navigator} />
        <View style={styles.slideContainer}>
          <SlideWrapper item={item} />
        </View>
      </View>
    );
  }
}

var studyViewStyle = {
  itemContainer: {
    height: Dimensions.get('window').height - 110,
    width: Dimensions.get('window').width - 40,
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
    borderWidth: 0,
    padding: 20
  },
  englishHeader: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  hanziHeader: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 30,
    marginBottom: 15,
    fontWeight: "bold"
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  description: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  descriptionText: {
    fontSize: 20,
    lineHeight: 28
  },
  image: {  
    height: 250,
    width: 250,
  },
  confirmButtonContainer: {

  },
  confirmButton: {

  }
};


const StudyView = ({id, english, hanzi, description, image, markAsStudied}) => {
  return (
    <View style={studyViewStyle.itemContainer}>
      <View style={studyViewStyle.englishHeader}>
        <Text style={studyViewStyle.headerText}>{english}</Text>    
      </View>
      <View style={studyViewStyle.hanziHeader}>
        <Text style={studyViewStyle.headerText}>{hanzi}</Text>
      </View>
      <View style={studyViewStyle.imageContainer}>
        <Image style={studyViewStyle.image} source={{uri:image}} />        
      </View>
      <View style={studyViewStyle.description}>
        <Text style={studyViewStyle.descriptionText}>{description}</Text>
      </View>
      <View style={studyViewStyle.confirmButtonContainer}>
        <Button onPress={markAsStudied}>Got it!</Button>
      </View>
    </View>
  );
}

class QuestionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '', 
      wrong: false,
      completed: false
    };
    // this.answer = this.answer.bind(this);
  }
  answer() {
    var {hanzi, english, leitnerBox, dispatch, currentCard, cards, points} = this.props;

    var {answer} = this.state;

    if(answer == english) {
      if(leitnerBox == 4) {
        this.setState({completed: true});
        setTimeout(() => {
          dispatch(
            markCorrect(currentCard, cards, answer, {id: null, type: 'TYPE_MEANING'})
          );
        }, 2000);
      } else {
        dispatch(
          markCorrect(currentCard, cards, answer, {id: null, type: 'TYPE_MEANING'})
        );
      }
      dispatch(updatePoints(points + 1));
    } else {
      this.setState({wrong: true});
      setTimeout(() => {
        dispatch(
          markWrong(currentCard, cards, answer, {id: null, type: 'TYPE_MEANING'})
        );
        var newPoints = points == 0 ? 0 : points - 1;
        dispatch(updatePoints(newPoints));
      }, 2000);
    }
  }
  render() {
    var {answer} = this.state;
    var {id, english, hanzi, description, image} = this.props;
    var isWrong = this.state.wrong;
    var baseInputStyle = {height: 35};

    return (
      <View style={studyViewStyle.itemContainer}>
        <View style={studyViewStyle.hanziHeader}>
          <Text>{hanzi}</Text>
        </View>
        <View style={Object.assign({}, styles.description, {flexDirection: 'column'})}>
          {isWrong &&
            <Motion defaultStyle={{height: 0}} style={{height: spring(200)}}>
              {value => 
                <View style={{
                  height: value.height, 
                  marginBottom: 20,
                  justifyContent: 'center',
                  alignItems: 'center', 
                  backgroundColor: Colors.RED,
                  flexDirection: 'column'
                }}>
                  <Text style={{color: '#fff', textDecorationLine: 'line-through'}}>{this.state.answer}</Text>
                  <Text>{this.props.english}</Text>
                </View>
              }
            </Motion>
          }
          {!isWrong &&
            <View style={{flex: 1, flexDirection: 'column'}}>
              <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                autoFocus={true}
                 style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                 onChangeText={(answer) => this.setState({answer})}
                 onEndEditing={this.answer.bind(this)}
                 value={answer}
               />
            </View>
          }
        </View>
      </View>
    );
  }
}

export default connect(state => ({
  currentCard: state.deck.currentCard,
  cards: state.deck.cards,
  points: state.user.points
}))(Learn);

var styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.GREY_BG
  },
  slideContainer: {
    flex: 1,
    padding: 20,
    width: Dimensions.get('window').width,
    overflow: 'hidden',
  },
  topRow: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0, 0, 0, 0.15)'
  },
  points: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingTop: 18,
  },
  pointsText: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  pointsTextBold: {
    color: '#fff',
  }
}); 