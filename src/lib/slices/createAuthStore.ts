import { api } from "@/utils/api";
import { API_URL_FROM_WEST } from "@/utils/config";
import axios from "axios";
import { HiveLoginInterface, Params, UserDetails } from "types";
import { StateCreator } from "zustand";
import { useAppStore } from "../store";

export interface AuthUserSlice {
  allowAccess: boolean | null;
  checkAuth: () => any;
  setAccounts: (data?: any) => void;
  getUserDetails: () => any;
  login_with_hive: (request:HiveLoginInterface) => any;
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
  login_with_hive: async (request: HiveLoginInterface) => {
    try {
      // Gives @stoodkev active authority with weight 2 to `account`
      const keychain = window.hive_keychain;
      console.log("keychain", keychain);
      const proof_payload = {
        account: request.username,
        ts: request.dateNow,
      }
      keychain.requestSignBuffer(
        request.username,
        JSON.stringify(proof_payload),
        "Posting",
        request.callback,
        null,
        "Login using Hive",
        (response: any) => {
          console.log("response", response);
        }
      );
    } catch (error) {
      console.log({ error });
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
            "Content-Type": "application/json",
          },
        }
      );   

      return response
  },
});
