import { initialState, peopleCardsReducer as reducer } from ".";
import { ACTION_TYPE } from "../actions/types";

import { PeopleCardsState } from "./types";

import validCard from '../../../_mocks_/validPersonTwoResponse.json';

describe('People Cards reducer', () => {
  it ('should return initial state', () => {
    const action = { type: '', payload: { leftCard: validCard, rightCard: validCard}, meta: {} };

    expect(reducer(undefined, action)).toEqual(initialState);
  })

  it('should handle STORE_PEOPLE_CARDS action', () => {
    const payload = {
      leftCard: validCard,
      rightCard: validCard
    }
    const action = {
      type: ACTION_TYPE.STORE_PEOPLE_CARDS,
      payload,
      meta: {}
    }
    const expectedState: PeopleCardsState = {
      leftCard: payload.leftCard,
      rightCard: payload.rightCard,
      error: undefined
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle STORE_ERROR_PEOPLE_CARDS action', () => {
    const action = {
      type: ACTION_TYPE.STORE_ERROR_PEOPLE_CARDS,
      payload: {},
      meta: {}
    }
    const expectedState: PeopleCardsState = {
      ...initialState,
      error: "We had some trouble to connect with space galactic. Roll again"
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle CLEAR_PEOPLE_CARDS action', () => {
    const action = {
      type: ACTION_TYPE.CLEAR_PEOPLE_CARDS,
      payload: {},
      meta: {}
    }
    const expectedState: PeopleCardsState = {
      leftCard: undefined,
      rightCard: undefined,
      error: undefined
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })
})