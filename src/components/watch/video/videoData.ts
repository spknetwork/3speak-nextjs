// videoData.ts

export interface Video {
    videoSrc: string;
    title: string;
    number_views: number;
    dollars: number;
    bgColor: string;
    colorMode: string;
   }
   
   export const videoData: Video[] = [
    {
       videoSrc: "/path/to/video1.jpg",
       title: "Video Title 1",
       number_views: 1000,
       dollars: 10.0,
       bgColor: "gray.100",
       colorMode: "light",
    },
    {
       videoSrc: "/path/to/video2.jpg",
       title: "Video Title 2",
       number_views: 2000,
       dollars: 20.0,
       bgColor: "gray.200",
       colorMode: "dark",
    },
    // Add more video objects as needed
   ];
   