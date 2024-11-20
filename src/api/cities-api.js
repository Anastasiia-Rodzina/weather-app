import axios from "axios";
import { store } from "../redux/store";

const instance = axios.create({
  baseURL: "https://weather-back-yol1.onrender.com/",
});

instance.interceptors.request.use((config) => {
  const { auth } = store.getState(); // отримуємо токен з auth-стану
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});

export const setToken = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const getAllCities = async () => {
  const { data } = await instance.get("cities");
  return data;
};
export const addCity = async (body) => {
  const { data } = await instance.post("cities", body);
  return data;
};
export const deleteCity = async (id) => {
  const { data } = await instance.delete(`cities/${id}`);
  return data;
};

export default instance;
