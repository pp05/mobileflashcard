import React, { Component } from 'react';
import {View,Text, TextInput, KeyboardAvoidingView, StyleSheet} from 'react-native';
import ActionButton from './ActionButton'
import { connect } from 'react-redux';
import {addDeck} from '../actions';
import { NavigationActions } from 'react-navigation';
import {darkgray} from '../utils/colors';

class NewDeck extends Component {
  state = {
    title : ''
  }
  addNewDeck =() => {
    if(this.state.title){
     this.props.dispatch(addDeck(this.state.title));
      //navigate to home page
      this.setState({title:''});
      this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeck'}))

    }
  }
  render(){
    var disableButton = this.state.title !== '' ? false : true;
  return(
        <KeyboardAvoidingView style={styles.container}>
          <Text style={styles.title}>What is the name of this Deck ? </Text>
          <TextInput multiline={true} style={styles.input} onChangeText={(title) => this.setState({ title })} value={this.state.title} />
          <ActionButton style={{padding: 10}} onPress={this.addNewDeck} disabled={disableButton}>
            Add Deck
          </ActionButton>
        </KeyboardAvoidingView >
    )
  }
}
const styles = StyleSheet.create({
  title :{
    fontSize :20,
    color: darkgray
  },
  container : {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
  input : {
    //height : 50,
    alignSelf:'stretch',
    margin:10,
    padding: 10,
    color: darkgray
  }
})
export default connect()(NewDeck)
