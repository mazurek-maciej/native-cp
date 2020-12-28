import 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

import { configureStore } from '../src/store';

import RootRouting from '../src/routes';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('SelectGameType screen', () => {
  const store = configureStore();

  it('should render correctly', () => {
    const component = (
      <Provider store={store}>
        <RootRouting />
      </Provider>
    );

    render(component);
  });

  it('should render title and short description', async () => {
    const component = (
      <Provider store={store}>
        <RootRouting />
      </Provider>
    );

    const { findByText } = render(component);
    const title = await findByText(/choose cards/i);
    const description = await findByText(
      /select which cards you want to play with/i,
    );

    expect(title).toBeDefined();
    expect(description).toBeDefined();
  });

  it('should render both select cards', async () => {
    const component = (
      <Provider store={store}>
        <RootRouting />
      </Provider>
    );

    const { findByText } = render(component);
    const people = await findByText(/people/i);
    const starships = await findByText(/starships/i);

    expect(people).toBeDefined();
    expect(starships).toBeDefined();
  });

  it('should switch screen after pressing one of the cards', async () => {
    const component = (
      <Provider store={store}>
        <RootRouting />
      </Provider>
    );

    const { findByText } = render(component);
    const people = await findByText(/people/i);

    fireEvent.press(people);

    await waitFor(() => {
      expect(findByText('Press roll button to start the game!')).toBeDefined();
      expect(findByText(/roll people/i)).toBeDefined();
    });
  });
});
