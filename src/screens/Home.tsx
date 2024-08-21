import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/interfaces';

interface HomeScreenProps {
    navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  }

const Home:React.FC<HomeScreenProps> = ({navigation}) => {
  return (
    <View>
      <Text>Home:React</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})