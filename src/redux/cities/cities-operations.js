import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCities, addCity, deleteCity } from "../../api/cities-api.js";

export const getCitiesThunk = createAsyncThunk(
  "cities/getCity",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllCities();
      return response;
    } catch (error) {
      console.log(error);
      error("Error get ", error);

      return rejectWithValue(error.message);
    }
  }
);

export const addCityThunk = createAsyncThunk(
  "cities/addCity",
  async (body, { rejectWithValue }) => {
    try {
      const response = await addCity(body);
      return response;
    } catch (error) {
      console.log(error);
      error("Error add", error);

      return rejectWithValue(error.message);
    }
  }
);

export const deleteCityThunk = createAsyncThunk(
  "cities/deleteCity",
  async (id, { rejectWithValue }) => {
    try {
      await deleteCity(id);
      return id;
    } catch (error) {
      error(error.response.data.message);

      return rejectWithValue(error.message);
    }
  }
);
