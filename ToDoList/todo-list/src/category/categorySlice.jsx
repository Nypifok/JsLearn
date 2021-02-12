import { createSlice } from "@reduxjs/toolkit";
const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [
      {
        id: 1,
        title: "Новая категория",
        description: "Описание может быть длинным",
      },
      {
        id: 2,
        title: "Новая категория",
        description: "Описание может быть длинным",
      },
      {
        id: 3,
        title: "Новая категория",
        description: "Описание может быть длинным",
      },
    ],
  },
  reducers: {
    addCategory(state, action) {
      state.categories.push(action.payload);
    },
    removeCategory(state, action) {
      state.categories = state.categories.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});
export const { addCategory, removeCategory } = categorySlice.actions;
export default categorySlice.reducer;
