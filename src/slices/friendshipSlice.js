import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import friendshipService from "../services/friendshipService";

const initialState = {
  requests: [],
  friendships: [],
  error: null,
  loading: false,
};

export const fetchFriendshipRequests = createAsyncThunk(
  "friendship/fetchFriendshipRequests",
  async (id, thunkAPI) => {
    const response = await friendshipService.fetchFriendshipRequests(id);
    if (response.error) {
      return thunkAPI.rejectWithValue(response.error);
    }
    return response.data;
  }
);

export const sendFriendshipRequest = createAsyncThunk(
  "friendship/sendFriendshipRequest",
  async ({ userId, friendId }, thunkAPI) => {
    console.log("user id: ", userId);
    console.log("friend id: ", friendId);
    const response = await friendshipService.sendFriendshipRequest(
      userId,
      friendId
    );
    if (response.error) {
      return thunkAPI.rejectWithValue(response.error);
    }

    return response.data;
  }
);

export const acceptFriendshipRequest = createAsyncThunk(
  "friendship/acceptFriendshipRequest",
  async (id, thunkAPI) => {
    const response = await friendshipService.handleFriendshipRequest(
      id,
      "aceitar"
    );
    if (response.error) {
      return thunkAPI.rejectWithValue(response.error);
    }
    return response.data;
  }
);

export const refuseFriendshipRequest = createAsyncThunk(
  "friendship/refuseFriendshipRequest",
  async (id, thunkAPI) => {
    const response = await friendshipService.handleFriendshipRequest(
      id,
      "recusar"
    );
    if (response.error) {
      return thunkAPI.rejectWithValue(response.error);
    }
    return response.data;
  }
);

export const fetchSuggestedFriendship = createAsyncThunk(
  "friendship/fetchSuggestedFriendship",
  async (_, thunkAPI) => {
    const response = await friendshipService.suggestedFriendship();
    console.log("slice", response);
    if (response.error) {
      return thunkAPI.rejectWithValue(response.error);
    }

    return response.data;
  }
);

export const friendshipSlice = createSlice({
  name: "friendship",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriendshipRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFriendshipRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload.content;
      })
      .addCase(fetchFriendshipRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSuggestedFriendship.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuggestedFriendship.fulfilled, (state, action) => {
        state.loading = false;
        state.friendships = action.payload.content;
        console.log("fulfiled: ", action.payload.content);
      })
      .addCase(fetchSuggestedFriendship.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendFriendshipRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendFriendshipRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests.push(action.payload);
      })
      .addCase(sendFriendshipRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(acceptFriendshipRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(acceptFriendshipRequest.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(acceptFriendshipRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(refuseFriendshipRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(refuseFriendshipRequest.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(refuseFriendshipRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default friendshipSlice.reducer;
