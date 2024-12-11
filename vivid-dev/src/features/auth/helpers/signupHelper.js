import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const signUpUser = createAsyncThunk("auth/signup", async (userData) => {
  try {
    const { status, data } = await axios.post("/api/auth/signup", userData);
    if (status === 201) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: data.encodedToken,
          userDetails: data.createdUser,
        })
      );
      toast.success("Sign Up successfull!");
      return data;
    }
  } catch (err) {
    console.log(err);
    toast.error(err.response.data.errors[0]);
    return err.response.data.errors[0];
  }
});

export { signUpUser };
