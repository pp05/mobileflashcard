import {RECEIVE_DECKS, ADD_DECK, ADD_CARD} from '../actions'

function decksByName (state={}, action){
  switch (action.type) {
    case RECEIVE_DECKS:
    console.log('in receive_decks')
    console.log(state);
    console.log(action.decks);
    state = action.decks
         return state;
         /**{
                return state with action.decks merged to the state
              //  ...state,
              //  ...action.decks,
            }**/
    case ADD_DECK :
    case ADD_CARD :
    debugger
          return {
              //return state with new deck merged to the state
            ...state,
            [action.deck.title] : action.deck
          }


    default:
    return state;

  }

}

export default decksByName
