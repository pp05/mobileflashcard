import React, { Component } from 'react';
import { connect } from 'react-redux';
import {KeyboardAvoidingView, TextInput, StyleSheet, Text} from 'react-native';
import ActionButton from './ActionButton';
import {gray, darkgray, lightgray, white} from '../utils/colors';
import {addCard} from '../actions'

class NewCard extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Add Card"
    }
  }

  state = {
    question:'',
    answer:''
  }

  saveCard = () => {
    console.log('save card called');
    if(this.state.question !== '' && this.state.answer !== ''){
      if(!this.props.deck.questions)
        this.props.deck.questions = [];
      var card = {
        question: this.state.question,
        answer : this.state.answer
      }
      this.props.deck.questions.push(card);
      this.props.dispatch(addCard(this.props.deck));
      this.props.navigation.goBack();
    }
  }

  render(){
    var buttonDisabled = (this.state.question !== '' && this.state.answer !== '') ? false : true;

    return (
      <KeyboardAvoidingView style={styles.container}>
          <Text style={styles.title}>Add a question</Text>
          <TextInput multiline={true} style={styles.input}
            onChangeText={(question) => this.setState({ question })} value={this.state.question} />
          <Text style={[styles.title,{marginTop:10}]}>Add an answer for the question</Text>
          <TextInput multiline={true} style={styles.input}
            onChangeText={(answer) => this.setState({ answer })} value={this.state.answer} />
          <ActionButton style={{padding: 10}} onPress={this.saveCard} disabled={buttonDisabled}>
            Save
          </ActionButton>
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps (state, { navigation }) {
  const { deckName } = navigation.state.params
  return {
    deckName,
    deck : state[deckName]
  }
}
const styles = StyleSheet.create({
  container:{
    flex : 1,
    justifyContent : 'center',
    alignItems: 'center',
    backgroundColor: white
  },
  input : {
    //height : 50,
    alignSelf:'stretch',
    margin:10,
    padding: 10,
    color: darkgray
  },
  title : {
    fontSize:20,
    color : gray
  },
})
export default connect(mapStateToProps)(NewCard)
