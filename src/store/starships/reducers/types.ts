import { StatusOfAPICall } from "../../game/models/StatusOfApiCall";
import { Starship } from "../models/Starship";

export interface StarshipsState {
  status: StatusOfAPICall;
  data?: Starship[];
  error?: string
}