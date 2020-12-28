import { Action } from 'redux-actions';
import { Starship } from '../../starships/models/Starship';

export enum ACTION_TYPE {
  STORE_STARSHIPS_CARDS = 'STORE_STARSHIPS_CARDS',
  STORE_ERROR_STARSHIPS_CARDS = 'STORE_ERROR_STARSHIPS_CARDS',
  CLEAR_STARSHIPS_CARDS = 'CLEAR_STARSHIPS_CARDS',
}

export interface StarshipsCardsAction<Payload> extends Action<Payload> {}

export interface StarshipsCardsActionPayload {}

export interface StarshipsCardsStoreCardsActionPayload
  extends StarshipsCardsActionPayload {
  leftCard: Starship;
  rightCard: Starship;
}
