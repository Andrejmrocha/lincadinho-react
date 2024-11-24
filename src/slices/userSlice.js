import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";

const initialState = {
  user: {},
  users: [],
  error: false,
  success: false,
  loading: false,
  message: null,
};

export const profile = createAsyncThunk("user/profile", async (_, thunkAPI) => {
  const token = localStorage.getItem("token");
  const userId = thunkAPI.getState().auth.user.id;
  const data = await userService.profile({ id: userId }, token);
  if (data.error) return thunkAPI.rejectWithValue(data.error);
  return data;
});

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (searchTerm = "", thunkAPI) => {
    const userId = thunkAPI.getState().auth.user?.id;
    const data = await userService.getUsers(searchTerm);
    if (data.error) return thunkAPI.rejectWithValue(data.error);
    const filteredData = data.content.filter((user) => user.id !== userId);
    return filteredData;
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (formData, thunkAPI) => {
    const token = localStorage.getItem("token");
    const data = await userService.updateProfile(formData, token);
    if (data.error) return thunkAPI.rejectWithValue(data.error);
    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(profile.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;
