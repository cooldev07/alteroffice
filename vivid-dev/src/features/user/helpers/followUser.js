import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const followUser = createAsyncThunk(
  "user/follow",
  async ({ idToFollow, token }) => {
    try {
      const { data } = await axios.post(
        `/api/users/follow/${idToFollow}`,
        {},
        { headers: { authorization: token } }
      );
      toast.success("Followed user!");
      return data;
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong, please try again later.");
      return err.response.data.error[0];
    }
  }
);

export { followUser };
