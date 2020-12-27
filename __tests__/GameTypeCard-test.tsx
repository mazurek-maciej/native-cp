import 'react-native';
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import GameTypeCard from '../src/components/GameTypeCard';
import { GameType } from '../src/store/models/GameType';

describe('GameTypeCard component', () => {
  const mockedHandleOnPress = jest.fn();

  it('should render correctly', () => {
    render(
      <GameTypeCard
        gameType={GameType.people}
        handleChooseGameType={mockedHandleOnPress}
      />,
    );
  });

  it('should render card label base on GameType', () => {
    const { queryByText } = render(
      <GameTypeCard
        gameType={GameType.starships}
        handleChooseGameType={mockedHandleOnPress}
      />,
    );
    const passedGameType = queryByText(/starships/i);
    const notPassedGameType = queryByText(/people/i);

    expect(passedGameType).toBeDefined();
    expect(notPassedGameType).toBeNull();
  });

  it('should execute function after press', () => {
    const { getByTestId } = render(
      <GameTypeCard
        gameType={GameType.starships}
        handleChooseGameType={mockedHandleOnPress}
      />,
    );
    const container = getByTestId('container');

    fireEvent.press(container);

    expect(mockedHandleOnPress).toBeCalledTimes(1);
  });
});
