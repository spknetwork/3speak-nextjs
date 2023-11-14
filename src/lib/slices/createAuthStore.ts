import { api } from "@/utils/api";
import { API_URL_FROM_WEST } from "@/utils/config";
import axios from "axios";
import { Params, UserDetails } from "types";
import { StateCreator } from "zustand";
import { useAppStore } from "../store";

export interface AuthUserSlice {
  allowAccess: boolean | null;
  checkAuth: () => any;
  setAccounts: (data?: any) => void;
  getUserDetails: () => any;
  userDetails: UserDetails | null;
  login: (data: Params) => any;
  register: (data: Params) => any;
  listAccounts: any;
}



export const createAuthUserSlice: StateCreator<AuthUserSlice> = (set) => ({
  listAccounts:[],
  allowAccess: null,
  userDetails: null,
  setAccounts:async (requestBody: Params) => {

    // for (let index = 0; index < 5; index++) {
    //   const account = {
    //     avatar: 'https://source.unsplash.com/random/200x200?sig=3',
    //     name: 'Juneroy1',
    //     type: 'Keychain'
    //   }
    //   const accounts = useAppStore.getState().listAccounts
    //   let toAppendAccounts = [...accounts, account]
    //   set({listAccounts: toAppendAccounts})
    // }
    // const accounts = useAppStore.getState().listAccounts
    const accounts = localStorage.getItem("accountsList")
    if (accounts) {
      let toAppendAccounts = JSON.parse(accounts)
      set({listAccounts: toAppendAccounts})
      console.log('im from setAccounts now',toAppendAccounts)
    }
  },
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
    let data = {
      avatar: 'https://source.unsplash.com/random/200x200?sig=3',
      username: requestBody.email,
      type: 'Email/Password',
      token: ''
    }

    let accounts
    const local = localStorage.getItem("accountsList")
    if (!local) {
        localStorage.setItem("accountsList", JSON.stringify([data]))
    }else{
      accounts = JSON.parse(local)
      const checkData = accounts.filter((item:any) => item.username == data.username )
      console.log('checkData',checkData)
      if (accounts.length < 6 && checkData.length == 0) {
        accounts.push(data)
        localStorage.setItem("accountsList", JSON.stringify(accounts))
      }
    }
    // useAppStore.getState().setAccounts(data)
    // try {
    //   const body = {
    //     ...requestBody,
    //     username: requestBody.email,
    //   };
    //   const response = await axios.post(
    //     API_URL_FROM_WEST + "/v1/auth/login",
    //     body,
    //     {
    //       headers: {
    //         // Set your custom headers here
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   localStorage.setItem("access_token", response.data.access_token);
    //   // Handle the response here
    // } catch (error) {
    //   console.error("API call error:", error);
    // }
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
