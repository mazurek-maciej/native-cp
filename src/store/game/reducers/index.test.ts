import { initialState, gameReducer as reducer } from "."
import { GameType } from "../../models/GameType";
import { ACTION_TYPE } from "../actions/types";
import { GameState } from "./types";

describe('Game reducer', () => {
  it('shold return initial state', () => {
    const action = { type: '', payload: '', meta: {} };

    expect(reducer(undefined, action)).toEqual(initialState);
  })

  it('should handle SCORE_LEFT_PLAYER action', () => {
    const action = { type: ACTION_TYPE.SCORE_LEFT_PLAYER, payload: '' };
    const expectedState: GameState = {
      ...initialState,
      leftPlayer: {
        ...initialState.leftPlayer,
        score: initialState.leftPlayer.score + 1
      },
      winnerId: initialState.leftPlayer.id,
      isDraw: false
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle SCORE_RIGHT_PLAYER action', () => {
    const action = { type: ACTION_TYPE.SCORE_RIGHT_PLAYER, payload: '' };
    const expectedState: GameState = {
      ...initialState,
      rightPlayer: {
        ...initialState.rightPlayer,
        score: initialState.rightPlayer.score + 1
      },
      winnerId: initialState.rightPlayer.id,
      isDraw: false
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle GAME_DRAW action', () => {
    const action = { type: ACTION_TYPE.GAME_DRAW, payload: '' };
    const expectedState: GameState = {
      ...initialState,
      winnerId: undefined,
      isDraw: true
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle SWITCH_GAME_TYPE action', () => {
    const type = GameType.people;
    const action = { type: ACTION_TYPE.SWITCH_GAME_TYPE, payload: { type } };
    const expectedState: GameState = {
      ...initialState,
      userSelectedGameType: true,
      gameType: type
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })
})