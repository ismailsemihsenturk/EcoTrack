import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tip,TipsState } from '../types/interfaces';

const initialState: TipsState = {
  tips: [],
  tipCategories: [],
  tipsSavedByUser: [],
};

const tipsSlice = createSlice({
  name: 'tips',
  initialState,
  reducers: {
    fetchTips: (state, action: PayloadAction<Tip[]>) => {
      state.tips = action.payload;
      state.tipCategories = [...new Set(action.payload.map((tip) => tip.category))];
    },
    saveTipByUser: (state, action: PayloadAction<string>) => {
      if (!state.tipsSavedByUser.includes(action.payload)) {
        state.tipsSavedByUser.push(action.payload);
      }
    },
  },
});

export const { fetchTips, saveTipByUser } = tipsSlice.actions;
export default tipsSlice.reducer;