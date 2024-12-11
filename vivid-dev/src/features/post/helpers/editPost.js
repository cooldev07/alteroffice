import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const editPost = createAsyncThunk(
  "post/editPost",
  async ({ postData, token, postId }) => {
    try {
      const { data } = await axios.post(
        `/api/posts/edit/${postId}`,
        { postData },
        { headers: { authorization: token } }
      );
      toast.success("Post updated successfully");
      return data.posts;
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong, please try again.");
      return err.response.data.errors[0];
    }
  }
);

export { editPost };
