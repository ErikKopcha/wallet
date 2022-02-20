import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  async (_, { rejectWithValue, getState, dispatch }) => {
    const token = getState().session.authToken;
    const requestOptions = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch('https://wallet.goit.ua/api/users/current', requestOptions);
      if (!response.ok) {
        throw new Error('Server error');
      } else {
        const user = await response.json();
        dispatch(getCurrentUser(user))
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

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
    },
    getCurrentUser: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.balance = action.payload.balance;
    }
  }
})

export const { registration, authorization, updateBalance, getCurrentUser } = userSlice.actions;
export default userSlice.reducer;
