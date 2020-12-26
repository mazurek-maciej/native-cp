import { Action } from "redux-actions";
import { People } from "../../people/models/People";

export enum ACTION_TYPE {
  STORE_PEOPLE_CARDS = 'STORE_PEOPLE_CARDS',
  STORE_ERROR_PEOPLE_CARDS = 'STORE_ERROR_PEOPLE_CARDS',
  CLEAR_PEOPLE_CARDS = 'CLEAR_PEOPLE_CARDS'
}

export interface PeopleCardsAction<Payload> extends Action<Payload> {}

export interface PeopleCardsActionPayload {}

export interface PeopleCardsStoreCardsActionPayload extends PeopleCardsActionPayload {
  leftCard: People;
  rightCard: People;
}
