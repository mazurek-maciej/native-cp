import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import GameCard from '../src/components/GameCard';
import { GameType } from '../src/store/models/GameType';
import { StatusOfAPICall } from '../src/store/game/models/StatusOfApiCall';
import { People } from '../src/store/people/models/People';

const validPersonOne = require('../src/_mocks_/validPersonOneResponse.json');
const validPersonTwo = require('../src/_mocks_/validPersonTwoResponse.json');

describe('GameCard component', () => {
  const props = {
    gameType: GameType.people,
    status: StatusOfAPICall.SUCCESS,
    cards: {
      leftCard: validPersonOne,
      rightCard: validPersonTwo,
    },
  };

  it('should render correctly', () => {
    render(<GameCard {...props} />);
  });

  it('should render person name and mass for both cards', () => {
    const { queryByText } = render(<GameCard {...props} />);

    const namePersonOne = queryByText((validPersonOne as People).name);
    const namePersonTwo = queryByText((validPersonTwo as People).name);
    const massPersonOne = queryByText(
      `Mass: ${(validPersonOne as People).mass}`,
    );
    const massPersonTwo = queryByText(
      `Mass: ${(validPersonTwo as People).mass}`,
    );

    expect(namePersonOne).toBeDefined();
    expect(namePersonTwo).toBeDefined();
    expect(massPersonOne).toBeDefined();
    expect(massPersonTwo).toBeDefined();
  });

  it('should render activity indicators when StatusOfApiCall is FETCHING', () => {
    const { queryAllByTestId } = render(
      <GameCard {...props} status={StatusOfAPICall.FETCHING} />,
    );
    const indicators = queryAllByTestId('indicator');

    expect(indicators).toHaveLength(2);
  });

  it('should render appropriate message when both cards are undefined', () => {
    const cards = {
      leftCard: undefined,
      rightCard: undefined,
    };
    const { queryByText } = render(<GameCard {...props} cards={cards} />);
    const message = queryByText('No information from space command');
    const massLabel = queryByText(/mass: /i);
    const crewLabel = queryByText(/crew: /i);

    expect(message).toBeDefined();
    expect(massLabel).toBeNull();
    expect(crewLabel).toBeNull();
  });

  it('should render appropriate message when one of the cards is undefined', () => {
    const cards = {
      leftCard: validPersonOne,
      rightCard: undefined,
    };
    const { queryByText } = render(<GameCard {...props} cards={cards} />);
    const message = queryByText('No information from space command');
    const massLabel = queryByText(/mass: /i);
    const crewLabel = queryByText(/crew: /i);

    expect(message).toBeDefined();
    expect(massLabel).toBeNull();
    expect(crewLabel).toBeNull();
  });

  it('should render people image when GameType is people', () => {
    const { getByRole } = render(<GameCard {...props} />);
    const urlToImage = '../../../src/assets/images/people.jpg';
    const imgUrl = getByRole('image').props.source.testUri;

    expect(imgUrl).toBe(urlToImage);
  });
});
