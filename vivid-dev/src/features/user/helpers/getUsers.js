import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getUsers = createAsyncThunk("user/getUsers", async (usrInput) => {
  try {
    const { data } = await axios.get("/api/users");
    return data;
  } catch (err) {
    console.log(err);
    return err.response.data.error[0];
  }
});

export { getUsers };
