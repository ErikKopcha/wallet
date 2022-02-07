import { createSlice } from '@reduxjs/toolkit';

const initialState = { isLoading: false };

export const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    loadingStarted: (state, action) => {
      state.isLoading = true;
    },
    loadingFinished: (state, action) => {
      state.isLoading = false;
    },
  }
});

export const { loadingStarted, loadingFinished } = globalSlice.actions;
export default globalSlice.reducer;
