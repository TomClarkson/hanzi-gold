import React, { 
	Component, Image, AsyncStorage, StyleSheet, View, Text, TextInput, TouchableHighlight, Platform
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
import CurrentDeck from '../components/CurrentDeck';

class Learn extends React.Component {
  componentDidMount() {
    this.props.dispatch(loadDeck(5));
  }
  markAsStudied() {
    let {currentCard, cards, dispatch} = this.props;
    dispatch(markCardAsStudied(currentCard, cards));
  }
  getItemFromCard(card) {
    if(this.props.allCardsCompleted) {
      var component = (
        <CompletedView />       
      );

      return {id: -1, component, height: 590};
    }

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
    padding: 15
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
    fontSize: 28,
    marginBottom: 10,
    fontWeight: "bold"
  },
  hanziHeaderText: {
    fontSize: 35,
    marginBottom: 5,
    fontWeight: "bold"
  },
  englishHeaderText: {
    fontSize: 25,
    marginBottom: 5,
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
    fontSize: 18,
    lineHeight: 30
  },
  image: {  
    height: 200,
    width: 250,
  },
  confirmButtonContainer: {

  },
  confirmButton: {

  }
};

const CompletedView = ({id, english, hanzi, description, image, markAsStudied}) => {
  let textStyle = {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10
  };

  return (
    <View style={{flex: 1}}>
      <View style={studyViewStyle.itemContainer}>
        <Text style={{fontSize: 30, margin: 15, textAlign: 'center', fontWeight: 'bold'}}>You win!</Text>
        <Text style={textStyle}>You have learnt all of our characters</Text>
        <Text style={textStyle}>Email tom@convoconnect.com with the code 01-HGEXPONENT-2016 and you will get our premium upgrades for free!</Text>
        <Text style={textStyle}>We will email you when the next version of Hanzi Gold is released.</Text> 
        <Text style={textStyle}>For more information visit hanzigold.com</Text> 
      </View> 
    </View>
  );
}

const StudyView = ({id, english, hanzi, description, image, markAsStudied}) => {
  return (
    <View style={studyViewStyle.itemContainer}>
      <View style={studyViewStyle.englishHeader}>
        <Text style={studyViewStyle.englishHeaderText}>{english}</Text>    
      </View>
      <View style={studyViewStyle.hanziHeader}>
        <Text style={studyViewStyle.hanziHeaderText}>{hanzi}</Text>
      </View>
      <View style={studyViewStyle.imageContainer}>
        <Image style={studyViewStyle.image} source={{uri:image}} />        
      </View>
      <View style={studyViewStyle.description}>
        <Text style={
          [studyViewStyle.descriptionText, description.length > 200 ? {fontSize: 16, lineHeight: 24} : {}]
        }>{description}</Text>
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
      this.setState({answer: '', completed: true});
      dispatch(
        markCorrect(currentCard, cards, answer, {id: null, type: 'TYPE_MEANING'})
      );
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

    var keyBoardHeight = Platform.OS === 'ios' ? 300 : 400;

    return (
      <View style={studyViewStyle.itemContainer}>
        <View style={{height: Dimensions.get('window').height - keyBoardHeight}}>
          <View style={[{flex: 0.5}, studyViewStyle.hanziHeader]}>
            <Text style={{fontSize: 50}}>{hanzi}</Text>
          </View>
          <View style={[styles.description, {flex: 0.5, flexDirection: 'column'}]}>
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
                    <Text style={{color: '#fff', fontSize: 20, textDecorationLine: 'line-through'}}>{this.state.answer}</Text>
                    <Text style={{fontSize: 20}}>{this.props.english}</Text>
                  </View>
                }
              </Motion>
            }
            {!isWrong &&
              <View style={{flex: 1}}>
                <View style={{
                  borderColor: '#eee', 
                  borderWidth: 2, 
                  borderRadius: 10, 
                  padding: 15, 
                  margin: 15}}>
                  <TextInput
                    style={{height: 50}}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    autoCorrect={false}
                    autoCapitalize="none"
                    autoFocus={true}
                    placeholder="Enter english meaning"
                    onChangeText={(answer) => this.setState({answer})}
                    onSubmitEditing={this.answer.bind(this)}
                    value={answer} />
                </View>
              </View>
            }
          </View>
        </View>
      </View>
    );
  }
}

export default connect(state => ({
  allCardsCompleted: state.deck.allCardsCompleted,
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