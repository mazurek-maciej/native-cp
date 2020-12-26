import { initialState, starshipsCardsReducer as reducer } from ".";
import { ACTION_TYPE } from "../actions/types";

import validCards from '../../../_mocks_/validStarshipsResponse.json';
import { StarshipsCardsState } from "./types";

describe('People Cards reducer', () => {
  const leftCard = validCards.results[0];
  const rightCard = validCards.results[1];

  it ('should return initial state', () => {
    const action = {
      type: '',
      payload: { leftCard, rightCard },
      meta: {}
    };

    expect(reducer(undefined, action)).toEqual(initialState);
  })

  it('should handle STORE_STARSHIPS_CARDS action', () => {
    const payload = {
      leftCard,
      rightCard
    }
    const action = {
      type: ACTION_TYPE.STORE_STARSHIPS_CARDS,
      payload,
      meta: {}
    }
    const expectedState: StarshipsCardsState = {
      leftCard: payload.leftCard,
      rightCard: payload.rightCard,
      error: undefined
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle STORE_ERROR_STARSHIPS_CARDS action', () => {
    const action = {
      type: ACTION_TYPE.STORE_ERROR_STARSHIPS_CARDS,
      payload: {},
      meta: {}
    }
    const expectedState: StarshipsCardsState = {
      ...initialState,
      error: "We had some trouble to connect with space galactic. Roll again"
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle CLEAR_STARSHIPS_CARDS action', () => {
    const action = {
      type: ACTION_TYPE.CLEAR_STARSHIPS_CARDS,
      payload: {},
      meta: {}
    }
    const expectedState: StarshipsCardsState = {
      leftCard: undefined,
      rightCard: undefined,
      error: undefined
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })
})