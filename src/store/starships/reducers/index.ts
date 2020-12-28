import { handleActions } from 'redux-actions';
import { StatusOfAPICall } from '../../game/models/StatusOfApiCall';
import {
  ACTION_TYPE,
  GetStarshipsActionFailurePayload,
  GetStarshipsActionPayload,
  GetStarshipsActionSuccessPayload,
} from '../actions/types';
import { StarshipsState } from './types';

export const initialState: StarshipsState = {
  status: StatusOfAPICall.IDLE,
  data: undefined,
  error: undefined,
};

export const starshipsReducer = handleActions<
  StarshipsState,
  GetStarshipsActionPayload
>(
  {
    [ACTION_TYPE.GET_REQUEST]: () => ({
      status: StatusOfAPICall.FETCHING,
      data: undefined,
      error: undefined,
    }),
    [ACTION_TYPE.GET_SUCCESS]: (state, action) => ({
      status: StatusOfAPICall.SUCCESS,
      data: (action.payload as GetStarshipsActionSuccessPayload).data.results,
      error: undefined,
    }),
    [ACTION_TYPE.GET_FAILURE]: (state, action) => ({
      status: StatusOfAPICall.FAILURE,
      data: undefined,
      error: (action.payload as GetStarshipsActionFailurePayload).detail,
    }),
  },
  { ...initialState },
);
