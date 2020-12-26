import { RSAAAction } from "redux-api-middleware";
import { People } from "../models/People";

export enum ACTION_TYPE {
  GET_REQUEST = 'people/GET_REQUEST',
  GET_SUCCESS = 'people/GET_SUCCESS',
  GET_FAILURE = 'people/GET_FAILURE'
}

export interface GetPeopleAction<State, Payload, Meta> extends RSAAAction<State, Payload, Meta> {}

export interface GetPeopleActionPayload {}

export interface GetPeopleActionSuccessPayload extends GetPeopleActionPayload {
  data: People
}

export interface GetPeopleActionFailurePayload extends GetPeopleActionPayload {
  detail: string
}

export interface GetPeopleActiondMeta {}
