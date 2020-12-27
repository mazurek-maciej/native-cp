import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { StyleSheet } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

import { GameType } from '../../store/models/GameType';

interface Props {
  gameType: GameType;
  handleChooseGameType: (gameType: GameType) => void
}

const GameTypeCard = ({ gameType, handleChooseGameType }: Props) => {

  const handleOnPress = () => handleChooseGameType(gameType)

  const imageType = gameType === GameType.people ?
    require('../../assets/images/people.jpg') : require('../../assets/images/starships.webp')

  return (
    <TouchableOpacity style={styles.cardAvatarContainer} onPress={handleOnPress} testID={'container'}>
      <Avatar.Image source={imageType} size={124} />
      <Text style={styles.cardAvatarText}>{gameType}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardAvatarContainer: {
    paddingHorizontal: 16,
    alignItems: 'center'
  },
  cardAvatarText: {
    marginTop: 8,
    textTransform: 'uppercase'
  }
})

export default GameTypeCard;