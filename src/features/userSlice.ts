import { createSlice,PayloadAction  } from '@reduxjs/toolkit'
import type { RootState } from '../store/index'

interface InitialState {
    value: number,
    name: string,
}
const initialState: InitialState = {
    value: 0,
    name: "ismail semih şentürk"
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState, 
    reducers: {
        increment: (state) => {
          state.value += 1
        },
        decrement: (state) => {
          state.value -= 1
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        incrementByAmount: (state, action: PayloadAction<number>) => {
          state.value += action.payload
        },
      },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer