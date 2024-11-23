import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const initialState = {
  user: null,
  auth: false,
  error: null,
  success: false,
  loading: false,
  isCheckingToken: true,
};

export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",
  async (_, { rejectWithValue }) => {
    try {
      const tokenStatus = await authService.verifyToken();
      if (!tokenStatus.valid) {
        throw new Error("Token inválido");
      }
      return tokenStatus;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    const response = await authService.register(user);
    if (response.error) return thunkAPI.rejectWithValue(response.error);
    return response;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    const response = await authService.login(userData);
    console.log(response.error);
    if (response.error) return thunkAPI.rejectWithValue(response.error);
    return response;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.auth = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.auth = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        Object.assign(state, initialState);
      })
      .addCase(initializeAuth.pending, (state) => {
        state.isCheckingToken = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isCheckingToken = false;
        state.loading = false;
        state.auth = true;
        state.user = action.payload;
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.isCheckingToken = false;
        state.loading = false;
        state.auth = false;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
