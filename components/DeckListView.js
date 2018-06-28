import React, { Component } from 'react';
import {View,Text,ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {fetchDecks} from  '../actions';
import {receiveDecks} from '../reducers';
import { connect } from 'react-redux';
import {gray,lightgray,white} from '../utils/colors';
import {AppLoading} from 'expo'


function DeckCard (title, numberOfCards, deckClickHandler){
  var cardsText = numberOfCards === 1 ? numberOfCards + ' card' : numberOfCards + ' cards'
  return (
    <TouchableOpacity key={title} style={styles.deck}  onPress={()=>{deckClickHandler(title)}}>
      <Text style={styles.deckHeader}> {title} </Text>
      <Text style={styles.deckSecondLine}> {cardsText} </Text>
    </TouchableOpacity>
  )
}
class DeckListView extends Component {
state ={
  appReady : false
}
componentWillMount (){
  const {dispatch} = this.props;
  dispatch(fetchDecks()).then(() => this.setState(() => ({appReady: true})))
}

handleDeckPressed = (deckName) => {
  this.props.navigation.navigate('DeckView',{deckName:deckName} )
}
  render(){
    const {decks} = this.props;
    console.log(decks);
    if(!this.state.appReady){
      return (<AppLoading/>)
    }
    if(Object.keys(decks).length === 0){
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.deckHeader}>No Decks Added yet.</Text>
          <Text style={styles.deckHeader}>Add a deck by visting the Add Deck tab.</Text>
        </View>)
    }
  return(
        <ScrollView  contentContainerStyle={styles.contentContainer}>
        {Object.keys(decks).map(deckName => {
          var deck = decks[deckName];
          debugger
          var title = deck.title;
          var cards = deck.questions.length;
          return DeckCard(title,cards, this.handleDeckPressed);
        })}
        </ScrollView>
      )
  }
}

function mapStateToProps (decks) {
  return {
    decks : decks
  }
}
const styles = StyleSheet.create({
  deck: {
     //flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
     padding: 20,
     margin: 5,
     borderColor: '#d6d6d6',
     borderRadius: 5,
     borderWidth: 1,
     backgroundColor: '#eee'
  },
  deckHeader :{
    fontSize:15,
    color:gray
  },
  deckSecondLine:{
    fontSize:10,
    color:lightgray
  },
  contentContainer :{
    backgroundColor : white
  },
  emptyContainer : {
    backgroundColor : white,
    flex : 1,
    justifyContent: 'center',
    alignItems : 'center'
  }
})
export default connect( mapStateToProps)(DeckListView)
