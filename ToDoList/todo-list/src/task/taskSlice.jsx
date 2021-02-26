import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TaskService from "../services/taskService";

export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
  let service = new TaskService();
  const response = await service.addTask(
    task.title,
    task.description,
    task.category
  );
  return await service.getById(response.data);
});
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  let service = new TaskService();
  const response = await service.getAll();
  return response;
});
export const removeTask = createAsyncThunk("tasks/removeTask", async (id) => {
  let service = new TaskService();
  const response = await service.remove(id);
  return response;
});
export const updateTask = createAsyncThunk("tasks/updateTask", async (task) => {
  let service = new TaskService();
  const response = await service.update(task);
  return response;
});

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
  },
  reducers: {
    editTask(state, action) {
      state.tasks = state.tasks.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: {
    [addTask.fulfilled]: (state, action) => {
      state.tasks.push(action.payload);
    },
    [fetchTasks.fulfilled]: (state, action) => {
      state.tasks = action.payload;
    },
  },
});
export const { editTask } = taskSlice.actions;
export default taskSlice.reducer;
