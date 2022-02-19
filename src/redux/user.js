import { createSlice } from '@reduxjs/toolkit';

const initialState = { id: '', username: '', email: '', balance: 0 }

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    registration: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.balance = action.payload.balance;
    },
    authorization: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.balance = action.payload.balance;
    },
    updateBalance: (state, action) => {
      state.balance = action.payload.balanceAfter;
    }
  }
})

export const { registration, authorization, updateBalance } = userSlice.actions;
export default userSlice.reducer;
