import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Tip, Article, Achievement, UnlockedAchievement } from '../types/interfaces';
import { useAppSelector, useAppDispatch } from '../utils/hooks';
import { RootState } from '../store';
import { fetchTips } from '../features/tipsSlice';
import { fetchArticles } from '../features/articlesSlice';
import { fetchAchievements } from '../features/achievementSlice';
import { fetchUserFootprintHistory } from '../features/carbonSlice';
import { useAuth } from '../services/authContext';
import { getRankFromLeaderBoard, getUser } from '../services/firestore';
import { setUserData } from '../features/userSlice';
import { FontWeight, theme } from '../styles/theme';
import Ionicons from '@expo/vector-icons/Ionicons';


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
  const [showAllAchievements, setShowAllAchievements] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(fetchTips());
      dispatch(fetchArticles());
      dispatch(fetchAchievements(user.uid));

      const endDate = new Date();
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 14);
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

  useEffect(() => {
    const getRank = async () => {
      userRedux.ranking = await getRankFromLeaderBoard(userRedux.userName);
    }
    getRank();
  }, [])


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

  const renderCard = (title: string, content: React.ReactNode) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {content}
    </View>
  );

  const renderTip = useCallback(({ item }: { item: Tip }) => (
    <View style={styles.tipItem}>
      <Text style={styles.tipCategory}>{item.category}</Text>
      <Text style={styles.tipTitle}>{item.title}</Text>
      <Text style={styles.tipContent} numberOfLines={2}>{item.content}</Text>
    </View>
  ), []);

  const renderArticle = useCallback(({ item }: { item: Article }) => (
    <View style={styles.articleItem}>
      <Text style={styles.articleTitle}>{item.title}</Text>
      <Text style={styles.articleContent} numberOfLines={2}>{item.content}</Text>
      <Text style={styles.articleDate}>{new Date(item.publishDate).toLocaleDateString()}</Text>
    </View>
  ), []);

  const renderAchievement = useCallback(({ item }: { item: UnlockedAchievement }) => (
    <View style={styles.achievementItem}>
      {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.achievementIcon} />}
      <Text style={styles.achievementTitle}>{item.title}</Text>
    </View>
  ), []);

  const sortedArticles = [...articles].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

  // `return` her zaman burada, hook'lardan sonra olmalıdır.
  if (authLoading || tipsLoading || articlesLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: userRedux.profilePicture || 'https://via.placeholder.com/150' }}
          style={styles.profilePic}
        />
        <View>
          <Text style={styles.userName}>{userRedux.userName}</Text>
          <Text style={styles.userName}>Rank: {userRedux.ranking}</Text>
        </View>
      </View>

      {renderCard("Weekly Carbon Summary", (
        <View style={styles.carbonSummary}>
          <Ionicons
            name={calculateWeeklyComparison().includes('az') ? 'trending-down' : 'trending-up'}
            size={24}
            color={theme.colors.primary}
          />
          <Text style={styles.carbonText}>{calculateWeeklyComparison()}</Text>
        </View>
      ))}

      {renderCard("Eco Tips", (
        <FlatList
          data={tips.slice(0, 3)}
          renderItem={renderTip}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      ))}

      {renderCard("Articles", (
        <FlatList
          data={sortedArticles.slice(0, 3)}
          renderItem={renderArticle}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      ))}

      {renderCard("Achievements", (
        <View>
          <View style={styles.achievementHeader}>
            <Text style={styles.achievementText}>
              You have unlocked {unlockedAchievements.length} / {achievements.length} achievements!
            </Text>
            <TouchableOpacity
              style={styles.viewAllButton}
              onPress={() => setShowAllAchievements(!showAllAchievements)}
            >
              <Text style={styles.viewAllButtonText}>
                {showAllAchievements ? 'Hide' : 'See All'}
              </Text>
            </TouchableOpacity>
          </View>
          {showAllAchievements && (
            <FlatList
              data={unlockedAchievements}
              renderItem={renderAchievement}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          )}
        </View>
      ))}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: theme.spacing.md,
  },
  welcomeText: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.text,
    fontWeight: theme.typography.fontWeight.regular as FontWeight,
  },
  userName: {
    fontSize: theme.typography.fontSize.large,
    color: theme.colors.text,
    fontWeight: theme.typography.fontWeight.bold as FontWeight,
  },
  card: {
    backgroundColor: theme.colors.text,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: theme.typography.fontWeight.bold as FontWeight,
    color: theme.colors.secondary_text,
    marginBottom: theme.spacing.sm,
  },
  carbonSummary: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carbonText: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.secondary_text,
    marginLeft: theme.spacing.sm,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  listItemText: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.secondary_text,
    marginLeft: theme.spacing.sm,
  },
  achievementContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  achievementText: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.secondary_text,
    maxWidth: '70%',
  },
  tipItem: {
    marginBottom: theme.spacing.sm,
  },
  tipCategory: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.secondary,
    marginBottom: theme.spacing.xs,
  },
  tipTitle: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: theme.typography.fontWeight.bold as FontWeight,
    color: theme.colors.secondary_text,
    marginBottom: theme.spacing.xs,
  },
  tipContent: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.secondary_text,
  },
  articleItem: {
    marginBottom: theme.spacing.sm,
  },
  articleTitle: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: theme.typography.fontWeight.bold as FontWeight,
    color: theme.colors.secondary_text,
    marginBottom: theme.spacing.xs,
  },
  articleContent: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.secondary_text,
    marginBottom: theme.spacing.xs,
  },
  articleDate: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.secondary,
  },
  achievementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  achievementIcon: {
    width: 30,
    height: 30,
    marginRight: theme.spacing.sm,
  },
  achievementTitle: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.secondary_text,
  },
  viewAllButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  viewAllButtonText: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.small,
    fontWeight: theme.typography.fontWeight.medium as FontWeight,
  },
});

export default Home;