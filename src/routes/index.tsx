import React from 'react';
import { Appearance, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Provider as PaperProvider,
  DefaultTheme,
  DarkTheme,
} from 'react-native-paper';
import { Theme } from 'react-native-paper/lib/typescript/types';
import Game from '../screens/Game';
import SelectGameType from '../screens/SelectGameType';
import NavigationBar from '../components/NavigationBar';

const RootRouting = () => {
  const lightTheme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#ffb74d',
    },
  };

  const darkTheme: Theme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#ffb74d',
    },
  };

  const themeInIos =
    Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme;

  const Stack = createStackNavigator();

  return (
    <PaperProvider theme={Platform.OS === 'ios' ? themeInIos : darkTheme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SelectGameType"
          screenOptions={{
            header: (props) => <NavigationBar {...props} />,
          }}>
          <Stack.Screen name="Game" component={Game} />
          <Stack.Screen name="SelectGameType" component={SelectGameType} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default RootRouting;
