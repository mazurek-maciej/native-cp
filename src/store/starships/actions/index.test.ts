import thunk from "redux-thunk";
import fetchMock from 'fetch-mock';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { apiMiddleware } from "redux-api-middleware";
import { getStarshipsAction } from ".";
import { initialState } from "../reducers";

import { ACTION_TYPE } from "./types";

import validStarshipsResponse from '../../../_mocks_/validStarshipsResponse.json';

const middlewares = [thunk, apiMiddleware];
const mockStore = configureMockStore(middlewares)

describe('Starships store actions', () => {
  let store: MockStoreEnhanced<unknown, {}>
  const URL = 'begin:https://swapi.dev/api/starships';

  beforeEach(() => {
    store = mockStore(initialState)
  })

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  })

  it('should create GET_SUCCESS when fetching data is done successfully', () => {
    fetchMock.getOnce(URL, {
      body: validStarshipsResponse
    })

    const expectedActions = [
      { type: ACTION_TYPE.GET_REQUEST },
      { type: ACTION_TYPE.GET_SUCCESS, payload: { data: validStarshipsResponse }}
    ]

    return store.dispatch(getStarshipsAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create GET_FAILURE when cannot fetch people data', () => {
    const response = {
      detail: "Not found"
    }
    fetchMock.getOnce(URL, {
      body: response,
      status: 404
    })

    const expectedActions = [
      { type: ACTION_TYPE.GET_REQUEST },
      { type: ACTION_TYPE.GET_FAILURE, payload: response, error: true, meta: undefined }
    ]

    return store.dispatch(getStarshipsAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

})