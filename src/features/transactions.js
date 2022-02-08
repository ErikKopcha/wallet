import { createSlice } from '@reduxjs/toolkit';

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

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: [],
  reducers: {
    saveTransactions: (state, action) => {
      // state = action.payload.map((transaction) => {
      //   transaction.date = Date.parse(transaction.date).toLocaleDateString();
      //   transaction.type === 'true' ? transaction.type = '+' : transaction.type = '-';
      //   return transaction;
      // });
      state.push(...action.payload);
    },
    addTransaction: (state, action) => {
      state.push(action.payload);
    }
  },
});

export const { saveTransactions, addTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;