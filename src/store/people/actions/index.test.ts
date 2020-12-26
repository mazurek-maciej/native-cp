import { apiMiddleware } from "redux-api-middleware";
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from "redux-thunk";
import { generateGetPeopleUrl, getPeopleAction } from ".";
import { initialState } from '../reducers/index';

import validPeopleResponse from '../../../_mocks_/validPersonOneResponse.json';

import { ACTION_TYPE } from "./types";

const middlewares = [thunk, apiMiddleware];
const mockStore = configureMockStore(middlewares)

describe('People store actions', () => {
  let store: MockStoreEnhanced<unknown, {}>
  const URL = 'begin:https://swapi.dev/api/people';

  beforeEach(() => {
    store = mockStore(initialState)
  })

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  })

  it('should create GET_SUCCESS when fetching data is done successfully', () => {
    fetchMock.getOnce(URL, {
      body: validPeopleResponse
    })

    const expectedActions = [
      { type: ACTION_TYPE.GET_REQUEST },
      { type: ACTION_TYPE.GET_SUCCESS, payload: { data: validPeopleResponse }}
    ]

    return store.dispatch(getPeopleAction()).then(() => {
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

    return store.dispatch(getPeopleAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

})