import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const updateUser = createAsyncThunk(
  "user/update",
  async ({ token, userDetails }) => {
    try {
      const { data } = await axios.post(
        "/api/users/edit",
        { userData: userDetails },
        { headers: { authorization: token } }
      );
      toast.success("Profile updated Successfully");
      return data;
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong, please try again later.");
      return err.response.data.error[0];
    }
  }
);

export { updateUser };
