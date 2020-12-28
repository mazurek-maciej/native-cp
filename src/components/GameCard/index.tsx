import React from 'react';

import { View, ActivityIndicator } from 'react-native';
import { Card, Text, Title } from 'react-native-paper';

import { StatusOfAPICall } from '../../store/game/models/StatusOfApiCall';
import { GameType } from '../../store/models/GameType';
import { People } from '../../store/people/models/People';
import { PeopleCardsState } from '../../store/peopleCards/reducers/types';
import { Starship } from '../../store/starships/models/Starship';
import { StarshipsCardsState } from '../../store/starshipsCards/reducers/types';
import { Side } from '../../store/game/models/Side';

interface Props {
  gameType: GameType;
  status: StatusOfAPICall;
  cards?: PeopleCardsState | StarshipsCardsState;
}

const GameCard = ({ gameType, status, cards }: Props) => {
  const renderCard = (side: Side) =>
    status !== StatusOfAPICall.FETCHING ? (
      <Card.Content>
        <Title>{cards?.[side]?.name}</Title>
        {gameType === GameType.people ? (
          <Text>Mass: {(cards?.[side] as People).mass}</Text>
        ) : (
          <Text>Crew: {(cards?.[side] as Starship).crew}</Text>
        )}
      </Card.Content>
    ) : (
      <View style={{ padding: 16 }}>
        <ActivityIndicator testID={'indicator'} color={'#fff'} />
      </View>
    );

  const cardImage =
    gameType === GameType.people
      ? require('../../assets/images/people.jpg')
      : require('../../assets/images/starships.webp');

  return (
    <Card>
      <Card.Cover source={cardImage} accessibilityRole={'image'} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {cards?.leftCard && cards.rightCard ? (
          <>
            {renderCard(Side.left)}
            {renderCard(Side.right)}
          </>
        ) : (
          <Title>No information from space command</Title>
        )}
      </View>
    </Card>
  );
};

export default GameCard;
