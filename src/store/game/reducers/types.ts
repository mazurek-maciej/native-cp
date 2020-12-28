import { GameType } from '../../models/GameType';
import { Player } from '../models/Player';

export interface GameState {
  leftPlayer: Player;
  rightPlayer: Player;
  gameType: GameType;
  userSelectedGameType: boolean;
  winnerId?: number;
  isDraw?: boolean;
}
