import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store/index';
import { UserState } from '../types/interfaces';
import { updateUserScoreandRank } from '../services/firestore';

const initialState: UserState = {
  id: '',
  userName: '',
  userEmail: '',
  userPreferences: {
    theme: 'light',
    notificationsEnabled: false,
    language: "tr"
  },
  profilePicture: '',
  totalScore: 0,
  ranking: 0,
  loading: null,
  error: null,
};


export const updateScoreandRank = createAsyncThunk(
  'users/updateScoreandRank',
  async ({ userId, userName }: { userId: string; userName: string; }, { rejectWithValue }) => {
    try {
      const userScoreandRanks = await updateUserScoreandRank(userId, userName);
      return userScoreandRanks;
    } catch (error) {
      return rejectWithValue('Failed to fetch user footprint history');
    }
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    updateScore: (state, action: PayloadAction<number>) => {
      state.totalScore += action.payload;
    },
    updateRanking: (state, action: PayloadAction<number>) => {
      state.ranking = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateScoreandRank.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateScoreandRank.fulfilled, (state, action: PayloadAction<UserState | null>) => {
        state.totalScore = action.payload?.totalScore || state.totalScore;
        state.ranking = action.payload?.ranking || state.ranking;
      })
      .addCase(updateScoreandRank.rejected, (state) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export const { setUserData, updateScore, updateRanking } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;