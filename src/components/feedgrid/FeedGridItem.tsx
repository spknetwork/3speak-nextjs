//TODO: integrate dark mode here
import React from "react";
import { Box, GridItem, Image, Text } from "@chakra-ui/react";
import { MdOutlineThumbUp } from "react-icons/md";
import { BiDollar } from "react-icons/bi";

import VideosTitle from "@/components/VideosTitle";
import Name from "@/components/user/Name";

import moment from "moment";

// https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript/34841026#34841026
var toHHMMSS = (secs: number) => {
  var sec_num = parseInt(secs.toFixed(1), 10)
  var hours   = Math.floor(sec_num / 3600)
  var minutes = Math.floor(sec_num / 60) % 60
  var seconds = sec_num % 60

  return [hours,minutes,seconds]
      .map(v => v < 10 ? "0" + v : v)
      .filter((v,i) => v !== "00" || i > 0)
      .join(":")
}

const FeedGridItem = ({video}: any) => {
  if (!video) {
    return <div>Loading...</div> // TODO make pretty
  }
  return (
    <GridItem w="100%" h="100%">
      <Box cursor={"pointer"} position="relative">
        <Box
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          position={"absolute"}
          bottom="5px"
          color={"#000"}
          left="5px"
          fontSize="11px"
          fontWeight={"500"}
          background={"none 0px 0px repeat scroll rgb(232, 232, 232)"}
          borderRadius="2px"
          paddingLeft={"4px"}
          paddingRight={"4px"}
        >
          <MdOutlineThumbUp size="15px" color="grey" />
          <Text as="span" fontSize="11px" fontWeight={"bold"}>
            {`${video.stats.num_votes}`}
          </Text>
        </Box>

        <Box
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          position={"absolute"}
          bottom="5px"
          left="52px"
          color={"#000"}
          fontSize="11px"
          fontWeight={"500"}
          background={"none 0px 0px repeat scroll rgb(232, 232, 232)"}
          borderRadius="2px"
          paddingLeft={"4px"}
          paddingRight={"4px"}
        >
          <BiDollar size="12px" color="black" />
          <Text
            as="span"
            marginLeft={"2px"}
            fontSize="11px"
            fontWeight={"bold"}
          >
            {video.stats.total_hive_reward}
          </Text>
        </Box>
        <Box
          position={"absolute"}
          bottom="5px"
          color={"#000"}
          fontSize="11px"
          fontWeight={"bold"}
          right="5px"
          background={"none 0px 0px repeat scroll rgb(232, 232, 232)"}
          borderRadius="2px"
          padding={"0px 6px"}
        >
          {toHHMMSS(video.spkvideo.duration)}
        </Box>
        <Box height="13em !important" width="100% !important">
          <Image
            height="13em !important"
            width="100% !important"
            borderRadius={"10px"}
            objectFit="cover"
            alt="test"
            src={`https://images.hive.blog/320x0/${video.spkvideo.thumbnail_url}`}
          />
        </Box>
      </Box>
      <VideosTitle title={`${video.title}`} author={`${video.author.username}`} permlink={`${video.permlink}`} />
      <Name username={`${video.author.username}`} />
      <Text as="p" margin={"1px"}>
        {moment(video.created_at).fromNow()}
      </Text>
    </GridItem>
  );
};

export default FeedGridItem;
