import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addLike = createAsyncThunk("post/addLike", async ({ postId, token }) => {
  try {
    const { data } = await axios.post(
      `/api/posts/like/${postId}`,
      {},
      { headers: { authorization: token } }
    );
    return data.posts;
  } catch (err) {
    console.log(err.response.data.errors[0]);
    return err.response.data.errors[0];
  }
});

export { addLike };
