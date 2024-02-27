import { StateCreator } from "zustand";
export interface VideoSlice {
    video: any;
    setVideo: (video:any) =>void;
}
export const createVideoSlice: StateCreator<VideoSlice> = (set) => ({
    video: null,
    setVideo: async (video:any) => {
        set({ video: video })
    },
})