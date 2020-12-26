import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native';
import { useTheme, Text } from 'react-native-paper';

interface Props {
  navigation: StackNavigationProp<any, 'SelectGameType'>
}

const SelectGameType = ({ navigation }: Props) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
      <Text>Select</Text>
    </SafeAreaView>
  )
}

export default SelectGameType;