// src/api/AuthService.js
import apiHelper from "../utils/apiHelper";

const AuthService = {
  login: async (credentials) => {
    try {
      const response = await apiHelper.post("/api/auth/login", credentials, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await apiHelper.post("/api/auth/register", userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await apiHelper.post("/api/auth/logout");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default AuthService;
