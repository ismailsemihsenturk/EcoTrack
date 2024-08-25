import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Achievement, AchievementsState, RootState, TotalUserFootPrint } from '../types/interfaces';
import { getAchievements, updateTotalFootprint, getUserUnlockedAchievements, updateTotalUserFootPrint, getTotalUserFootPrint, unlockUserAchievement } from '../services/firestore';

const initialState: AchievementsState = {
  achievements: [],
  unlockedAchievements: [],
  totalFootPrint: {} as TotalUserFootPrint,
  loading: false,
  error: null,
};

export const fetchAchievements = createAsyncThunk(
  'achievements/fetchAchievements',
  async (userId: string) => {
    const allAchievements = await getAchievements();
    const unlockedAchievements = await getUserUnlockedAchievements(userId);
    const globalFootprint = await getTotalUserFootPrint(userId);
    return { allAchievements, unlockedAchievements, globalFootprint };
  }
);

export const updateTotalFootprintAndCheckAchievements = createAsyncThunk(
  'achievements/updateTotalFootprintAndCheck',
  async (params: { userId: string, newFootprint: number }, { dispatch, getState }) => {
    const { userId, newFootprint } = params;
    const state = getState() as RootState;
    const currentTotalUserFootPrint = state.achievements.totalFootPrint;

    const newTotal = (currentTotalUserFootPrint?.totalFootprint || 0) + newFootprint;

    await updateTotalUserFootPrint(userId, newTotal);

    const unlockedAchievements = await getUserUnlockedAchievements(userId);
    const achievementsToUnlock = state.achievements.achievements.filter(
      a => a.requiredFootprint <= newTotal && !unlockedAchievements.some(ua => ua.id === a.id)
    );

    for (const achievement of achievementsToUnlock) {
      await unlockUserAchievement(userId, achievement.id);
      dispatch(unlockAchievement(achievement.id));
    }

    return await getTotalUserFootPrint(userId);
  }
);

const achievementsSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    unlockAchievement: (state, action: PayloadAction<string>) => {
      const achievement = state.achievements.find(a => a.id === action.payload);
      if (achievement && !state.unlockedAchievements.some(ua => ua.id === achievement.id)) {
        state.unlockedAchievements.push({
          ...achievement,
          unlockedDate: new Date().toISOString(),
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAchievements.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAchievements.fulfilled, (state, action) => {
        state.achievements = action.payload.allAchievements;
        state.unlockedAchievements = action.payload.unlockedAchievements;
        state.totalFootPrint = action.payload.globalFootprint;
        state.loading = false;
      })
      .addCase(fetchAchievements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(updateTotalFootprintAndCheckAchievements.fulfilled, (state, action) => {
        state.totalFootPrint = action.payload
      });
  },
});

export const { unlockAchievement } = achievementsSlice.actions;
export default achievementsSlice.reducer;