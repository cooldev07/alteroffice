import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const removeBookmark = createAsyncThunk(
  "/user/removeBookmark",
  async ({ token, postId }) => {
    try {
      const { data } = await axios.post(
        `/api/users/remove-bookmark/${postId}`,
        {},
        {
          headers: { authorization: token },
        }
      );
      toast.success("Removed from bookmarks");
      return data.bookmarks;
    } catch (err) {
      console.log(err.response.data.errors[0]);
      toast.error("Something went wrong");
      return err.response.data.errors[0];
    }
  }
);
export { removeBookmark };
