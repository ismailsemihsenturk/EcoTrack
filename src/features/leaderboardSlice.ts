import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getLeaderboard } from '../services/firestore';

export interface LeaderboardEntry {
    userId: string;
    userName: string;
    totalFootprint: number;
    energyFootprint: number;
    foodFootprint: number;
    wasteFootprint: number;
    rank: number;
}

interface LeaderboardState {
    entries: LeaderboardEntry[];
    loading: boolean;
    error: string | null;
}

const initialState: LeaderboardState = {
    entries: [],
    loading: false,
    error: null,
};

export const fetchLeaderboardData = createAsyncThunk(
    'leaderboard/fetchLeaderboardData',
    async (_, { rejectWithValue }) => {
        try {
            const leaderboardData = await getLeaderboard();
            return leaderboardData;
        } catch (error) {
            return rejectWithValue('Failed to fetch leaderboard data');
        }
    }
);

const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLeaderboardData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLeaderboardData.fulfilled, (state, action: PayloadAction<LeaderboardEntry[]>) => {
                state.entries = action.payload;
                state.loading = false;
            })
            .addCase(fetchLeaderboardData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const selectLeaderboard = (state: RootState) => state.leaderboard.entries;
export const selectLeaderboardLoading = (state: RootState) => state.leaderboard.loading;
export const selectLeaderboardError = (state: RootState) => state.leaderboard.error;

export default leaderboardSlice.reducer;