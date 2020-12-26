import { handleActions } from "redux-actions";
import { ACTION_TYPE, StarshipsCardsStoreCardsActionPayload } from "../actions/types";
import { StarshipsCardsState } from "./types";

export const initialState: StarshipsCardsState = {
  leftCard: undefined,
  rightCard: undefined,
  error: undefined,
}

export const starshipsCardsReducer = handleActions<StarshipsCardsState>({
  [ACTION_TYPE.STORE_STARSHIPS_CARDS]: (state, action) => ({
    leftCard: (action.payload as StarshipsCardsStoreCardsActionPayload).leftCard,
    rightCard: (action.payload as StarshipsCardsStoreCardsActionPayload).rightCard,
    error: undefined
  }),
  [ACTION_TYPE.STORE_ERROR_STARSHIPS_CARDS]: (state) => ({
    ...state,
    error: "We had some trouble to connect with space galactic. Roll again"
  }),
  [ACTION_TYPE.CLEAR_STARSHIPS_CARDS]: () => ({
    leftCard: undefined,
    rightCard: undefined,
    error: undefined
  })
}, {...initialState})