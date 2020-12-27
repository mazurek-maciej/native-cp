import React from "react";

import { StyleSheet, View } from "react-native";
import { Avatar, Text, Title } from "react-native-paper";

import { Player } from "../../store/game/models/Player";
import { Side } from "../../store/game/models/Side";

interface Props {
  player: Player;
  side: Side;
}

const PlayerAvatar = ({ player, side }: Props) => {
  const imageSrc = side === Side.left
    ? require('../../../assets/images/playerOneAvatar.png')
    : require('../../../assets/images/playerTwoAvatar.png');

  return (
    <View style={styles.playerContainer}>
      <Avatar.Image source={imageSrc} />
      <Text>{player.name}</Text>
      <Title>{player.score}</Title>
    </View>
  )
}

const styles = StyleSheet.create({
  playerContainer: {
    alignItems: 'center'
  }
})

export default PlayerAvatar;