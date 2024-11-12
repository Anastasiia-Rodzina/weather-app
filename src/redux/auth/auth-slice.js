import { login, register, current, logout } from "./auth-operations";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: "",
  isLogin: false,
  isLoading: false,
  error: null,
};
const pending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const rejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, pending)
      .addCase(register.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.accessToken;
        state.isLogin = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(register.rejected, rejected)
      .addCase(login.pending, pending)
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.accessToken;
        state.isLogin = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(login.rejected, rejected)
      .addCase(current.pending, pending)
      .addCase(current.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLogin = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(current.rejected, (state) => {
        state.isLoading = false;
        state.token = "";
      })
      .addCase(logout.pending, pending)
      .addCase(logout.fulfilled, (state) => {
        state.user = {};
        state.token = "";
        state.isLogin = false;
        state.isLoading = false;
      })
      .addCase(logout.rejected, rejected);
  },
});

export default authSlice.reducer;
