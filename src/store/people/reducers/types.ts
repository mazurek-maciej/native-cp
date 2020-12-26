import { StatusOfAPICall } from "../../game/models/StatusOfApiCall";
import { People } from "../models/People";

export interface PeopleState {
  status: StatusOfAPICall;
  data?: People;
  error?: string
}