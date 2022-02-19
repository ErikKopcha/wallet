import { createSlice } from '@reduxjs/toolkit';

const initialState = { isModalAddTransactionOpen: false, isModalLogoutOpen: false, isLoading: false };

export const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    openModalAddTransaction: (state) => {
      state.isModalAddTransactionOpen = true;
    },
    closeModalAddTransaction: (state) => {
      state.isModalAddTransactionOpen = false;
    },
    openModalLogout: (state) => {
      state.isModalLogoutOpen = true;
    },
    closeModalLogout: (state) => {
      state.isModalLogoutOpen = false;
    },
    loadingStarted: (state, action) => {
      state.isLoading = true;
    },
    loadingFinished: (state, action) => {
      state.isLoading = false;
    },
  }
});

export const { openModalAddTransaction, closeModalAddTransaction, openModalLogout, closeModalLogout, loadingStarted, loadingFinished } = globalSlice.actions;
export default globalSlice.reducer;
