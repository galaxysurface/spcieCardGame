import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Button from './ui/Button';
import { initializeDatabase } from '../database/db';
import { PlayerType } from '../types/PlayerType';

const { width: widthScreen, height: heightScreen } = Dimensions.get('window');

type Props = {};

const Index = (props: Props) => {


  return (
    <SafeAreaView>
      <StatusBar hidden={true} style='auto' />
      <View style={styles.container}>
        <Text>Image</Text>
        <Button title='start Game' link='settingsView' />
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    width: widthScreen,
    height: heightScreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Index;