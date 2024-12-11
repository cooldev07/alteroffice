import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const signInUser = createAsyncThunk("auth/signin", async (userInput) => {
  try {
    const { status, data } = await axios.post("/api/auth/login", userInput);
    if (status === 200) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: data.encodedToken,
          userDetails: data.foundUser,
        })
      );
      toast.success(`Hey!, ${data.foundUser.firstName}`, { icon: "👋" });
      return data;
    }
  } catch (err) {
    toast.error(err.response.data.errors[0]);
    console.log(err);
    return err.response.data.error[0];
  }
});

export { signInUser };
