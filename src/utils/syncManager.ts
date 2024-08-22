import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveDailyFootprint } from '../services/firestore';
import { DailyFootprint } from '../types/interfaces';

export const syncOfflineData = async (userId: string) => {
  try {
    const offlineData = await AsyncStorage.getItem('@offline_footprints');
    if (offlineData) {
      const footprints: DailyFootprint[] = JSON.parse(offlineData);
      for (let footprint of footprints) {
        await saveDailyFootprint(userId, footprint);
      }
      await AsyncStorage.removeItem('@offline_footprints');
    }
  } catch (error) {
    console.error('Sync error:', error);
  }
};

export const saveOfflineFootprint = async (footprint: DailyFootprint) => {
  try {
    const existingData = await AsyncStorage.getItem('@offline_footprints');
    const footprints: DailyFootprint[] = existingData ? JSON.parse(existingData) : [];
    footprints.push(footprint);
    await AsyncStorage.setItem('@offline_footprints', JSON.stringify(footprints));
  } catch (error) {
    console.error('Offline save error:', error);
  }
};