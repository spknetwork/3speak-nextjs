import { HIVE_HOST_API } from "@/utils/config";
import axios from "axios";
import { StateCreator } from "zustand";

export interface UserSlice {
    getUserHiveDetails: (name:any) => any;
    setUserHiveDetails: (name:Name) => any;
    userhiveDetails: UserHiveDetails | null;
    userName:Name|null;
}

export interface Name {
  name: string;
}

export interface UserHiveDetails {
    website: string ;
    location: string ;
    about: string ;
    name: string ;
    cover_image: string;
    profile_image: string;
  }


export const createUserDetailsSlice: StateCreator<UserSlice> = (set) => ({
    userhiveDetails: null,
    userName: null,
    setUserHiveDetails: async (name:Name) => {
        set({userName:name});
    },
    getUserHiveDetails: async (name:any) => {
        console.log('condenser_api.get_accounts')
      const body = {
        id: 6,
        jsonrpc: "2.0",
        method: "condenser_api.get_accounts",
        params: [
            [`${name}`]
        ]
      };
      // Make a POST request using Axios with headers and body
      const response = await axios.post(
        HIVE_HOST_API ,
        body,
        {
          headers: {
            // Set your custom headers here
            "Content-Type": "application/json",
            "Accept": "application/json",
            // "Access-Control-Allow-Origin": "*",
          },
        }
      ); 
      console.log("response.data.result juneroy",response.data.result)
      if (response && response.data && response.data.result && response.data.result[0].posting_json_metadata != "") {
        const profile = JSON.parse(response.data.result[0].posting_json_metadata  ) 
        set({ userhiveDetails: profile.profile });
        console.log('response from hive',response.data.result[0].posting_json_metadata)
        console.log('response from hive parse',JSON.parse(response.data.result[0].posting_json_metadata))
      }
     
      return response
  },
});
