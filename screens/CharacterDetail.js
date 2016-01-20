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
import GoBackHeader from '../components/GoBackHeader';

var studyViewStyle = {
  itemContainer: {
    height: Dimensions.get('window').height - 110,
    width: Dimensions.get('window').width - 40,
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
    borderWidth: 0,
    padding: 15,
    marginLeft: 15,
    marginTop: 15
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

class CharacterDetail extends React.Component {
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
    let {navigator, dispatch, characterId} = this.props;

    console.log(
      characters.find(c => c.id == characterId)
    );

    let character = characters.find(c => c.id == characterId);
    
    let {english, hanzi, image, description} = character;

    return (        
      <View style={styles.container}>
        <GoBackHeader navigator={navigator} />
        <View style={styles.container}>
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
          </View>
        </View>
      </View>
    );
  }
}

export default connect(state => ({
  characterId: state.characterDetail.activeId,
  state: state
}))(CharacterDetail);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GREY_BG
  }
}); 