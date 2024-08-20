import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Habit,HabitsState } from '../types/interfaces';

const initialState: HabitsState = {
  habits: [],
  habitProgress: {},
  habitGoals: {},
};

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit: (state, action: PayloadAction<Partial<Habit>>) => {
      const newHabit: Habit = {
        id: action.payload.id || crypto.randomUUID(),
        name: action.payload.name || '',
        progress: action.payload.progress || 0,
        goal: action.payload.goal || 0,
      };
      state.habits.push(newHabit);
      state.habitProgress[newHabit.id] = newHabit.progress;
      state.habitGoals[newHabit.id] = newHabit.goal;
    },
    updateHabitProgress: (state, action: PayloadAction<{ habitId: string; progress: number }>) => {
      const { habitId, progress } = action.payload;
      state.habitProgress[habitId] = progress;
      const habit = state.habits.find((h) => h.id === habitId);
      if (habit) {
        habit.progress = progress;
      }
    },
    setHabitGoals: (state, action: PayloadAction<{ habitId: string; goal: number }>) => {
      const { habitId, goal } = action.payload;
      state.habitGoals[habitId] = goal;
      const habit = state.habits.find((h) => h.id === habitId);
      if (habit) {
        habit.goal = goal;
      }
    },
  },
});

export const { addHabit, updateHabitProgress, setHabitGoals } = habitsSlice.actions;
export default habitsSlice.reducer;