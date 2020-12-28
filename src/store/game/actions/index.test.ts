import { gameDraw, scoreLeftPlayer, scoreRightPlayer, switchGameType } from '.';
import { GameType } from '../../models/GameType';
import { ACTION_TYPE } from './types';

describe('Game store', () => {
  it('shoud dispatch SCORE_LEFT_PLAYER action', () => {
    const expectedAction = {
      type: ACTION_TYPE.SCORE_LEFT_PLAYER,
    };

    expect(scoreLeftPlayer()).toEqual(expectedAction);
  });

  it('shoud dispatch SCORE_RIGHT_PLAYER action', () => {
    const expectedAction = {
      type: ACTION_TYPE.SCORE_RIGHT_PLAYER,
    };

    expect(scoreRightPlayer()).toEqual(expectedAction);
  });

  it('shoud dispatch GAME_DRAW action', () => {
    const expectedAction = {
      type: ACTION_TYPE.GAME_DRAW,
    };

    expect(gameDraw()).toEqual(expectedAction);
  });

  it('shoud dispatch SWITCH_GAME_TYPE action', () => {
    const type = GameType.people;
    const expectedAction = {
      type: ACTION_TYPE.SWITCH_GAME_TYPE,
      payload: { type },
    };

    expect(switchGameType(type)).toEqual(expectedAction);
  });
});
