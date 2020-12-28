import { Starship } from '../../starships/models/Starship';

export interface StarshipsCardsState {
  leftCard?: Starship;
  rightCard?: Starship;
  error?: string;
}
