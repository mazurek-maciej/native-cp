import React from 'react';
import { SafeAreaView } from 'react-native';
import { useTheme, Text } from 'react-native-paper';

const SelectGameType = () => {
  const theme = useTheme();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
      <Text>Select</Text>
    </SafeAreaView>
  )
}

export default SelectGameType;