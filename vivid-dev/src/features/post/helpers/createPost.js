import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const createPost = createAsyncThunk(
  "post/createPost",
  async ({ postData, token }) => {
    try {
      const { data } = await axios.post(
        "/api/posts",
        { postData },
        { headers: { authorization: token } }
      );
      toast.success("Post created successfully");
      return data.posts;
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong, please try again.");
      return err.response.data.errors[0];
    }
  }
);

export { createPost };
