import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, UserState } from '../types/interfaces';
import { useAppSelector, useAppDispatch } from '../utils/hooks';
import { RootState } from '../store';
import { fetchTips } from '../features/tipsSlice';
import { fetchArticles } from '../features/articlesSlice';
import { useAuth } from '../services/authContext';
import { User } from 'firebase/auth';
import { getUser } from '../services/firestore';
import { setUserData } from '../features/userSlice';
import { seedDatabase } from '../utils/seedDatabase';

interface HomeScreenProps {
  children: User | null;
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

const Home: React.FC<HomeScreenProps> = ({ navigation, children }) => {
  const { user, loading } = useAuth();
  const dispatch = useAppDispatch();
  const { tips, loading: tipsLoading, error: tipsError } = useAppSelector((state: RootState) => state.tips);
  const userRedux = useAppSelector((state: RootState) => state.user);
  const { articles, loading: articlesLoading, error: articlesError } = useAppSelector((state: RootState) => state.articles);
  const { unlockedAchievements } = useAppSelector((state: RootState) => state.achievements);
  const { weeklyAverage, monthlyAverage, totalReduction } = useAppSelector((state: RootState) => state.carbon);

  // useEffect(() => {
  //   const seedb = async () => {
  //     console.log("seed achievements")
  //     await seedDatabase();
  //   }
  //   seedb();
  // });

  useEffect(() => {
    dispatch(fetchTips());
    dispatch(fetchArticles());
  }, [dispatch]);

  useEffect(() => {
    const loginWithToken = async () => {
      try {
        if (user) {
          const reduxUser = await getUser(user.uid);
          if (reduxUser) {
            dispatch(setUserData(reduxUser));
          }
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    };
    loginWithToken()
  }, [user])

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      {user ? <Text>Welcome, {userRedux.userName}</Text> : <Text>Please sign in</Text>}
    </View>
  );
}

export default Home

const styles = StyleSheet.create({})