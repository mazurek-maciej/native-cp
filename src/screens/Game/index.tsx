import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearPeopleCardsAction,
  storePeopleCardsAction,
} from '../../store/peopleCards/actions';
import {
  clearStarshipsCardsAction,
  storeStarshipsCardsAction,
} from '../../store/starshipsCards/actions';

import GameCard from '../../components/GameCard';
import PlayerAvatar from '../../components/PlayerAvatar';
import WinnerStatusText from '../../components/WinnerStatusText';
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Button, FAB, useTheme } from 'react-native-paper';

import { RootState } from '../../store/state';
import { GameType } from '../../store/models/GameType';
import { StatusOfAPICall } from '../../store/game/models/StatusOfApiCall';
import { switchGameType } from '../../store/game/actions';
import { Side } from '../../store/game/models/Side';

const Game = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { leftPlayer, rightPlayer, gameType, winnerId, isDraw } = useSelector(
    (state: RootState) => state.game,
  );
  const { starshipsCards, peopleCards } = useSelector(
    (state: RootState) => state,
  );
  const { starshipsStatus, peopleStatus } = useSelector((state: RootState) => ({
    peopleStatus: state.people.status,
    starshipsStatus: state.starships.status,
  }));

  const dispatchPeopleCards = () => dispatch(storePeopleCardsAction());
  const dispatchStarshipsCards = () => dispatch(storeStarshipsCardsAction());

  const handleGameRoll = () => {
    gameType === GameType.people
      ? dispatchPeopleCards()
      : dispatchStarshipsCards();
  };

  const handleChangeCards = () => {
    if (gameType === GameType.people) {
      dispatch(clearPeopleCardsAction());
      return dispatch(switchGameType(GameType.starships));
    }
    dispatch(clearStarshipsCardsAction());
    return dispatch(switchGameType(GameType.people));
  };

  const isFetching =
    peopleStatus === StatusOfAPICall.FETCHING ||
    starshipsStatus === StatusOfAPICall.FETCHING;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}>
      <View style={styles.container}>
        {gameType === GameType.people ? (
          <GameCard
            cards={peopleCards}
            gameType={gameType}
            status={peopleStatus}
          />
        ) : (
          <GameCard
            cards={starshipsCards}
            gameType={gameType}
            status={starshipsStatus}
          />
        )}
        <View style={styles.playersContainer}>
          <PlayerAvatar player={leftPlayer} side={Side.left} />

          <WinnerStatusText
            leftPlayer={leftPlayer}
            rightPlayer={rightPlayer}
            isDraw={isDraw}
            isFetching={isFetching}
            winnerId={winnerId}
          />

          <PlayerAvatar player={rightPlayer} side={Side.right} />
        </View>

        <TouchableOpacity onPress={handleGameRoll} disabled={isFetching}>
          <Button
            mode="contained"
            disabled={isFetching}
            loading={isFetching}
            icon="rotate-right">
            ROLL {gameType}
          </Button>
        </TouchableOpacity>
      </View>

      <FAB
        icon={'swap-horizontal'}
        label={'Change cards'}
        style={styles.fab}
        onPress={handleChangeCards}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 32,
    flexDirection: 'column',
  },
  playerContainer: {
    alignItems: 'center',
  },
  playersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 16,
  },
});

export default Game;
