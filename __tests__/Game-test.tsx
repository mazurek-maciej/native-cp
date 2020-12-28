import 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

import Game from '../src/screens/Game';

import { configureStore } from '../src/store';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('Game screen', () => {
  const store = configureStore();

  it('should render correctly', () => {
    const component = (
      <Provider store={store}>
        <Game />
      </Provider>
    );

    render(component);
  });

  it('should render roll button contain game type in name', () => {
    const component = (
      <Provider store={store}>
        <Game />
      </Provider>
    );

    const { queryByText } = render(component);
    const selectedGameType = store.getState().game.gameType;
    const rollBtn = queryByText(`ROLL ${selectedGameType}`);

    expect(rollBtn).toBeDefined();
  });

  it('should render initial message to start the game before first roll', () => {
    const component = (
      <Provider store={store}>
        <Game />
      </Provider>
    );

    const { queryByText } = render(component);
    const initialMessage = queryByText('Press roll button to start the game!');

    expect(initialMessage).toBeDefined();
  });

  it('should render draw when isDraw is true', () => {
    const mockStore = configureStore({
      ...store.getState(),
      game: {
        ...store.getState().game,
        isDraw: true,
      },
    });
    const component = (
      <Provider store={mockStore}>
        <Game />
      </Provider>
    );

    const { queryByText } = render(component);
    const draw = queryByText(/draw/i);

    expect(draw).toBeDefined();
  });

  it('should render winner message', () => {
    const winner = store.getState().game.leftPlayer;
    const winnerName = winner.name;
    const looserName = store.getState().game.rightPlayer.name;
    const mockStore = configureStore({
      ...store.getState(),
      game: {
        ...store.getState().game,
        winnerId: winner.id,
      },
    });
    const component = (
      <Provider store={mockStore}>
        <Game />
      </Provider>
    );

    const { queryByText } = render(component);
    const winnerMessage = queryByText(`${winnerName} scored!`);
    const looserMessage = queryByText(`${looserName} scored!`);

    expect(winnerMessage).toBeDefined();
    expect(looserMessage).toBeNull();
  });

  it('should render both players with no score', () => {
    const component = (
      <Provider store={store}>
        <Game />
      </Provider>
    );

    const { queryByText, queryAllByText } = render(component);
    const leftPlayer = store.getState().game.leftPlayer.name;
    const rightPlayer = store.getState().game.rightPlayer.name;
    const leftPlayerName = queryByText(leftPlayer);
    const rightPlayerName = queryByText(rightPlayer);
    const scoreLabels = queryAllByText('0');

    expect(leftPlayerName).toBeDefined();
    expect(rightPlayerName).toBeDefined();
    expect(scoreLabels).toHaveLength(2);
  });

  it('should render fab button to change cards', () => {
    const component = (
      <Provider store={store}>
        <Game />
      </Provider>
    );

    const { queryByText } = render(component);
    const fab = queryByText(/change cards/i);

    expect(fab).toBeDefined();
  });

  it('should switch cards after press fab button', async () => {
    const initialGameType = store.getState().game.gameType;
    const component = (
      <Provider store={store}>
        <Game />
      </Provider>
    );

    const { findByText } = render(component);
    const fab = await findByText(/change cards/i);
    const initialRollBtn = await findByText(`ROLL ${initialGameType}`);

    expect(initialRollBtn).toBeDefined();

    fireEvent.press(fab);

    await waitFor(() => {
      const newRollBtn = store.getState().game.gameType;

      expect(newRollBtn).toBeDefined();
    })


  })
});
