import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tip, TipsState } from '../types/interfaces';
 

const initialState: TipsState = {
  tips: [],
  categories: [] as Array<'sustainability' | 'energy' | 'waste'>,
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
      state.categories = [
        ...new Set(
          action.payload
            .map((tip) => tip.category)
            .filter((category): category is 'sustainability' | 'energy' | 'waste' => 
              ['sustainability', 'energy', 'waste'].includes(category)
            )
        ),
      ];
      state.loading = false;
    },
    fetchTipsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addTip: (state, action: PayloadAction<Tip>) => {
      state.tips.push(action.payload);
      const { category } = action.payload;
      if (
        ['sustainability', 'energy', 'waste'].includes(category) &&
        !state.categories.includes(category as 'sustainability' | 'energy' | 'waste')
      ) {
        state.categories.push(category as 'sustainability' | 'energy' | 'waste');
      }
    },
  },
});

export const { fetchTipsStart, fetchTipsSuccess, fetchTipsFailure, addTip } = tipsSlice.actions;
export default tipsSlice.reducer;