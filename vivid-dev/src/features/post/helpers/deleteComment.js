import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const deleteComment = createAsyncThunk(
  "/post/deleteComment",
  async ({ postId, token, commentId }) => {
    try {
      const { data } = await axios.post(
        `/api/comments/delete/${postId}/${commentId}`,
        {},
        {
          headers: { authorization: token },
        }
      );
      toast.success("Comment deleted");
      return data.posts;
    } catch (err) {
      console.log(err.response.data.errors[0]);
      toast.error("Something went wrong");
      return err.response.data.errors[0];
    }
  }
);
export { deleteComment };
