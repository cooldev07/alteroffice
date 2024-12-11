import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const editComment = createAsyncThunk(
  "/post/editComment",
  async ({ postId, token, commentData }) => {
    try {
      const { data } = await axios.post(
        `/api/comments/edit/${postId}/${commentData._id}`,
        { commentData },
        {
          headers: { authorization: token },
        }
      );
      toast.success("Comment updated");
      return data.posts;
    } catch (err) {
      console.log(err.response.data.errors[0]);
      toast.error("Something went wrong");
      return err.response.data.errors[0];
    }
  }
);
export { editComment };
