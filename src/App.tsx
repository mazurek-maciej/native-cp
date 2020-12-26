import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import Game from './screens/Game';
import { Theme } from 'react-native-paper/lib/typescript/types';
import { configureStore } from './store';
import { RootState } from './store/state';

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ffb74d'
  }
}

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <SafeAreaView style={{flex: 0, backgroundColor: '#ffb74d', zIndex: 2}}/>
        <StatusBar barStyle="dark-content" />
        <Game />
      </PaperProvider>
    </Provider>
  );
};

export default App;
