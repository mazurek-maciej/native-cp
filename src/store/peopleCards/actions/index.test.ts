import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { clearPeopleCardsAction, storePeopleCardsAction } from '.';
import fetchMock from 'fetch-mock';
import { apiMiddleware } from 'redux-api-middleware';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { ACTION_TYPE } from './types';
import { ACTION_TYPE as PEOPLE_TYPE } from '../../people/actions/types';
import { ACTION_TYPE as GAME_ACTION } from '../../game/actions/types';

import firstPerson from '../../../_mocks_/validPersonOneResponse.json'
import { RootState } from '../../state';
import { AnyAction } from 'redux';
import { configureStore } from '../..';

type DispatchExts = ThunkDispatch<RootState, void, AnyAction>

const middlewares = [thunk, apiMiddleware];
const rootStore = configureStore();
const mockStore = configureMockStore<RootState, DispatchExts>(middlewares)

describe('People cards store actions', () => {
  let store: MockStoreEnhanced<RootState, DispatchExts>
  const URL = 'begin:https://swapi.dev/api/people';

  beforeEach(() => {
    store = mockStore(rootStore.getState())
  })

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  })

  it('should create GAME_DRAW and STORE_PEOPLE_CARDS when fetch data is successfull and mass are the same', () => {
    fetchMock.get(URL, {
      body: firstPerson
    })
    const payload = {
      data: firstPerson
    }

    const expectedActions = [
      { type: PEOPLE_TYPE.GET_REQUEST },
      { type: PEOPLE_TYPE.GET_REQUEST },
      {
        payload,
        type: PEOPLE_TYPE.GET_SUCCESS,
        meta: undefined
      },
      {
        payload,
        type: PEOPLE_TYPE.GET_SUCCESS,
        meta: undefined
      },
      { type: GAME_ACTION.GAME_DRAW },
      {
        type: ACTION_TYPE.STORE_PEOPLE_CARDS,
        payload: { leftCard: firstPerson, rightCard: firstPerson }
      }
    ]

    return store.dispatch(storePeopleCardsAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create STORE_ERROR_PEOPLE_CARDS when fetch data is failure', () => {
    const response = {
      detail: "Not found"
    }

    fetchMock.get(URL, {
      body: response,
      status: 404
    })

    const expectedActions = [
      { type: PEOPLE_TYPE.GET_REQUEST },
      { type: PEOPLE_TYPE.GET_REQUEST },
      { type: PEOPLE_TYPE.GET_FAILURE, payload: response, error: true, meta: undefined },
      { type: PEOPLE_TYPE.GET_FAILURE, payload: response, error: true, meta: undefined },
      { type: ACTION_TYPE.STORE_ERROR_PEOPLE_CARDS }
    ]

    return store.dispatch(storePeopleCardsAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should clear store when dispatch action CLEAR_PEOPLE_CARDS', () => {
    const expectedAction = { type: ACTION_TYPE.CLEAR_PEOPLE_CARDS }

    expect(clearPeopleCardsAction()).toEqual(expectedAction)
  })
})