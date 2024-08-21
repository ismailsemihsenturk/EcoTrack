import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/interfaces';

interface CalculatorScreenProps {
    navigation: StackNavigationProp<RootStackParamList, 'Badgets'>;
  }

const Calculator:React.FC<CalculatorScreenProps> = ({navigation}) => {
  return (
    <View>
      <Text>Calculator:React</Text>
    </View>
  )
}

export default Calculator

const styles = StyleSheet.create({})