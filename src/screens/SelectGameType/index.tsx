import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { switchGameType } from '../../store/game/actions';

import { useTheme, Text, Title } from 'react-native-paper';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import CardComponent from './CardComponent';

import { GameType } from '../../store/models/GameType';

interface Props {
  navigation: StackNavigationProp<any, 'SelectGameType'>
}

const SelectGameType = ({ navigation }: Props) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleOnCardPress = (gameType: GameType) => {
    dispatch(switchGameType(gameType))
    return navigation.navigate('Game')
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
      <View style={styles.titleContainer}>
        <Title>Choose Cards</Title>
        <Text>Select which cards you want to play with</Text>
      </View>

      <View style={styles.cardsContainer}>
        <CardComponent gameType={GameType.people} handleChooseGameType={handleOnCardPress} />
        <CardComponent gameType={GameType.starships} handleChooseGameType={handleOnCardPress} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  titleContainer: {
    alignItems: 'center',
    paddingVertical: 32
  }
})

export default SelectGameType;