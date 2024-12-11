import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  editPost,
  deletePost,
  getAllPosts,
  addLike,
  removeLike,
  addComment,
  editComment,
  deleteComment,
} from "./helpers";

const initialState = {
  loading: false,
  showPostModal: false,
  posts: [],
  editingPost: {},
  error: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    openPostModal: (state) => {
      state.showPostModal = true;
    },
    closePostModal: (state) => {
      state.showPostModal = false;
    },
    setEditingPost: (state, { payload }) => {
      state.editingPost = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getAllPosts.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.posts = payload;
    });
    builder.addCase(getAllPosts.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(createPost.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(createPost.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.posts = payload;
    });
    builder.addCase(createPost.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(editPost.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(editPost.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.posts = payload;
    });
    builder.addCase(editPost.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(deletePost.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(deletePost.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.posts = payload;
    });
    builder.addCase(deletePost.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(addLike.fulfilled, (state, { payload }) => {
      state.posts = payload;
    });
    builder.addCase(addLike.rejected, (state) => {
      state.error = true;
    });
    builder.addCase(removeLike.fulfilled, (state, { payload }) => {
      state.posts = payload;
    });
    builder.addCase(removeLike.rejected, (state) => {
      state.error = true;
    });
    builder.addCase(addComment.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(addComment.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.posts = payload;
    });
    builder.addCase(addComment.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(editComment.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(editComment.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.posts = payload;
    });
    builder.addCase(editComment.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(deleteComment.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(deleteComment.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.posts = payload;
    });
    builder.addCase(deleteComment.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default postSlice.reducer;

export const { closePostModal, openPostModal, setEditingPost } =
  postSlice.actions;
