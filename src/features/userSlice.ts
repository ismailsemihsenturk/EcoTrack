import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store/index';
import { UserState } from '../types/interfaces';

const initialState: UserState = {
  userId: '',
  userName: 'İsmail Semih Şentürk',
  userEmail: 'senturkis98@hotmail.com',
  userPreferences: {
    theme: 'light',
    notificationsEnabled: false,
    language:"tr"
  },
  profilePicture: '',
  totalScore: 0,
  ranking: 0,
};

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
});

export const { setUserData, updateScore, updateRanking } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;