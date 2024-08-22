import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CarbonState, DailyFootprint } from '../types/interfaces';

const initialState: CarbonState = {
  dailyFootprints: {},
  monthlyAverage: 0,
  totalReduction: 0,
  loading: false,
  error: null,
};

const carbonSlice = createSlice({
  name: 'carbon',
  initialState,
  reducers: {
    addDailyFootprint: (state, action: PayloadAction<DailyFootprint>) => {
      state.dailyFootprints[action.payload.date] = action.payload.footprint;
    },
    updateMonthlyAverage: (state, action: PayloadAction<number>) => {
      state.monthlyAverage = action.payload;
    },
    updateTotalReduction: (state, action: PayloadAction<number>) => {
      state.totalReduction = action.payload;
    },
    fetchCarbonDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCarbonDataSuccess: (state, action: PayloadAction<Partial<CarbonState>>) => {
      return { ...state, ...action.payload, loading: false };
    },
    fetchCarbonDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { 
  addDailyFootprint, 
  updateMonthlyAverage, 
  updateTotalReduction,
  fetchCarbonDataStart,
  fetchCarbonDataSuccess,
  fetchCarbonDataFailure
} = carbonSlice.actions;
export default carbonSlice.reducer;