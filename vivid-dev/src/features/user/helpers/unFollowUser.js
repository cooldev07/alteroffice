import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const unFollowUser = createAsyncThunk(
  "user/unFollow",
  async ({ idToUnFollow, token }) => {
    try {
      const { data } = await axios.post(
        `/api/users/unfollow/${idToUnFollow}`,
        {},
        { headers: { authorization: token } }
      );
      toast.success("Unfollow sucessfull!");
      return data;
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong, please try again later.");
      return err.response.data.error[0];
    }
  }
);

export { unFollowUser };
