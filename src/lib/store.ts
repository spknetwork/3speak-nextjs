// store.ts

import create from 'zustand'
import { createStudioSlice, StudioSlice } from './slices/createStudioSlice'
import { createAuthUserSlice, AuthUserSlice } from './slices/createAuthStore'

type StoreState = StudioSlice & AuthUserSlice

export const useAppStore = create<StoreState>()((...a) => ({
    ...createStudioSlice(...a),
    ...createAuthUserSlice(...a),
}))