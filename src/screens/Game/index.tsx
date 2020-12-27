import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPeopleCardsAction, storePeopleCardsAction } from '../../store/peopleCards/actions';
import { clearStarshipsCards, storeStarshipsCards } from '../../store/starshipsCards/actions';

import GameCard from './GameCard';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Title, Text, Button, Avatar, FAB, useTheme } from 'react-native-paper';

import { RootState } from '../../store/state';
import { GameType } from '../../store/models/GameType';
import { StatusOfAPICall } from '../../store/game/models/StatusOfApiCall';
import { switchGameType } from '../../store/game/actions';

const Game = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { leftPlayer, rightPlayer, gameType, winnerId, isDraw } = useSelector((state: RootState) => state.game);
  const { starshipsCards, peopleCards } = useSelector((state: RootState) => state);
  const { starshipsStatus, peopleStatus } = useSelector((state: RootState) =>
    ({ peopleStatus: state.people.status, starshipsStatus: state.starships.status }));

  const dispatchPeopleCards = () => dispatch(storePeopleCardsAction())
  const dispatchStarshipsCards = () => dispatch(storeStarshipsCards())

  const handleGameRoll = () => {
    gameType === GameType.people ? dispatchPeopleCards() : dispatchStarshipsCards();
  }

  const handleChangeCards = () => {
    if (gameType === GameType.people) {
      dispatch(clearPeopleCardsAction());
      return dispatch(switchGameType(GameType.starships))
    }
    dispatch(clearStarshipsCards())
    return dispatch(switchGameType(GameType.people))
  }

  const renderWinnerName = useCallback(() => {
    if (isDraw) {
      return <Title style={{ color: theme.colors.error }}>DRAW</Title>
    } else if (winnerId === leftPlayer.id) {
      return <Title style={{ color: theme.colors.accent }}>{leftPlayer.name} scored!</Title>
    }
    return <Title style={{ color: theme.colors.accent }}>{rightPlayer.name} scored!</Title>
  }, [isDraw, winnerId])

  const isFetching = peopleStatus === StatusOfAPICall.FETCHING || starshipsStatus === StatusOfAPICall.FETCHING;

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: theme.colors.background
    }}>
      <View style={styles.container}>
        {gameType === GameType.people ?
          <GameCard cards={peopleCards} gameType={gameType} status={peopleStatus} />
          :
          <GameCard cards={starshipsCards} gameType={gameType} status={starshipsStatus} />
        }
        <View style={styles.playersContainer}>
          <View style={styles.playerContainer}>
            <Avatar.Image source={require('../../assets/images/playerOneAvatar.png')} />
            <Text>{leftPlayer.name}</Text>
            <Title>{leftPlayer.score}</Title>
          </View>

          {isFetching ? <ActivityIndicator/> : renderWinnerName()}

          <View style={styles.playerContainer}>
            <Avatar.Image source={require('../../assets/images/playerTwoAvatar.png')} />
            <Text>{rightPlayer.name}</Text>
            <Title>{rightPlayer.score}</Title>
          </View>
        </View>
        <TouchableOpacity onPress={handleGameRoll} disabled={isFetching}>
          <Button mode="contained" disabled={isFetching}>ROLL</Button>
        </TouchableOpacity>
      </View>
      <FAB
        icon={'swap-horizontal'}
        label={'Change cards'}
        style={styles.fab}
        onPress={handleChangeCards}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 32,
    flexDirection: 'column',
  },
  playerContainer: {
    alignItems: 'center'
  },
  playersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 16,
  }
})

export default Game;