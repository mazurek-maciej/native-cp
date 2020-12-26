import React from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { SafeAreaView, StatusBar } from 'react-native';
import Game from './screens/Game';
import { Theme } from 'react-native-paper/lib/typescript/types';

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ffb74d'
  }
}

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#ffb74d', zIndex: 2}}/>
      <StatusBar barStyle="dark-content" />
      <Game />
    </PaperProvider>
  );
};

export default App;
