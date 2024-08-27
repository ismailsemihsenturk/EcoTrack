import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Tip, Article, Achievement } from '../types/interfaces';
import { useAppSelector, useAppDispatch } from '../utils/hooks';
import { RootState } from '../store';
import { fetchTips } from '../features/tipsSlice';
import { fetchArticles } from '../features/articlesSlice';
import { fetchAchievements } from '../features/achievementSlice';
import { fetchUserFootprintHistory } from '../features/carbonSlice';
import { useAuth } from '../services/authContext';
import { getUser } from '../services/firestore';
import { setUserData } from '../features/userSlice';

interface HomeScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

const Home: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { user, loading: authLoading } = useAuth();
  const dispatch = useAppDispatch();
  const { tips, loading: tipsLoading } = useAppSelector((state: RootState) => state.tips);
  const userRedux = useAppSelector((state: RootState) => state.user);
  const { articles, loading: articlesLoading } = useAppSelector((state: RootState) => state.articles);
  const { achievements, unlockedAchievements } = useAppSelector((state: RootState) => state.achievements);
  const { dailyFootprints } = useAppSelector((state: RootState) => state.carbon);

  useEffect(() => {
    if (user) {
      dispatch(fetchTips());
      dispatch(fetchArticles());
      dispatch(fetchAchievements(user.uid));

      const endDate = new Date();
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 14); // Son 2 hafta
      dispatch(fetchUserFootprintHistory({ userId: user.uid, startDate, endDate }));
    }
  }, [dispatch, user]);

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
    loginWithToken();
  }, [user, dispatch]);

  const calculateWeeklyComparison = () => {
    const sortedFootprints = Object.values(dailyFootprints).sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const thisWeek = sortedFootprints.slice(0, 7);
    const lastWeek = sortedFootprints.slice(7, 14);

    const thisWeekAvg = thisWeek.reduce((sum, fp) => sum + fp.dailyTotalFootprint, 0) / thisWeek.length;
    const lastWeekAvg = lastWeek.reduce((sum, fp) => sum + fp.dailyTotalFootprint, 0) / lastWeek.length;

    const difference = thisWeekAvg - lastWeekAvg;
    return difference > 0
      ? `You emitted ${difference.toFixed(2)} kg more carbon this week than last week.`
      : `You emitted ${Math.abs(difference).toFixed(2)} kg less carbon this week than last week.`;
  };

  if (authLoading || tipsLoading || articlesLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {userRedux.userName}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Eco Tips</Text>
        {tips.slice(0, 3).map((tip: Tip) => (
          <Text key={tip.id}>{tip.title}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>News</Text>
        {articles.slice(0, 3).map((article: Article) => (
          <Text key={article.id}>{article.title}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <Text>You have unlocked {unlockedAchievements.length} / {achievements.length} achievements.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Carbon Footprint Comparison</Text>
        <Text>{calculateWeeklyComparison()}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Home;