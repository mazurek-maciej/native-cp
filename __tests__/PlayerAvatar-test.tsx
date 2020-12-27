import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import PlayerAvatar from '../src/components/PlayerAvatar';

import { initialState as gameState } from '../src/store/game/reducers';
import { Side } from '../src/store/game/models/Side';

describe('PlayerAvatar component', () => {
  const player = gameState.leftPlayer;

  it('should render correctly', () => {
    render(<PlayerAvatar player={player} side={Side.left} />);
  });

  it('should render player name and score', () => {
    const { queryByText } = render(
      <PlayerAvatar player={player} side={Side.left} />,
    );
    const name = queryByText(player.name);
    const score = queryByText(String(player.score));

    expect(name).toBeDefined();
    expect(score).toBeDefined();
  });

  it('should render avatar', () => {
    const { getByRole } = render(
      <PlayerAvatar player={player} side={Side.left} />,
    );
    const avatar = getByRole('image');

    expect(avatar).toBeDefined();
  });
});
