// store.ts

import create from 'zustand'
import { createStudioSlice, StudioSlice } from './slices/createStudioSlice'
import { createAuthUserSlice, AuthUserSlice } from './slices/createAuthStore'
import { createUserDetailsSlice, UserSlice } from './slices/createUserStore'

type StoreState = StudioSlice & AuthUserSlice & UserSlice

export const useAppStore = create<StoreState>()((...a) => ({
    ...createStudioSlice(...a),
    ...createAuthUserSlice(...a),
    ...createUserDetailsSlice(...a),
}))