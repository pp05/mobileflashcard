import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const FLASHCARDS_STORAGE_KEY = 'Flashcards:decks'
const FLASHCARDS_NOTIFICATION_KEY = 'Flashcards:notifications'
/**
Sample datastructure
{
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

**/
export function saveDeckTitle(title) {
  const deck = {
    title: title,
    questions: []
  }

  AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({[title]:deck}))
  return(getDeck(title));
}

export function initApp (){
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then((result)=>{
      debugger
        if(!result){
          AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY,JSON.stringify({}));
          return getDecks();
        }else{
          return getDecks();
        }
    })
}

export function getDecks() {
      return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then( (result) => {
        debugger
          console.log('in api ')
          console.log( JSON.parse(result));
          return JSON.parse(result)
      })
}

export function getDeck(title) {
  return getDecks().then((decks) => decks[title])
}

export function removeDeck(title) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((results) => {
      const decks = JSON.parse(results)
      //decks[key] = undefined
      delete decks[title]
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks))
      return getDecks();
    })
}

export function addCardToDeck(deck) {
   AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({[deck.title]:deck}));
   return getDeck(deck.title);
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(FLASHCARDS_NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}
function createNotification () {
  return {
    title: 'Complete a quiz!',
    body: "👋 don't forget to complete quiz today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(FLASHCARDS_NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
                if (status === 'granted') {
                  Notifications.cancelAllScheduledNotificationsAsync()
                  let tomorrow = new Date()
                  tomorrow.setDate(tomorrow.getDate() + 1)
                  tomorrow.setHours(20)
                  tomorrow.setMinutes(0)
                  Notifications.
                    scheduleLocalNotificationAsync(createNotification(),{time: tomorrow,repeat: 'day'})
                  AsyncStorage.setItem(FLASHCARDS_NOTIFICATION_KEY, JSON.stringify(true))
                }
            })
        }
    })
}
