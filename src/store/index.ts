import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import habitsReducer from '../features/habitsSlice'
import tipsReducer from '../features/tipsSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    habits: habitsReducer,
    tips: tipsReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store