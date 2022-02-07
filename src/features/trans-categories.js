import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    saveCategories: (state, action) => {
      state.push(...action.payload)
    }
  }
})

export const { saveCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
