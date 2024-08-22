import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Achievement, AchievementsState } from '../types/interfaces';

const initialState: AchievementsState = {
  achievements: [],
  unlockedAchievements: [],
  loading: false,
  error: null,
};

const achievementsSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    fetchAchievementsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAchievementsSuccess: (state, action: PayloadAction<Achievement[]>) => {
      state.achievements = action.payload;
      state.loading = false;
    },
    fetchAchievementsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    unlockAchievement: (state, action: PayloadAction<string>) => {
      const achievement = state.achievements.find(a => a.id === action.payload);
      if (achievement && !state.unlockedAchievements.some(ua => ua.id === achievement.id)) {
        const unlockedAchievement = {
          ...achievement,
          unlockedDate: new Date().toISOString(),
        };
        state.unlockedAchievements.push(unlockedAchievement);
      }
    },    
  },
});

export const { fetchAchievementsStart, fetchAchievementsSuccess, fetchAchievementsFailure, unlockAchievement } = achievementsSlice.actions;
export default achievementsSlice.reducer;