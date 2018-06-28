import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform, Animated, Easing } from 'react-native';
import {Ionicons,FontAwesome, MaterialIcons } from '@expo/vector-icons';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux' ;
import DeckListView  from './components/DeckListView';
import NewDeck from './components/NewDeck';
import DeckView from './components/DeckView';
import NewCard from './components/NewCard';
import QuizView from './components/QuizView';
import AnswerView from './components/AnswerView';
import reducer from './reducers';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import {Constants} from 'expo';
import {pink, white} from './utils/colors';
import {setLocalNotification} from './utils/api'

function UdaciStatusBar({backgroundColor, ...props}){
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}
const Tabs = createBottomTabNavigator({
  DeckList: {
    screen: DeckListView,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='md-list-box' size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },

}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? pink : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : pink,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = createStackNavigator({
  Home : {
    screen : Tabs,
    navigationOptions : {
      header:null
    }
  },
  DeckView : {
    screen : DeckView,
    navigationOptions : {
      headerTintColor : white,
      headerStyle : {
        backgroundColor : pink,
        height: 30
      }
    }
  },
  NewCard : {
    screen : NewCard,
    navigationOptions : {
      headerTintColor : white,
      headerStyle : {
        backgroundColor : pink,
        height: 30
      }
    }
  },
  Quiz : {
    screen : QuizView,
    navigationOptions : {
      headerTintColor : white,
      headerStyle : {
        backgroundColor : pink,
        height: 30
      }
    }
  },
  AnswerView : {
    screen : AnswerView,
    navigationOptions : {
      headerTintColor : white,
      headerStyle : {
        backgroundColor : pink,
        height: 30
      }
    }
  },
},{
  transitionConfig: () => ({
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const { index } = scene;

      //const height = layout.initHeight;
      const width = layout.initWidth;
      const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange : [width, 0, -width]
        //for left to right transition outputRange : [-width, 0, width]
      });

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      });

      return { opacity, transform: [{ translateX }] };
    },
  })
})

const store = createStore(reducer,  compose(applyMiddleware(thunk)))
export default class App extends React.Component {
  componentDidMount (){
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
          <UdaciStatusBar backgroundColor={pink} barStyle="light-content" />
          <MainNavigator/>
        </View>
      </Provider>
    );
  }
}
