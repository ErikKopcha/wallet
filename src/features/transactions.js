import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

// const initialState = [
//   { date: '22.01.2022', type: false, category: 'Car', comments: 'ghjghjgh', amount: '123' },
//   {
//     date: '22.01.2022',
//     type: false,
//     category: 'Car',
//     comments: 'ghjgfnsvs dvlbldvjsdv slbjdvsbjld svjlbsd vlbjhjgh',
//     amount: '123',
//   },
//   { date: '01.05.2020', type: true, category: 'Car', comments: 'ghjghjgh', amount: '56' },
//   {
//     date: '10.01.2021',
//     type: false,
//     category: 'Car',
//     comments: 'ghjghd fljdljdbldzjnlb djlz;zndljb fgndbfjgh',
//     amount: '123',
//   },
//   { date: '22.01.2022', type: true, category: 'Other', comments: 'ghjghjgh', amount: '45656' },
//   { date: '22.01.2022', type: false, category: 'Car', comments: 'ghjghjgh', amount: '123' },
//   {
//     date: '11.01.2022',
//     type: true,
//     category: 'Products',
//     comments: 'ghjv dnljsdvjvdljbvbjlv dsbjldvsjbldsvbjldsbj ldsvvsdjbdvsjb ldsvbvdsblj vdsghjgh',
//     amount: '123',
//   },
//   {
//     date: '11.01.2022',
//     type: true,
//     category: 'Products',
//     comments: 'ghjv dnljsdvjvdljbvbjlv dsbjldvsjbldsvbjldsbj ldsvvsdjbdvsjb ldsvbvdsblj vdsghjgh',
//     amount: '123',
//   },
//   {
//     date: '11.01.2022',
//     type: true,
//     category: 'Products',
//     comments: 'ghjv dnljsdvjvdljbvbjlv dsbjldvsjbldsvbjldsbj ldsvvsdjbdvsjb ldsvbvdsblj vdsghjgh',
//     amount: '123',
//   },
//   {
//     date: '11.01.2022',
//     type: true,
//     category: 'Products',
//     comments: 'ghjv dnljsdvjvdljbvbjlv dsbjldvsjbldsvbjldsbj ldsvvsdjbdvsjb ldsvbvdsblj vdsghjgh',
//     amount: '123',
//   },
//   {
//     date: '11.01.2022',
//     type: true,
//     category: 'Products',
//     comments: 'ghjv dnljsdvjvdljbvbjlv dsbjldvsjbldsvbjldsbj ldsvvsdjbdvsjb ldsvbvdsblj vdsghjgh',
//     amount: '123',
//   },
//   {
//     date: '11.01.2022',
//     type: true,
//     category: 'Products',
//     comments: 'ghjv dnljsdvjvdljbvbjlv dsbjldvsjbldsvbjldsbj ldsvvsdjbdvsjb ldsvbvdsblj vdsghjgh',
//     amount: '123',
//   },
//   { date: '22.01.2022', type: false, category: 'Car', comments: 'ghjghjgh', amount: '565656' },
// ];
const useTransactionsAPI = () => {
  const urlBase = 'https://wallet.goit.ua/api';
  const _apiTransactions = 'transactions';
  const _apiCategories = 'transaction-categories';
  const token = useSelector(state => state.session.authToken);

  const requestOptions = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };
};

export const fetchCategories = createAsyncThunk(
  'reansactions/fetchCategories',
  async function() {
    const token = useSelector(state => state.session.authToken);
    const requestOptions = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };
    const response = await fetch('https://wallet.goit.ua/api/transaction-categories', requestOptions);
    const data = await response.json();

    return data;
  }
)

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async function() {
    const token = useSelector(state => state.session.authToken);
    const requestOptions = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };
    const response = await fetch('https://wallet.goit.ua/api/transactions', requestOptions);
    const data = await response.json();

    return data;
  },
);

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: { transactions: [], categories: [], status: null, error: null },
  reducers: {
    // saveCategories: (state, action) => {
    //   state.categories = action.payload;
    // },
    // saveTransactions: (state, action) => {
    //   state.transactions = action.payload.map(transaction => {
    //     return {
    //       date: (new Date(transaction.transactionDate)).toLocaleDateString(),
    //       type: transaction.type === 'INCOME' ? '+' : '-',
    //       category: state.categories.find(category => category.id === transaction.categoryId).name,
    //       comment: transaction.comment,
    //       amount: transaction.amount,
    //     };
    //   });
    // },
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },
  },
  extraReducers: {
    [fetchTransactions.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchTransactions.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.error = null;
      state.transactions = action.payload.map(transaction => {
        return {
          date: (new Date(transaction.transactionDate)).toLocaleDateString(),
          type: transaction.type === 'INCOME' ? '+' : '-',
          category: state.categories.find(category => category.id === transaction.categoryId).name,
          comment: transaction.comment,
          amount: transaction.amount,
        };
      });
    },
    [fetchTransactions.rejected]: (state, action) => {

    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { addTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;