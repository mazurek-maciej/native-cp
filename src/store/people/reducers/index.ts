import { handleActions } from 'redux-actions';

import {
  ACTION_TYPE,
  GetPeopleActionFailurePayload,
  GetPeopleActionPayload,
  GetPeopleActionSuccessPayload,
} from '../actions/types';
import { StatusOfAPICall } from '../../game/models/StatusOfApiCall';
import { PeopleState } from './types';

export const initialState: PeopleState = {
  status: StatusOfAPICall.IDLE,
  data: undefined,
  error: undefined,
};

export const peopleReducer = handleActions<PeopleState, GetPeopleActionPayload>(
  {
    [ACTION_TYPE.GET_REQUEST]: () => ({
      status: StatusOfAPICall.FETCHING,
      data: undefined,
      error: undefined,
    }),
    [ACTION_TYPE.GET_SUCCESS]: (state, action) => ({
      status: StatusOfAPICall.SUCCESS,
      data: (action.payload as GetPeopleActionSuccessPayload).data,
      error: undefined,
    }),
    [ACTION_TYPE.GET_FAILURE]: (state, action) => ({
      status: StatusOfAPICall.FAILURE,
      data: undefined,
      error: (action.payload as GetPeopleActionFailurePayload).detail,
    }),
  },
  { ...initialState },
);
