import { createSlice } from "@reduxjs/toolkit";
export const TASK_VIEW = "task_view";
export const CATEGORY_VIEW = "category_view";
const appSlice = createSlice({
  name: "app",
  initialState: {
    currentListView: TASK_VIEW,
  },
  reducers: {
    changeCurrentListView(state, action) {
      state.currentListView = action.payload;
    },
  },
});
export const { changeCurrentListView } = appSlice.actions;
export default appSlice.reducer;
