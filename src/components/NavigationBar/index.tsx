import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Avatar, Title } from 'react-native-paper';

const NavigationBar = () => {
  return (
    <Appbar.Header>
      <Appbar.Content
        title={
          <View style={styles.appBarTitle}>
            <Avatar.Image
              source={require('../../assets/images/whistle.png')}
              size={36}
              style={styles.icon}
            />
            <Title>Gwizdek</Title>
          </View>
        }
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  appBarTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
});

export default NavigationBar;
