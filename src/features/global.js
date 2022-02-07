import { createSlice } from '@reduxjs/toolkit';

const initialState = {ModalAddTransactionOpen: false}

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
  }
});

export const { openModalAddTransaction, closeModalAddTransaction } = globalSlice.actions;
export default globalSlice.reducer;
