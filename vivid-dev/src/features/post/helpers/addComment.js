import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const addComment = createAsyncThunk(
  "/post/addComment",
  async ({ postId, token, commentData }) => {
    try {
      const { data } = await axios.post(
        `/api/comments/add/${postId}`,
        { commentData },
        {
          headers: { authorization: token },
        }
      );
      toast.success("Comment added");
      return data.posts;
    } catch (err) {
      console.log(err.response.data.errors[0]);
      toast.error("Something went wrong");
      return err.response.data.errors[0];
    }
  }
);

export { addComment };
