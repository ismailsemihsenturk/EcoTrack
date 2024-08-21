import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/interfaces';
import { RouteProp } from '@react-navigation/native';

interface ProileScreenProps {
    route: RouteProp<RootStackParamList, 'Profile'>;
  }

const Home:React.FC<ProileScreenProps> = ({route}) => {
  return (
    <View>
      <Text>Profile:React</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})