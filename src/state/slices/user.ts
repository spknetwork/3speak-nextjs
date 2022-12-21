import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user: any;
}

const initialState: UserState = {
  user: undefined
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
  }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer