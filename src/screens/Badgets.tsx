import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Achievement, RootStackParamList } from '../types/interfaces';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { fetchAchievements } from '../features/achievementSlice';

interface BadgetsScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Badgets'>;
}

const Badgets: React.FC<BadgetsScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { achievements, unlockedAchievements, totalFootPrint } = useAppSelector(state => state.achievements);
  const user = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchAchievements(user.id));
  }, [dispatch, user.id]);

  const sortedAchievements = achievements.slice().sort((a, b) => a.requiredFootprint - b.requiredFootprint);
  const renderAchievement = (achievement: Achievement) => {
    const isUnlocked = unlockedAchievements.some(ua => ua.id === achievement.id);
    return (
      <View key={achievement.id} style={[styles.achievement, isUnlocked ? styles.unlockedAchievement : styles.lockedAchievement]}>
        <Image source={{ uri: achievement.imageUrl }} style={styles.achievementImage} />
        <Text style={styles.achievementTitle}>{achievement.title}</Text>
        <Text style={styles.achievementDescription}>{achievement.description}</Text>
        <Text style={styles.achievementProgress}>
          {isUnlocked ? 'Unlocked!' : `${totalFootPrint?.totalFootprint || 0}/${achievement.requiredFootprint} kg CO2`}
        </Text>
      </View>
    );
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Achievements</Text>
      <Text style={styles.totalFootprint}>Total Footprint: {totalFootPrint?.totalFootprint || 0} kg CO2</Text>
      <View style={styles.achievementsContainer}>
        {sortedAchievements.map(renderAchievement)}
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  achievementsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievement: {
    width: '48%',
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
  },
  unlockedAchievement: {
    backgroundColor: '#4CAF50',
  },
  lockedAchievement: {
    backgroundColor: '#9E9E9E',
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  achievementDescription: {
    fontSize: 12,
    marginBottom: 5,
  },
  achievementProgress: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  achievementImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  totalFootprint: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Badgets;