import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    getCategories: (state, action) => {
      state = action.payload;
    }
  }
})

export const { getCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;