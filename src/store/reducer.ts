import { combineReducers } from 'redux';
import { gameReducer } from './game/reducers';
import { peopleReducer } from './people/reducers';
import { peopleCardsReducer } from './peopleCards/reducers';
import { starshipsReducer } from './starships/reducers';
import { starshipsCardsReducer } from './starshipsCards/reducers';

import { RootState } from './state';

export const rootReducer = combineReducers<RootState>({
  people: peopleReducer,
  peopleCards: peopleCardsReducer,
  starships: starshipsReducer,
  starshipsCards: starshipsCardsReducer,
  game: gameReducer,
});
