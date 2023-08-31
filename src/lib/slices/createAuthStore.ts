import { api } from "@/utils/api";
import { API_URL_FROM_WEST } from "@/utils/config";
import axios from "axios";
import { StateCreator } from "zustand";

export interface AuthUserSlice {
  allowAccess: boolean | null;
  checkAuth: () => any;
  getUserDetails: () => any;
  userDetails: UserDetails | null;
  login: (data: Params) => any;
  register: (data: Params) => any;
}

export interface Params {
  email: string;
  password: string;
}

export interface UserDetails {
  username: string | null;
}

export const createAuthUserSlice: StateCreator<AuthUserSlice> = (set) => ({
  allowAccess: null,
  userDetails: null,
  checkAuth: async () => {
    const token = localStorage.getItem("access_token"); // Retrieve the token from your storage or context
    if (token) {
      const data = await api.auth.checkAuthentication(token);
      if (data) {
        console.log("checkAuthentication", data);
        set({ allowAccess: data });
      }
    } else {
      set({ allowAccess: false });
    }
  },
  getUserDetails: async () => {
    const token = localStorage.getItem("access_token"); // Retrieve the token from your storage or context
    if (token) {
      const data = await api.auth.getUserDetails(token);
      if (data) {
        const account = {
          username: data
        }
        set({ userDetails: account });
      }
    } else {
      set({ userDetails: null });
    }
  },
  login: async (requestBody: Params) => {
    try {
      const body = {
        ...requestBody,
        username: requestBody.email,
      };
      const response = await axios.post(
        API_URL_FROM_WEST + "/v1/auth/login",
        body,
        {
          headers: {
            // Set your custom headers here
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("access_token", response.data.access_token);
      // Handle the response here
    } catch (error) {
      console.error("API call error:", error);
    }
  },
  register: async (requestBody: Params) => {
      const body = {
        ...requestBody,
        username: requestBody.email,
      };
      // Make a POST request using Axios with headers and body
      const response = await axios.post(
        API_URL_FROM_WEST + "/v1/auth/register",
        body,
        {
          headers: {
            // Set your custom headers here
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "*",
          },
        }
      );   

      return response
  },
});
