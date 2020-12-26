import { GameType } from "../../models/GameType";
import { ACTION_TYPE, GameAction, GameSwitchGameTypeActionPayload } from "./types";

export const scoreLeftPlayer = () => ({
  type: ACTION_TYPE.SCORE_LEFT_PLAYER
})

export const scoreRightPlayer = () => ({
  type: ACTION_TYPE.SCORE_RIGHT_PLAYER
})

export const gameDraw = () => ({
  type: ACTION_TYPE.GAME_DRAW
})

export const switchGameType = (type: GameType) => ({
  type: ACTION_TYPE.SWITCH_GAME_TYPE,
  payload: { type }
}) as GameAction<GameSwitchGameTypeActionPayload>