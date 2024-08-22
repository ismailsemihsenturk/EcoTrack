import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect} from 'react'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/interfaces';
import { useAppSelector,useAppDispatch } from '../utils/hooks';
import { RootState } from '../store';
import { fetchTipsStart } from '../features/tipsSlice';

interface HomeScreenProps {
    children: React.ReactNode;
    navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  }

const Home:React.FC<HomeScreenProps> = ({navigation,children}) => {
  const dispatch = useAppDispatch();
  const { tips } = useAppSelector((state: RootState) => state.tips);
  const { articles } = useAppSelector((state: RootState) => state.articles);
  const { unlockedAchievements } = useAppSelector((state: RootState) => state.achievements);
  const { monthlyAverage, totalReduction } = useAppSelector((state: RootState) => state.carbon);

  useEffect(() => {
    dispatch(fetchTipsStart());
  }, [dispatch]);

  return (
    <View>
      <Text>Home:React</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})