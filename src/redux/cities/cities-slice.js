import { createSlice } from "@reduxjs/toolkit";
import {
  addCityThunk,
  deleteCityThunk,
  getCitiesThunk,
} from "./cities-operations";

const initialState = {
  cities: [],
  selectedCity: {},
  error: null,
  isLoading: false,
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setCities: (state, action) => {
      state.selectedCity = action.payload;
      state.cities = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCitiesThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(addCityThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(deleteCityThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getCitiesThunk.fulfilled, (state, action) => {
        state.error = null;
        state.cities = [...action.payload];
        state.isLoading = false;
      })
      .addCase(addCityThunk.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.cities.push(action.payload);
      })
      .addCase(deleteCityThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const idx = state.cities.findIndex((el) => el._id === action.payload);
        state.cities.splice(idx, 1);
        if (state.selectedCity._id === action.payload) {
          state.selectedCity = {};
        }
      })
      .addCase(getCitiesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addCityThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteCityThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setCities } = serviceSlice.actions;
const serviceReducer = serviceSlice.reducer;
export default serviceReducer;
