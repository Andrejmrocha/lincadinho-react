import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import organizationReducer from "./slices/organizationSlice";
import userReducer from "./slices/userSlice";
import feedbackReducer from "./slices/feedbackSlice";
import friendshipReducer from "./slices/friendshipSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    organization: organizationReducer,
    user: userReducer,
    feedback: feedbackReducer,
    friendship: friendshipReducer,
  },
});
