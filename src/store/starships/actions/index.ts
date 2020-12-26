import { createAction } from "redux-api-middleware";
import { URL_STARSHIPS } from "../../../constants/config";
import { StarshipsState } from "../reducers/types";
import { ACTION_TYPE, GetStarshipsActiondMeta, GetStarshipsActionPayload, GetStarshipsActionSuccessPayload } from "./types";

const handleSuccessResponse = async (res: Response): Promise<GetStarshipsActionSuccessPayload> => {
  const data = await res.json();
  return { data };
} 

export const getStarshipsAction = () => 
  createAction<StarshipsState, GetStarshipsActionPayload, GetStarshipsActiondMeta>({
    endpoint: URL_STARSHIPS,
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