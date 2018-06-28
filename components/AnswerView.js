import React, { Component } from 'react';
import { View,Text, StyleSheet } from 'react-native';
import {darkgray,white} from '../utils/colors';

class AnswerView extends Component{
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Back to Question"
    }
  }
  render(){
    const {answer} = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{answer}</Text>
      </View>
    )
  }
}
const styles= StyleSheet.create({
  container : {
    flex:1,
    justifyContent:'center',
    alignItems : 'center',
    backgroundColor: white
  },
  text : {
    fontSize:30,
    color: darkgray
  }
})
export default AnswerView
