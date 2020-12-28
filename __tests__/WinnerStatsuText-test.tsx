import 'react-native';
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { initialState as gameState } from '../src/store/game/reducers';
import WinnerStatusText from '../src/components/WinnerStatusText';

describe('WinnerStatusText component', () => {
  const props = {
    leftPlayer: gameState.leftPlayer,
    rightPlayer: gameState.rightPlayer,
    isDraw: false,
    isFetching: false,
    winnerId: undefined,
  };

  it('should render correctly', () => {
    render(<WinnerStatusText {...props} />);
  });

  it('should render initial text when there is no winner and no draw', () => {
    const { queryByText } = render(<WinnerStatusText {...props} />);
    const initText = queryByText('Press roll button to start the game!');

    expect(initText).toBeDefined();
  });

  it('should render draw when isDraw is true', () => {
    const { queryByText } = render(<WinnerStatusText {...props} />);
    const draw = queryByText(/draw/i);

    expect(draw).toBeDefined();
  });

  it('should render winner name base on winnerId', () => {
    const winnerId = gameState.leftPlayer.id;

    const { queryByText } = render(
      <WinnerStatusText {...props} winnerId={winnerId} />,
    );

    const winnerName = gameState.leftPlayer.name;
    const loserName = gameState.rightPlayer.name;
    const winnerText = queryByText(`${winnerName} scored!`);
    const loserText = queryByText(`${loserName} scored!`);

    expect(winnerText).toBeDefined();
    expect(loserText).toBeNull();
  });

  it('should return null when isFetching is true', () => {
    const container = render(<WinnerStatusText {...props} isFetching={true} />);

    expect(container.toJSON()).toBeNull();
  });
});
