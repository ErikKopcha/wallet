import { createSlice } from '@reduxjs/toolkit';

 const initialState = { isAuth: false, authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI0ZDdiMjMwNy02MzczLTRjZDEtYjdhNC01OTJiNWY4MTFhOWIiLCJpYXQiOjE2NDM4OTYxMjgsImV4cCI6MTAwMDAwMDE2NDM4OTYxMjh9.H_OeKRNV1n5FEys9HV32vZtPdErhkQeR1yuahLOqj8c'};
//const initialState = { isAuth: false, authToken: null};

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
