import React from 'react';
import { SafeAreaView, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Title, Text, Appbar, Card, Button, Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/state';

const Game = () => {
  const {leftPlayer, rightPlayer} = useSelector((state: RootState) => state.game);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Card>
          <Card.Cover source={require('../../assets/images/starships.webp')}/>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Card.Content>
              <Title>Spaceship</Title>
              <Text>Crew: 100</Text>
            </Card.Content>
            <Card.Content>
              <Title>Spaceship</Title>
              <Text>Crew: 100</Text>
            </Card.Content>
          </View>
        </Card>
        <View style={styles.playersContainer}>
          <View style={styles.playerContainer}>
            <Avatar.Image source={require('../../assets/images/playerOneAvatar.png')} />
            <Text>{leftPlayer.name}</Text>
            <Title>0</Title>
          </View>
          <Text>Player 1 scored</Text>
          <View style={styles.playerContainer}>
            <Avatar.Image source={require('../../assets/images/playerTwoAvatar.png')} />
            <Text>{rightPlayer.name}</Text>
            <Title>0</Title>
          </View>
        </View>
        <TouchableOpacity>
          <Button mode="contained">ROLL</Button>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
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
  }
})

export default Game;