import { initialState, peopleReducer as reducer } from ".";

import { StatusOfAPICall } from "../../game/models/StatusOfApiCall";
import { ACTION_TYPE } from "../actions/types";
import { PeopleState } from "./types";

import validPeopleResponse from '../../../_mocks_/validPersonOneResponse.json';

describe('People reducer', () => {
  it ('should return initial state', () => {
    const action = { type: '', payload: '', meta: {} };

    expect(reducer(undefined, action)).toEqual(initialState);
  })

  it('should handle GET_REQUEST action', () => {
    const action = { type: ACTION_TYPE.GET_REQUEST, payload: '', meta: {} };
    const expectedState: PeopleState = {
      ...initialState,
      status: StatusOfAPICall.FETCHING
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle GET_SUCCESS action', () => {
    const action = {
      type: ACTION_TYPE.GET_SUCCESS,
      payload: { data: validPeopleResponse },
      meta: {}
    };
    const expectedState: PeopleState = {
      status: StatusOfAPICall.SUCCESS,
      data: validPeopleResponse,
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
    const expectedState: PeopleState = {
      status: StatusOfAPICall.FAILURE,
      data: undefined,
      error: response.detail
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })
})