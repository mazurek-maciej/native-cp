import { AnyAction } from 'redux';
import fetchMock from 'fetch-mock';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { apiMiddleware } from 'redux-api-middleware';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { clearStarshipsCardsAction, storeStarshipsCardsAction } from '.';
import { configureStore } from '../..';

import { RootState } from '../../state';

import { ACTION_TYPE } from './types';
import { ACTION_TYPE as STARSHIPS_TYPE } from '../../starships/actions/types';

type DispatchExts = ThunkDispatch<RootState, void, AnyAction>;

const middlewares = [thunk, apiMiddleware];
const rootStore = configureStore();
const mockStore = configureMockStore<RootState, DispatchExts>(middlewares);

describe('Starships Cards store actions', () => {
  let store: MockStoreEnhanced<RootState, DispatchExts>;
  const URL = 'begin:https://swapi.dev/api/starships';

  beforeEach(() => {
    store = mockStore(rootStore.getState());
  });

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should handle STORE_ERROR_STARSHIPS_CARDS when fetch starships data is failure', () => {
    const response = {
      data: 'No data',
    };
    fetchMock.getOnce(URL, {
      body: response,
      status: 404,
    });

    const expectedActions = [
      { type: STARSHIPS_TYPE.GET_REQUEST },
      {
        type: STARSHIPS_TYPE.GET_FAILURE,
        payload: response,
        meta: undefined,
        error: true,
      },
      { type: ACTION_TYPE.STORE_ERROR_STARSHIPS_CARDS },
    ];

    return store.dispatch(storeStarshipsCardsAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should handle CLEAR_STARSHIPS_CARDS', () => {
    const expectedAction = { type: ACTION_TYPE.CLEAR_STARSHIPS_CARDS };

    expect(clearStarshipsCardsAction()).toEqual(expectedAction);
  });
});
