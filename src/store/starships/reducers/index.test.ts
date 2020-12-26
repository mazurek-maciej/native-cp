import { initialState, starshipsReducer as reducer } from ".";

import { StatusOfAPICall } from "../../game/models/StatusOfApiCall";
import { ACTION_TYPE } from "../actions/types";
import { StarshipsState } from "./types";

import validStarshipsResponse from '../../../_mocks_/validStarshipsResponse.json';

describe('Starships reducer', () => {
  it ('should return initial state', () => {
    const action = { type: '', payload: '', meta: {} };

    expect(reducer(undefined, action)).toEqual(initialState);
  })

  it('should handle GET_REQUEST action', () => {
    const action = { type: ACTION_TYPE.GET_REQUEST, payload: '', meta: {} };
    const expectedState: StarshipsState = {
      ...initialState,
      status: StatusOfAPICall.FETCHING
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle GET_SUCCESS action', () => {
    const action = {
      type: ACTION_TYPE.GET_SUCCESS,
      payload: { data: validStarshipsResponse },
      meta: {}
    };
    const expectedState: StarshipsState = {
      status: StatusOfAPICall.SUCCESS,
      data: validStarshipsResponse.results,
      error: undefined
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle GET_FAILURE action', () => {
    const response = {
      detail: "Not found"
    }
    const action = {
      type: ACTION_TYPE.GET_FAILURE,
      payload: response,
      meta: {}
    };
    const expectedState: StarshipsState = {
      status: StatusOfAPICall.FAILURE,
      data: undefined,
      error: response.detail
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })
})