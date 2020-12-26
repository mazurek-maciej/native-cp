import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useTheme, Text, Title, Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GameType } from '../../store/models/GameType';
import { useDispatch } from 'react-redux';
import { switchGameType } from '../../store/game/actions';

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
        <TouchableOpacity style={styles.cardAvatarContainer} onPress={() => handleOnCardPress(GameType.people)}>
          <Avatar.Image source={require('../../assets/images/people.jpg')} size={100} />
          <Text style={styles.cardAvatarText}>PEOPLE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardAvatarContainer} onPress={() => handleOnCardPress(GameType.starships)}>
          <Avatar.Image source={require('../../assets/images/starships.webp')} size={100} />
          <Text style={styles.cardAvatarText}>STARSHIPS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  cardAvatarContainer: {
    paddingHorizontal: 16,
    alignItems: 'center'
  },
  cardAvatarText: {
    marginTop: 8
  },
  titleContainer: {
    alignItems: 'center',
    paddingVertical: 32
  }
})

export default SelectGameType;