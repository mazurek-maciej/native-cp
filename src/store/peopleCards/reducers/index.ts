import { handleActions } from "redux-actions";
import { ACTION_TYPE, PeopleCardsStoreCardsActionPayload } from "../actions/types";
import { PeopleCardsState } from "./types";

export const initialState: PeopleCardsState = {
  leftCard: undefined,
  rightCard: undefined,
  error: undefined
} 

export const peopleCardsReducer = handleActions<PeopleCardsState>({
  [ACTION_TYPE.STORE_PEOPLE_CARDS]: (state, action) => ({
    leftCard: (action.payload as PeopleCardsStoreCardsActionPayload).leftCard,
    rightCard: (action.payload as PeopleCardsStoreCardsActionPayload).rightCard,
    error: undefined
  }),
  [ACTION_TYPE.STORE_ERROR_PEOPLE_CARDS]: (state, action) => ({
    ...state,
    error: "We had some trouble to connect with space galactic. Roll again"
  }),
  [ACTION_TYPE.CLEAR_PEOPLE_CARDS]: () => ({
    leftCard: undefined,
    rightCard: undefined,
    error: undefined
  })
}, {...initialState})