import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/usersSlice";
import authReducer from "./slices/authSlice";
import postsReducer from "./slices/postsSlice";

export default configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
    posts: postsReducer,
  },
});
