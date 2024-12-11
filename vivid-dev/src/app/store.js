import { configureStore } from "@reduxjs/toolkit";

import {
  authReducer,
  userReducer,
  postReducer,
  bookmarkReducer,
} from "../features";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    post: postReducer,
    bookmark: bookmarkReducer,
  },
});
