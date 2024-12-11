import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const getAllBookmarks = createAsyncThunk(
  "/user/getBookmarks",
  async ({ token }) => {
    try {
      const { data } = await axios.get(`/api/users/bookmark`, {
        headers: { authorization: token },
      });
      return data.bookmarks;
    } catch (err) {
      console.log(err.response.data.errors[0]);
      toast.error("Something went wrong");
      return err.response.data.errors[0];
    }
  }
);

export { getAllBookmarks };
