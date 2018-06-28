import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import ActionButton from './ActionButton';
import {gray, darkgray, lightgray, white} from '../utils/colors';
import {removeDeck} from '../actions'

class DeckView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckName } = navigation.state.params
    return {
      title: deckName
    }
  }
  addCard = () =>{
    console.log('addCard called for ' + this.props.deckName);
    this.props.navigation.navigate('NewCard',{deckName: this.props.deckName} )
  }
  startQuiz = () => {
    if(this.props.deck.questions.length > 0){
      console.log('startQuiz called for ' + this.props.deckName);
      this.props.navigation.navigate('Quiz',{deckName: this.props.deckName} )
    }
  }
  deleteDeck = () => {
    this.props.dispatch(removeDeck(this.props.deckName));
    this.props.navigation.goBack();
  }
  render(){
    const {deck} = this.props;
    if(!deck){
      return(
        <View>
          <Text> This deck is not available. </Text>
        </View>)
    }
    var cardText = deck.questions && deck.questions.length === 1 ? deck.questions.length + ' card' :
                  deck.questions.length + ' cards';
    var startQuizDisabled = deck.questions.length > 0 ? false : true;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.subtitle}>{cardText}</Text>
        <View style={styles.buttonContainer}>
        <ActionButton style={{padding: 10}} onPress={this.addCard}>
          Add Card
        </ActionButton>
        <ActionButton style={{padding: 10}} onPress={this.startQuiz} disabled={startQuizDisabled}>
          Start Quiz
        </ActionButton>
        <ActionButton style={{padding: 10}} onPress={this.deleteDeck}>
          Delete Deck
        </ActionButton>
        </View>
      </View>
    )
  }
}

function mapStateToProps (state, { navigation }) {
  const { deckName } = navigation.state.params

  return {
    deckName,
    deck: state[deckName],
  }
}
const styles = StyleSheet.create({
  container:{
    flex : 1,
    justifyContent : 'center',
    alignItems: 'center',
    backgroundColor: white
  },
  buttonContainer :{
    justifyContent: 'flex-end',
    margin : 10
  },
  title : {
    fontSize:30,
    color : gray
  },
  subtitle :{
    fontSize : 20,
    color : lightgray
  }
})
export default connect(mapStateToProps)(DeckView)
