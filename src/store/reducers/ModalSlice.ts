import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShown: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggle(state) {
      state.isShown = !state.isShown;
    },
  },
});

export const { toggle } = modalSlice.actions;
export default modalSlice.reducer;
