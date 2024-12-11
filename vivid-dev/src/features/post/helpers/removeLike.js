import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeLike = createAsyncThunk(
  "post/removeLike",
  async ({ postId, token }) => {
    try {
      const { data } = await axios.post(
        `/api/posts/dislike/${postId}`,
        {},
        { headers: { authorization: token } }
      );
      return data.posts;
    } catch (err) {
      console.log(err.response.data.errors[0]);
      return err.response.data.errors[0];
    }
  }
);

export { removeLike };
