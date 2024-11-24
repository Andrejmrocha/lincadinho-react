import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import feedbackService from "../services/feedbackService";

const initialState = {
  feedback: null,
  error: false,
  submitLoading: false,
  reviewLoading: false,
  success: false,
  message: null,
  suggestedText: "",
};

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    resetFeedbackState(state) {
      return initialState; // Reseta todo o estado
    },
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(reviewText.pending, (state) => {
        state.reviewLoading = true;
        state.error = null;
      })
      .addCase(reviewText.fulfilled, (state, action) => {
        state.reviewLoading = false;
        state.suggestedText = action.payload;
      })
      .addCase(reviewText.rejected, (state, action) => {
        state.reviewLoading = false;
        state.error = action.payload;
      })
      .addCase(submitFeedback.pending, (state) => {
        state.submitLoading = true;
        state.error = null;
      })
      .addCase(submitFeedback.fulfilled, (state, action) => {
        state.success = true;
        state.submitLoading = false;
        state.error = null;
        state.feedback = action.payload;
        state.message = "Feedback enviado com sucesso";
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.submitLoading = false;
        state.error = action.payload;
        state.feedback = null;
        state.message = "Erro ao enviar feedback";
      });
  },
});

export const submitFeedback = createAsyncThunk(
  "feedback/submitFeedback",
  async (feedbackData, thunkAPI) => {
    const response = await feedbackService.createFeedback(feedbackData);

    if (response.error) {
      return thunkAPI.rejectWithValue(response.error);
    }

    return response;
  }
);

export const reviewText = createAsyncThunk(
  "feedback/reviewText",
  async (textData, thunkAPI) => {
    const response = await feedbackService.reviewText(textData);
    if (response.error) {
      return thunkAPI.rejectWithValue(response.error);
    }
    return response;
  }
);

export const { resetMessage, resetFeedbackState } = feedbackSlice.actions;
export default feedbackSlice.reducer;
