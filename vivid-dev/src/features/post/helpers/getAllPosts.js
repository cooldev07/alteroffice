import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const getAllPosts = createAsyncThunk("post/getAllPosts", async () => {
  try {
    const { data } = await axios.get(`/api/posts`);
    return data.posts;
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong, please try again.");
    return err.response.data.errors[0];
  }
});

export { getAllPosts };
