import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import tipsReducer from '../features/tipsSlice'
import articlesReducer from '../features/articlesSlice'
import achievementsReducer from '../features/achievementSlice'
import carbonReducer from '../features/carbonSlice'
import leaderboardReducer from '../features/leaderboardSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    tips: tipsReducer,
    articles: articlesReducer,
    achievements: achievementsReducer,
    carbon: carbonReducer,
    leaderboard: leaderboardReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store