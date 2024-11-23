import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import organizationService from "../services/organizationService";

const initialState = {
  organization: null,
  error: false,
  success: false,
  loading: false,
};

export const createOrganization = createAsyncThunk(
  "organization/submitOrganization",
  async (organizationData, thunkAPI) => {
    const response = await organizationService.createOrganization(
      organizationData
    );

    if (response.error) {
      return thunkAPI.rejectWithValue(response.error);
    }

    return response;
  }
);

export const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrganization.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createOrganization.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.organization = action.payload;
      })
      .addCase(createOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.organization = null;
      });
  },
});

export const { reset } = organizationSlice.actions;
export default organizationSlice.reducer;
