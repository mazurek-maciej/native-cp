import { Dispatch } from 'redux';
import { getPeopleAction } from '../../people/actions';
import { GetPeopleActionSuccessPayload } from '../../people/actions/types';
import {
  ACTION_TYPE,
  PeopleCardsAction,
  PeopleCardsStoreCardsActionPayload,
} from './types';
import { ACTION_TYPE as GAME_ACTION_TYPE } from '../../game/actions/types';

export const storePeopleCardsAction = () => (dispatch: Dispatch) =>
  Promise.all([dispatch(getPeopleAction()), dispatch(getPeopleAction())])
    .then((people) => {
      const leftCard = people[0];
      const rightCard = people[1];

      const leftCardMass = parseInt(
        (leftCard.payload as GetPeopleActionSuccessPayload).data.mass,
      );
      const rightCardMass = parseInt(
        (rightCard.payload as GetPeopleActionSuccessPayload).data.mass,
      );
      const leftCardIsNan = isNaN(leftCardMass);
      const rightCardIsNan = isNaN(rightCardMass);

      if (leftCardIsNan && rightCardIsNan) {
        dispatch({ type: GAME_ACTION_TYPE.GAME_DRAW });
      } else if (leftCardMass === rightCardMass) {
        dispatch({ type: GAME_ACTION_TYPE.GAME_DRAW });
      } else if (leftCardIsNan) {
        dispatch({ type: GAME_ACTION_TYPE.SCORE_RIGHT_PLAYER });
      } else if (rightCardIsNan) {
        dispatch({ type: GAME_ACTION_TYPE.SCORE_LEFT_PLAYER });
      } else {
        const hasLeftCardBiggerMass = leftCardMass > rightCardMass;

        hasLeftCardBiggerMass
          ? dispatch({ type: GAME_ACTION_TYPE.SCORE_LEFT_PLAYER })
          : dispatch({ type: GAME_ACTION_TYPE.SCORE_RIGHT_PLAYER });
      }

      dispatch({
        type: ACTION_TYPE.STORE_PEOPLE_CARDS,
        payload: {
          leftCard: (leftCard.payload as GetPeopleActionSuccessPayload).data,
          rightCard: (rightCard.payload as GetPeopleActionSuccessPayload).data,
        },
      }) as PeopleCardsAction<PeopleCardsStoreCardsActionPayload>;
    })
    .catch((err) => {
      dispatch({ type: ACTION_TYPE.STORE_ERROR_PEOPLE_CARDS });
      console.log(err);
    });

export const clearPeopleCardsAction = () => ({
  type: ACTION_TYPE.CLEAR_PEOPLE_CARDS,
});
