import { Action } from 'redux-actions';
import { GameType } from '../../models/GameType';

export enum ACTION_TYPE {
  SCORE_LEFT_PLAYER = 'SCORE_LEFT_PLAYER',
  SCORE_RIGHT_PLAYER = 'SCORE_RIGHT_PLAYER',
  GAME_DRAW = 'GAME_DARW',
  SWITCH_GAME_TYPE = 'SWITCH_GAME_TYPE',
}

export interface GameAction<Payload> extends Action<Payload> {}

export interface GameActionPayload {}

export interface GameSwitchGameTypeActionPayload extends GameActionPayload {
  type: GameType;
}
