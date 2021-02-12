import { createSlice } from "@reduxjs/toolkit";
const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [
      {
        id: 1,
        title: "Новая задача",
        description: "Описание может быть длинным",
      },
      {
        id: 2,
        title: "Новая задача",
        description: "Описание может быть длинным",
      },
      {
        id: 3,
        title: "Новая задача",
        description: "Описание может быть длинным",
      },
      {
        id: 5,
        title: "Новая задача",
        description: "Описание может быть длинным",
      },
    ],
  },
  reducers: {
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    removeTask(state, action) {
      state.tasks = state.tasks.filter((item) => item.id !== action.payload);
    },
  },
});
export const { addTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
