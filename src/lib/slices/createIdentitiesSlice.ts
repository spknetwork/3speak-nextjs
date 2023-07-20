import { StateCreator } from "zustand";


export interface Account{
    id: number;
    name: String;
    status: String;
}

export interface Accounts {
    accounts: Account[];
}


export interface AccountSlice {
    account: Account[];
    accounts: Accounts[];
    switch: () => void;
    disconnect: () => void;
}


export const createPostSlice: StateCreator<AccountSlice> = (set) => ({
    account: [],
    accounts: [],
    switch: async () => {
        const res = await fetch('url to switch account here')
        set({ account: await res.json() })
    },
    disconnect: async () => {
        const res = await fetch('url to disconnect account here')
        set({ accounts: await res.json() })
    },
})