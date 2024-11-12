import axios from "axios";

const authInstance = axios.create({
  baseURL: "http://localhost:5000",
});

export const setToken = (token) => {
  authInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearToken = () => {
  authInstance.defaults.headers.common.Authorization = "";
};

export const register = async (body) => {
  const { data } = await authInstance.post("/auth/register", body);
  setToken(data.accessToken);
  return data;
};

export const login = async (body) => {
  const { data } = await authInstance.post("/auth/login", body);
  setToken(data.accessToken);
  return data;
};

export const logout = async () => {
  const { data } = await authInstance.post("/auth/logout");
  clearToken();
  return data;
};

export const getCurrent = async (token) => {
  setToken(token);
  try {
    const { data } = await authInstance.get("/auth/current");
    return data;
  } catch (error) {
    setToken();
    throw error;
  }
};
export default authInstance;
