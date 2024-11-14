import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/auth-api";

export const register = createAsyncThunk(
  "auth/register",
  async (body, { rejectWithValue }) => {
    try {
      const response = await api.register(body);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (body, { rejectWithValue }) => {
    try {
      const response = await api.login(body);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const current = createAsyncThunk(
  "auth/current",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await api.getCurrent(auth.token);
      return response;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  },
  {
    condition: (_, { getState }) => {
      const { auth } = getState();
      if (!auth.token) {
        return false;
      }
    },
  }
);

export const updateUser = createAsyncThunk(
  "auth/update",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await api.updateUser(userData.formData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.logout();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
