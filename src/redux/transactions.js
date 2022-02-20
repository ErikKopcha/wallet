import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { updateBalance } from './user';

export const fetchCategories = createAsyncThunk(
  'transactions/fetchCategories',
  async (_, { rejectWithValue, getState }) => {
    const token = getState().session.authToken;
    const requestOptions = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch('https://wallet.goit.ua/api/transaction-categories', requestOptions);
      if (!response.ok) {
        throw new Error('Server error');
      } else {
        return await response.json();
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (_, { rejectWithValue, getState }) => {
    const token = getState().session.authToken;
    const requestOptions = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch('https://wallet.goit.ua/api/transactions', requestOptions);
      if (!response.ok) {
        throw new Error('Server error');
      } else {
        return await response.json();
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const postTransaction = createAsyncThunk(
  'transactions/postTransaction',
  async (transaction, { rejectWithValue, getState, dispatch }) => {
    const token = getState().session.authToken;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transaction),
    };
    try {
      const response = await fetch('https://wallet.goit.ua/api/transactions', requestOptions);
      if (!response.ok) {
        throw new Error('Server error!');
      } else {
        const data = await response.json();
        dispatch(addTransaction(data));
        dispatch(updateBalance(data));
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (transactionId, { rejectWithValue, getState, dispatch }) => {
    const token = getState().session.authToken;
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    };
    try {
      const response = await fetch(`https://wallet.goit.ua/api/transactions/${transactionId}`, requestOptions);
      if (!response.ok) {
        throw new Error('Server error!');
      } else {
        dispatch(deleteTransactionFromStore(transactionId));
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: { transactions: [], categories: [], status: null, error: null },
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },
    deleteTransactionFromStore: (state, action) => {
      state.transactions = state.transactions.filter(transaction => transaction.id !== action.payload);
    }
  },
  extraReducers: {
    [fetchCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
    },
    [fetchTransactions.pending]: (state, action) => {
      state.error = null;
      state.status = 'loading';
    },
    [fetchTransactions.fulfilled]: (state, action) => {
      state.error = null;
      state.status = 'resolved';
      //  state.status = 'loading';
      state.transactions = action.payload;
    },
    [fetchTransactions.rejected]: (state, action) => {
      state.error = 'Error';
      state.status = 'rejected';
    },
    [postTransaction.pending]: (state, action) => {
      state.error = null;
      state.status = 'loading';
    },
    [postTransaction.fulfilled]: (state, action) => {
      state.error = null;
      state.status = 'resolved';
    },
    [postTransaction.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = 'rejected';
    },
  },
});

export const { addTransaction, deleteTransactionFromStore } = transactionsSlice.actions;

export default transactionsSlice.reducer;