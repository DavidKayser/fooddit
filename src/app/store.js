import { configureStore } from "@reduxjs/toolkit";
import redditsReducer from "../features/reddits/redditsSlice";
import commentsReducer from "../features/comments/commentsSlice";

export default configureStore({
  reducer: {
    reddits: redditsReducer,
    comments: commentsReducer
  },
});
