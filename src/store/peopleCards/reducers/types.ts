import { People } from "../../people/models/People";

export interface PeopleCardsState {
  leftCard?: People;
  rightCard?: People;
  error?: string;
}