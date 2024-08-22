import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/interfaces';
import { useAppSelector, useAppDispatch } from '../utils/hooks';
import { RootState } from '../store';
import { addTip, fetchTips, fetchTipsStart } from '../features/tipsSlice';
import { seedDatabase } from '../utils/seedDatabase';

interface HomeScreenProps {
  children: React.ReactNode;
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

const Home: React.FC<HomeScreenProps> = ({ navigation, children }) => {
  const dispatch = useAppDispatch();
  const { tips, loading, error } = useAppSelector((state: RootState) => state.tips);
  const { articles } = useAppSelector((state: RootState) => state.articles);
  const { unlockedAchievements } = useAppSelector((state: RootState) => state.achievements);
  const { weeklyAverage, monthlyAverage, totalReduction } = useAppSelector((state: RootState) => state.carbon);

  useEffect(() => {
    dispatch(fetchTips());

  }, [dispatch]);

  // useEffect(() => {
  //     const seedDb = async() => {
  //     await seedDatabase();
  //   }
  //   seedDb().catch(console.error);
  // }, [])
  // console.log('Tips in component:', tips);

  return (
    <View>
      <Text>Home:React</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})