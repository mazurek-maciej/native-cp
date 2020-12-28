import React from 'react';
import { StyleSheet } from 'react-native';
import { Title, Text, useTheme } from 'react-native-paper';

import { Player } from '../../store/game/models/Player';

interface Props {
  leftPlayer: Player;
  rightPlayer: Player;
  isFetching: boolean;
  isDraw?: boolean;
  winnerId?: number;
}

const WinnerStatusText = ({
  leftPlayer,
  rightPlayer,
  isFetching,
  isDraw,
  winnerId,
}: Props) => {
  const theme = useTheme();

  if (isFetching) return null;

  if (isDraw) {
    return <Title style={{ color: theme.colors.error }}>DRAW</Title>;
  } else if (winnerId === leftPlayer.id) {
    return (
      <Title style={{ color: theme.colors.accent }}>
        {leftPlayer.name} scored!
      </Title>
    );
  } else if (winnerId === rightPlayer.id) {
    return (
      <Title style={{ color: theme.colors.accent }}>
        {rightPlayer.name} scored!
      </Title>
    );
  }

  return (
    <Text style={styles.infoText}>Press roll button to start the game!</Text>
  );
};

const styles = StyleSheet.create({
  infoText: {
    maxWidth: 140,
    textAlign: 'center',
  },
});

export default WinnerStatusText;
