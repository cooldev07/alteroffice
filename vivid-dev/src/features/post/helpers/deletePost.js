import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const deletePost = createAsyncThunk(
  "post/deletePost",
  async ({ postId, token }) => {
    try {
      const { data } = await axios.delete(`/api/posts/${postId}`, {
        headers: { authorization: token },
      });
      toast.success("Post deleted successfully");
      return data.posts;
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong, please try again.");
      return err.response.data.errors[0];
    }
  }
);

export { deletePost };
