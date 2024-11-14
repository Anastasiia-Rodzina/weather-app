import axios from "axios";

const authInstance = axios.create({
  baseURL: "http://localhost:4000",
});

// authInstance.interceptors.request.use((config) => {
//   const { auth } = store.getState(); // отримуємо токен з auth-стану
//   if (auth.token) {
//     config.headers.Authorization = `Bearer ${auth.token}`;
//   }
//   return config;
// });

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
export const updateUser = async (formData) => {
  const { data } = await authInstance.put("/auth/update", formData);
  return data;
};
export default authInstance;
