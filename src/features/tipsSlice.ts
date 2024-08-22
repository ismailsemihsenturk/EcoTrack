import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tip, TipsState } from '../types/interfaces';

const initialState: TipsState = {
  tips: [],
  categories: [],
  loading: false,
  error: null,
};

const tipsSlice = createSlice({
  name: 'tips',
  initialState,
  reducers: {
    fetchTipsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTipsSuccess: (state, action: PayloadAction<Tip[]>) => {
      state.tips = action.payload;
      state.categories = [...new Set(action.payload.map((tip) => tip.category))];
      state.loading = false;
    },
    fetchTipsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addTip: (state, action: PayloadAction<Tip>) => {
      state.tips.push(action.payload);
      if (!state.categories.includes(action.payload.category)) {
        state.categories.push(action.payload.category);
      }
    },
  },
});

export const { fetchTipsStart, fetchTipsSuccess, fetchTipsFailure, addTip } = tipsSlice.actions;
export default tipsSlice.reducer;