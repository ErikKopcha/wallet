import { createSlice } from '@reduxjs/toolkit';

const initialState = { isAuth: false, authToken: null};

export const sessionSlice = createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {
    authenticationSuccess: (state, action) => {
      state.isAuth = true;
      state.authToken = action.payload.token;
    }
  }
});

export const { authenticationSuccess } = sessionSlice.actions;
export default sessionSlice.reducer;
