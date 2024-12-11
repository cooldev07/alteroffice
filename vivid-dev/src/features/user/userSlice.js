import { createSlice } from "@reduxjs/toolkit";
import { getUsers, followUser, unFollowUser, updateUser } from "./helpers";

const initialState = {
  loading: false,
  uploadingImg: false,
  error: "",
  users: [],
  theme: localStorage.getItem("theme") || "dark",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    uploadImg: (state) => {
      state.uploadingImg = true;
    },
    toggleTheme: (state) => {
      if (state.theme === "dark") {
        state.theme = "light";
        localStorage.setItem("theme", "light");
      } else {
        state.theme = "dark";
        localStorage.setItem("theme", "dark");
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.users = payload.users;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(followUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(followUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.users = state.users.map((user) => {
        if (user.username === payload.user.username) {
          return payload.user;
        }
        if (user.username === payload.followUser.username) {
          return payload.followUser;
        }
        return user;
      });
    });
    builder.addCase(followUser.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(unFollowUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(unFollowUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.users = state.users.map((user) => {
        if (user.username === payload.user.username) {
          return payload.user;
        }
        if (user.username === payload.followUser.username) {
          return payload.followUser;
        }
        return user;
      });
    });
    builder.addCase(unFollowUser.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.uploadingImg = true;
      state.loading = true;
      state.error = false;
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.uploadingImg = false;
      state.loading = false;
      state.users = state.users.map((user) =>
        user.username === payload.user.username ? payload.user : user
      );
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.uploadingImg = false;
      state.loading = false;
      state.error = true;
    });
  },
});

export default userSlice.reducer;
export const { uploadImg, toggleTheme } = userSlice.actions;
