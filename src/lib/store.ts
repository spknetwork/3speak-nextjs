// store.ts

import create from 'zustand'
import { CartSlice, createCartSlice } from './slices/createCartSlice'
import { createProductSlice, ProductSlice } from './slices/createProductSlice'
import { createStudioSlice, StudioSlice } from './slices/createStudioSlice'

type StoreState = ProductSlice & CartSlice & StudioSlice

export const useAppStore = create<StoreState>()((...a) => ({
    ...createProductSlice(...a),
    ...createCartSlice(...a),
    ...createStudioSlice(...a),
}))