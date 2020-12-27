import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import NavigationBar from '../src/components/NavigationBar';

describe('NavigationBar component', () => {
  it('should render correctly', () => {
    render(<NavigationBar />);
  });

  it('should render Gwizdek title', () => {
    const { queryByText } = render(<NavigationBar />);
    const title = queryByText('Gwizdek');

    expect(title).toBeDefined();
  });

  it('should render icon', () => {
    const { queryByRole } = render(<NavigationBar />);
    const icon = queryByRole('image');

    expect(icon).toBeDefined();
  });
});
