import { createSlice,PayloadAction  } from '@reduxjs/toolkit'
import type { RootState } from '../store/index'
import { UserState } from '../types/interfaces';

const initialState: UserState = {
  userId: '',
  userName: '',
  userEmail: '',
  userPreferences: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<Partial<UserState>>) => {
      state.userId = action.payload.userId || state.userId;
      state.userName = action.payload.userName || state.userName;
      state.userEmail = action.payload.userEmail || state.userEmail;
      state.userPreferences = {
        ...state.userPreferences,
        ...(action.payload.userPreferences || {}),
      };
    },
  },
});

export const { setUserData } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUserId = (state: RootState) => state.user.userId

export default userSlice.reducer