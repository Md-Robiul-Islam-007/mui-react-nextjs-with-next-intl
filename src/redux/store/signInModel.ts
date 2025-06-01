import {createSlice} from '@reduxjs/toolkit';

export const signInModel = createSlice({
  name: 'signInModel',
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

export const {toggle, incrementByAmount} = signInModel.actions;

export default signInModel.reducer;
