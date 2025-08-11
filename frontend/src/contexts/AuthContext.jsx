import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import server from "../environment.js";

// Create context with proper default value
export const AuthContext = createContext({
  userData: null,
  setUserData: () => {},
  addToUserHistory: async () => {},
  getHistoryOfUser: async () => {},
  handleRegister: async () => {},
  handleLogin: async () => {}
});

const client = axios.create({
  baseURL: `${server}/api/v1/users`
});

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const router = useNavigate();

  const handleRegister = async (name, username, password) => {
    try {
      const request = await client.post("/register", {
        name,
        username,
        password
      });

      if (request.status === httpStatus.CREATED) {
        return request.data.message;
      }
    } catch (err) {
      throw err;
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const request = await client.post("/login", {
        username,
        password
      });

      if (request.status === httpStatus.OK) {
        localStorage.setItem("token", request.data.token);
        router("/home");
      }
    } catch (err) {
      throw err;
    }
  };

  const getHistoryOfUser = async () => {
    try {
      const request = await client.get("/get_all_activity", {
        params: {
          token: localStorage.getItem("token")
        }
      });
      return request.data;
    } catch (err) {
      throw err;
    }
  };

  const addToUserHistory = async (meetingCode) => {
    try {
      const request = await client.post("/add_to_activity", {
        token: localStorage.getItem("token"),
        meeting_code: meetingCode
      });
      return request;
    } catch (e) {
      throw e;
    }
  };

  const data = {
    userData,
    setUserData,
    addToUserHistory,
    getHistoryOfUser,
    handleRegister,
    handleLogin
  };

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  );
};

// Export a custom hook for convenience
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Default export for compatibility
export default AuthProvider;
