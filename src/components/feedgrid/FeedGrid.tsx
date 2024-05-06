import React from "react";
import { VideoInterface } from "types";
import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { MdOutlineThumbUp } from "react-icons/md";
import { BiDollar } from "react-icons/bi";

import VideosTitle from "@/components/VideosTitle";
import Name from "@/components/user/Name";

import moment from "moment";
import FeedGridItem from "./FeedGridItem";

export interface Video {
    permlink: string;
    spkvideo: {
        duration: number;
        play_url: string;
        thumbnail_url: string;
    };
    author: {
        username: string;
    };
    body: string;
    title: string;
    stats: {
        num_comments: number;
        num_votes: number;
        total_hive_reward: number;
    };
    tags: string[];
    lang: string;
    hive_rewards: number;
    created_at: string;
    community: string;
}

interface FeedGridProps {
 videos: Video[];
}

const FeedGrid = ({ videos }: FeedGridProps) => {
  return (
    <Grid
      padding={"20px"}
      templateColumns={{
        base: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(2, 1fr)",
        xl: "repeat(5, 1fr)",
      }}
      gap={10}
    >
      {videos.map((video: Video, index: number) => (
        <FeedGridItem video={video} key={index} />
      ))}
    </Grid>
  );
};

export default FeedGrid;
