import { createSlice } from "@reduxjs/toolkit";
import { signInUser, signUpUser } from "./helpers";

const initialState = {
  token: JSON.parse(localStorage.getItem("user"))?.token || "",
  userDetails: JSON.parse(localStorage.getItem("user"))?.userDetails || {},
  loading: false,
  error: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.token = "";
      state.userDetails = {};
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(signInUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.token = payload.encodedToken;
      state.userDetails = payload.foundUser;
    });
    builder.addCase(signInUser.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(signUpUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(signUpUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.token = payload.encodedToken;
      state.userDetails = payload.createdUser;
    });
    builder.addCase(signUpUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase("user/update/fulfilled", (state, { payload }) => {
      state.userDetails.profileUrl = payload.user.profileUrl;
    });
  },
});

export default authSlice.reducer;
export const { signOut } = authSlice.actions;
