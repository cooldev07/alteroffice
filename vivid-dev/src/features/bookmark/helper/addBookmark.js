import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

const addBookmark = createAsyncThunk(
  "/user/addBookmark",
  async ({ token, postId }) => {
    try {
      const { data } = await axios.post(
        `/api/users/bookmark/${postId}`,
        {},
        {
          headers: { authorization: token },
        }
      );
      toast.success("Bookmark added.");
      return data.bookmarks;
    } catch (err) {
      console.log(err.response.data.errors[0]);
      toast.error("Something went wrong");
      return err.response.data.errors[0];
    }
  }
);
export { addBookmark };
