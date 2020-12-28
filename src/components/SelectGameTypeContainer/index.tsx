import React from "react";
import { SafeAreaView } from "react-native";
import { View } from "react-native";
import { Text, Title } from "react-native-paper";
import GameTypeCard from "../GameTypeCard";

const SelectGameTypeContainer = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
      <View style={styles.titleContainer}>
        <Title>Choose Cards</Title>
        <Text>Select which cards you want to play with</Text>
      </View>

      <View style={styles.cardsContainer}>
        <GameTypeCard gameType={GameType.people} handleChooseGameType={handleOnCardPress} />
        <GameTypeCard gameType={GameType.starships} handleChooseGameType={handleOnCardPress} />
      </View>
    </SafeAreaView>
  )
}

export default SelectGameTypeContainer;