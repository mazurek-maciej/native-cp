import { createAction } from "redux-api-middleware";
import { URL_PEOPLE } from "../../../constants/config";
import { PeopleState } from "../reducers/types";
import { ACTION_TYPE, GetPeopleActiondMeta, GetPeopleActionPayload, GetPeopleActionSuccessPayload } from "./types";


export const generateGetPeopleUrl = () => {
  const min = Math.ceil(1);
  const max = Math.floor(83);
  const randomNr = Math.floor(Math.random() * (max - min + 1)) + min;
  
  return `${URL_PEOPLE}${randomNr}`
}

const handleSuccessResponse = async (res: Response): Promise<GetPeopleActionSuccessPayload> => {
  const data = await res.json();
  return { data };
} 

export const getPeopleAction = () =>
  createAction<PeopleState, GetPeopleActionPayload, GetPeopleActiondMeta>({
    endpoint: generateGetPeopleUrl(),
    method: 'GET',
    types: [
      {
        type: ACTION_TYPE.GET_REQUEST
      },
      {
        type: ACTION_TYPE.GET_SUCCESS,
        payload: (action, state, res) => handleSuccessResponse(res)
      },
      {
        type: ACTION_TYPE.GET_FAILURE,
        payload: (action, state, res) => res.json()
      }
    ]
  })