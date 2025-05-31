import {createSlice} from '@reduxjs/toolkit';

export const booleanSlice = createSlice({
  name: 'boolean',
  initialState: {
    value: false
  },
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  }
});

export const {toggle, incrementByAmount} = booleanSlice.actions;

export default booleanSlice.reducer;
