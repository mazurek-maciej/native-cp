import { GameState } from './game/reducers/types';
import { PeopleState } from './people/reducers/types';
import { PeopleCardsState } from './peopleCards/reducers/types';
import { StarshipsState } from './starships/reducers/types';
import { StarshipsCardsState } from './starshipsCards/reducers/types';

export interface RootState {
  people: PeopleState;
  peopleCards: PeopleCardsState;
  starships: StarshipsState;
  starshipsCards: StarshipsCardsState;
  game: GameState;
}
