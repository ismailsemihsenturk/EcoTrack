import { createSlice, PayloadAction,createAsyncThunk  } from '@reduxjs/toolkit';
import { getTips } from '../services/firestore';
import { Tip, TipsState } from '../types/interfaces';
 

const initialState: TipsState = {
  tips: [] as Tip[],
  categories: [] as Array<'sustainability' | 'energy' | 'waste'>,
  loading: false,
  error: null,
};

export const fetchTips = createAsyncThunk(
  'tips/fetchTips',
  async () => {
    const response = await getTips();
    return response;
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchTips.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTips.fulfilled, (state, action) => {
        state.loading = false;
        state.tips = [...state.tips, ...action.payload];
        state.categories = [
          ...new Set(
            action.payload
              .map((tip) => tip.category)
              .filter((category): category is 'sustainability' | 'energy' | 'waste' => 
                ['sustainability', 'energy', 'waste'].includes(category)
              )
          ),
        ];
      })
      .addCase(fetchTips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const { fetchTipsStart, fetchTipsSuccess, fetchTipsFailure, addTip } = tipsSlice.actions;
export default tipsSlice.reducer;