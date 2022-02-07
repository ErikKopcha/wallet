import { createSlice } from '@reduxjs/toolkit';

const initialState = { ModalAddTransactionOpen: false, isLoading: false };

export const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    openModalAddTransaction: (state) => {
      state.ModalAddTransactionOpen = true;
    },
    closeModalAddTransaction: (state) => {
      state.ModalAddTransactionOpen = false;
    },
    loadingStarted: (state, action) => {
      state.isLoading = true;
    },
    loadingFinished: (state, action) => {
      state.isLoading = false;
    },
  }
});

export const { openModalAddTransaction, closeModalAddTransaction, loadingStarted, loadingFinished } = globalSlice.actions;
export default globalSlice.reducer;
