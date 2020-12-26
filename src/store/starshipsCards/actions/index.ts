import { Dispatch } from "redux";
import { getStarshipsAction } from "../../starships/actions";
import { GetStarshipsActionSuccessPayload } from "../../starships/actions/types";
import { ACTION_TYPE as GAME_ACTION_TYPE } from "../../game/actions/types";
import { ACTION_TYPE, StarshipsCardsAction, StarshipsCardsStoreCardsActionPayload } from "./types";

export const storeStarshipsCards = () =>
  (dispatch: Dispatch) => dispatch(getStarshipsAction()).then(({ payload }) => {
    const min = Math.ceil(0);
    const max = Math.floor(9);
    const randomLeftNr = Math.floor(Math.random() * (max - min + 1)) + min;
    const randomRightNr = Math.floor(Math.random() * (max - min + 1)) + min;

    const leftCard = (payload as GetStarshipsActionSuccessPayload).data.results[randomLeftNr]
    const rightCard = (payload as GetStarshipsActionSuccessPayload).data.results[randomRightNr]
    const leftCardCrew = parseInt(leftCard.crew)
    const rightCardCrew = parseInt(rightCard.crew)

    if (rightCardCrew === leftCardCrew) {
      dispatch({ type: GAME_ACTION_TYPE.GAME_DRAW })

    } else if (leftCardCrew > rightCardCrew) {
      dispatch({ type: GAME_ACTION_TYPE.SCORE_LEFT_PLAYER })
      
    } else if (leftCardCrew < rightCardCrew) {
      dispatch({ type: GAME_ACTION_TYPE.SCORE_RIGHT_PLAYER })
    }

    dispatch({
      type: ACTION_TYPE.STORE_STARSHIPS_CARDS,
      payload: {
        leftCard,
        rightCard
      }
    }) as StarshipsCardsAction<StarshipsCardsStoreCardsActionPayload>

  }).catch(err => {
    dispatch({ type: ACTION_TYPE.STORE_ERROR_STARSHIPS_CARDS })
    console.log(err)
  })

export const clearStarshipsCards = () => ({
  type: ACTION_TYPE.CLEAR_STARSHIPS_CARDS
})