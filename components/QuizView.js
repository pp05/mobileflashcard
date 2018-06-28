import React, { Component } from 'react';
import { connect } from 'react-redux';
import {KeyboardAvoidingView, TextInput, StyleSheet, Text, View, Animated, Easing} from 'react-native';
import ActionButton from './ActionButton';
import TextButton from './TextButton';
import {gray, darkgray, lightgray, white, pink} from '../utils/colors';
import { createStackNavigator } from 'react-navigation';
import {addCard} from '../actions';
import {clearLocalNotification,setLocalNotification} from '../utils/api'

function QuizCompletedView({totalScore, quizClicked,  goHome}){
  return (
    <View style={[styles.container, {justifyContent:'center'}]}>
      <View style={{justifyContent:'center', alignItems:'center'}}>
        <Text style={styles.supercontent}>Quiz completed</Text>
        <Text style={styles.supercontent}>Your Score</Text>
        <Text style={styles.supercontent}>{totalScore}</Text>
      </View>
      <View style={{justifyContent:'center', alignItems:'center'}}>
        <TextButton style={{margin: 20}} onPress={quizClicked}>
          Retake Quiz
        </TextButton>
        <TextButton style={{margin: 20}} onPress={goHome}>
          Go to Deck
        </TextButton>
      </View>
    </View>)
}
class QuizView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckName } = navigation.state.params
    return {
      title: "Quiz for Deck -" + deckName
    }
  }

  state = {
    correctAnswers : 0,
    currentQuestionNo : 0
  }
  restartQuiz = ()=>{
    this.setState({
      correctAnswers : 0,
      currentQuestionNo : 0
    })
  }
  goHome = () =>{
    this.props.navigation.goBack();
  }
  answerCompleted = (iscorrect) =>{
    if(iscorrect){
      this.setState(prevState => {
        return {...prevState, correctAnswers : prevState.correctAnswers+1}
      })
    }
    this.setState(prevState => {
      return {...prevState, currentQuestionNo : prevState.currentQuestionNo+1}
    })
  }
  peekAnswer = () => {
    var answerValue = this.props.questionaire[this.state.currentQuestionNo]['answer'];
    console.log(answerValue);
    this.props.navigation.navigate('AnswerView', {answer : answerValue})
    //this.props.navigation.navigate('AnswerView' )
  }
  render(){
    const {correctAnswers, currentQuestionNo} = this.state;
    var totalQuestions = this.props.questionaire.length ;
    var attempt = (currentQuestionNo + 1) + '/' + totalQuestions;
    var card = this.props.questionaire[currentQuestionNo];
    if(currentQuestionNo === totalQuestions){
      //quiz completed.. so set the notification for tomorrow
      clearLocalNotification().then(setLocalNotification())
      var totalScore = correctAnswers + '/' + totalQuestions;
      return (<QuizCompletedView totalScore={totalScore} quizClicked={this.restartQuiz} goHome={this.goHome}/>)
    }

    return (
      <View style={styles.container}>
        <Text style={styles.subcontent}>{attempt}</Text>
        <View style={styles.subcontainer}>
          <Text style={styles.content}>{card.question}</Text>
          <TextButton style={{margin: 20}} onPress={this.peekAnswer}>
            Peek Answer
          </TextButton>
          <ActionButton style={{padding: 10}} onPress={()=> this.answerCompleted(true)}>
            Correct
          </ActionButton>
          <ActionButton style={{padding: 10}} onPress={()=> this.answerCompleted(false)}>
            Incorrect
          </ActionButton>
        </View>
      </View>
    )
  }
}
function mapStateToProps(state, { navigation }){
    const { deckName } = navigation.state.params
  return {
    questionaire : state[deckName].questions
  }
}
const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor: white
  },
  subcontainer :{
    justifyContent : 'center',
    alignItems: 'center',
    backgroundColor: white
  },
  content :{
    fontSize : 25,
    color:darkgray
  },
  subcontent : {
    fontSize: 12,
    color: gray
  },
  supercontent : {
    fontSize: 30,
    color: darkgray,
    alignSelf:'center'
  }
})
export default connect(mapStateToProps)(QuizView)
