import { createSlice } from "@reduxjs/toolkit";
import { addBookmark, removeBookmark, getAllBookmarks } from "./helper";

const initialState = {
  loading: false,
  bookmarks: [],
  error: false,
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllBookmarks.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getAllBookmarks.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.bookmarks = payload;
    });
    builder.addCase(getAllBookmarks.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(removeBookmark.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(removeBookmark.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.bookmarks = payload;
    });
    builder.addCase(removeBookmark.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(addBookmark.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(addBookmark.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.bookmarks = payload;
    });
    builder.addCase(addBookmark.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default bookmarkSlice.reducer;
