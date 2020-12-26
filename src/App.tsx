import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaView, Text, StatusBar } from 'react-native';

const App = () => {
  return (
    <PaperProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>Hello World</Text>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default App;
