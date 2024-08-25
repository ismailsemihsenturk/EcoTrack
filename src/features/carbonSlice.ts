import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { CarbonState, DailyFootprint } from '../types/interfaces';
import { saveDailyFootprint, getUserFootprints } from '../services/firestore';
import { updateTotalFootprintAndCheckAchievements } from './achievementSlice';

const initialState: CarbonState = {
  dailyFootprints: {},
  weeklyAverage: 0,
  monthlyAverage: 0,
  totalReduction: 0,
  loading: false,
  error: null,
};

export const fetchFootprints = createAsyncThunk(
  'carbon/fetchFootprints',
  async (userId: string) => {
    const response = await getUserFootprints(userId);
    return response;
  }
);

export const addFootprintAndCalculate = createAsyncThunk(
  'carbon/addFootprintAndCalculate',
  async (params: { userId: string, footprint: DailyFootprint }, { dispatch, getState }) => {
    await saveDailyFootprint(params.userId, params.footprint);
    dispatch(addDailyFootprint(params.footprint));

    const state = getState() as { carbon: CarbonState };
    const footprints = Object.values(state.carbon.dailyFootprints);

    // Calculate weekly average
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const weeklyFootprints = footprints.filter(f => new Date(f.date) >= oneWeekAgo);
    const weeklyAverage = weeklyFootprints.reduce((sum, f) => sum + f.dailyTotalFootprint, 0) / weeklyFootprints.length;

    // Calculate monthly average
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const monthlyFootprints = footprints.filter(f => new Date(f.date) >= oneMonthAgo);
    const monthlyAverage = monthlyFootprints.reduce((sum, f) => sum + f.dailyTotalFootprint, 0) / monthlyFootprints.length;

    // Calculate total reduction
    const totalReduction = footprints.length > 1
      ? footprints[0].dailyTotalFootprint - footprints[footprints.length - 1].dailyTotalFootprint
      : 0;


    dispatch(updateTotalFootprintAndCheckAchievements({
      userId: params.userId,
      newFootprint: params.footprint.dailyTotalFootprint
    }));

    return { weeklyAverage, monthlyAverage, totalReduction };
  }
);

const carbonSlice = createSlice({
  name: 'carbon',
  initialState,
  reducers: {
    addDailyFootprint: (state, action: PayloadAction<DailyFootprint>) => {
      state.dailyFootprints[action.payload.date] = action.payload;
    },
    updateWeeklyAverage: (state, action: PayloadAction<number>) => {
      state.weeklyAverage = action.payload;
    },
    updateMonthlyAverage: (state, action: PayloadAction<number>) => {
      state.monthlyAverage = action.payload;
    },
    updateTotalReduction: (state, action: PayloadAction<number>) => {
      state.totalReduction = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFootprints.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFootprints.fulfilled, (state, action: PayloadAction<DailyFootprint[]>) => {
        state.loading = false;
        state.dailyFootprints = action.payload.reduce((acc, footprint) => {
          acc[footprint.date] = footprint;
          return acc;
        }, {} as { [date: string]: DailyFootprint });
      })
      .addCase(fetchFootprints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(addFootprintAndCalculate.fulfilled, (state, action) => {
        state.weeklyAverage = action.payload.weeklyAverage;
        state.monthlyAverage = action.payload.monthlyAverage;
        state.totalReduction = action.payload.totalReduction;
      });
  },
});

export const {
  addDailyFootprint,
  updateWeeklyAverage,
  updateMonthlyAverage,
  updateTotalReduction
} = carbonSlice.actions;

export default carbonSlice.reducer;