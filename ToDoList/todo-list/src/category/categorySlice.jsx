import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CategoryService from "../services/categoryService";

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (category) => {
    let service = new CategoryService();
    const response = await service.addCategory(
      category.title,
      category.description
    );
    return await service.getById(response.data);
  }
);
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    let service = new CategoryService();
    const response = await service.getAll();
    return response;
  }
);
export const removeCategory = createAsyncThunk(
  "categories/removeCategory",
  async (id) => {
    let service = new CategoryService();
    const response = await service.remove(id);
    return response;
  }
);
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (category) => {
    let service = new CategoryService();
    const response = await service.update(category);
    return response;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
  },
  reducers: {
    removeCategory(state, action) {
      state.categories = state.categories.filter(
        (item) => item.id !== action.payload
      );
    },
  },
  extraReducers: {
    [addCategory.fulfilled]: (state, action) => {
      state.categories.push(action.payload);
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export default categorySlice.reducer;
