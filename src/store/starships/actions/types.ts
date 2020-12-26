import { RSAAAction } from "redux-api-middleware";
import { Starship } from "../models/Starship";

export enum ACTION_TYPE {
  GET_REQUEST = 'starship/GET_REQUEST',
  GET_SUCCESS = 'starship/GET_SUCCESS',
  GET_FAILURE = 'starship/GET_FAILURE'
}

export interface GetStarshipsAction<State, Payload, Meta> extends RSAAAction<State, Payload, Meta> {}

export interface GetStarshipsActionPayload {}

export interface GetStarshipsActionSuccessPayload extends GetStarshipsActionPayload {
  data: {
    count: number;
    next: string | null;
    previous: string | null;
    results: Starship[];
  }
}

export interface GetStarshipsActionFailurePayload extends GetStarshipsActionPayload {
  detail: string
}

export interface GetStarshipsActiondMeta {}
