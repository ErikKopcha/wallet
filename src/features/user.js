import {createSlice} from '@reduxjs/toolkit';

const initialState = {name: '', email: '', password: ''}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    register: (state, action) => {
      state.value = action.payload;
    }
  }
})

export const {register} = userSlice.actions;
export default userSlice.reducer;