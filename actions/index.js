export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
import * as API from '../utils/api'
export const receiveDecks = (decks) => ({
    type: RECEIVE_DECKS,
    decks,
  })

export const deckAdded =(deck) => ({
    type: ADD_DECK,
    deck,
  });
export const cardAdded = (deck) => ({
    type: ADD_CARD,
    deck
});

export const addDeck = (deckName) => dispatch => (
  API.saveDeckTitle(deckName).then(deck => {
    dispatch(deckAdded(deck))
  })
);

export const fetchDecks = () => dispatch => (
  API.initApp().then(decks => dispatch(receiveDecks(decks)))
);

export const addCard = (deck) => dispatch =>(
  API.addCardToDeck(deck).then(deck => {
    dispatch(cardAdded(deck))
  } )
);

export const removeDeck = (deckName) => dispatch => (
  API.removeDeck(deckName).then(decks => dispatch(receiveDecks(decks)))
);
