import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/interfaces';

interface BadgetsScreenProps {
    navigation: StackNavigationProp<RootStackParamList, 'Badgets'>;
  }

const Badgets:React.FC<BadgetsScreenProps> = ({navigation}) => {
  return (
    <View>
      <Text>Badgets:React</Text>
    </View>
  )
}

export default Badgets

const styles = StyleSheet.create({})