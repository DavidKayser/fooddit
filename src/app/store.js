import { configureStore } from "@reduxjs/toolkit";
import redditsReducer from "../features/reddits/redditsSlice";

export default configureStore({
  reducer: {
    reddits: redditsReducer,
  },
});


