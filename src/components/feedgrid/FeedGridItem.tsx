import React from "react";
import { Box, GridItem, Image, Link, Text, Flex } from "@chakra-ui/react";
import { MdOutlineThumbUp } from "react-icons/md";
import { BiDollar } from "react-icons/bi";
import VideosTitle from "@/components/VideosTitle";
import Name from "@/components/user/Name";
import { Video } from "./Video";
import { VideoInterface } from "types";
import moment from "moment";
import { InfinitySpin } from "react-loader-spinner";
import { useColorMode } from "@chakra-ui/react";
import { BsDot } from "react-icons/bs";

// https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript/34841026#34841026
var toHHMMSS = (secs: number) => {
  var sec_num = parseInt(secs.toFixed(1), 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor(sec_num / 60) % 60;
  var seconds = sec_num % 60;

  return [hours, minutes, seconds]
    .map((v) => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
};

type Props = {
  video: VideoInterface;
  key: number;
};

//making a function for redirecting to the watch page once clicked on video thumbnail
const redirect = (permlink: string, username: string) => {
  window.location.href = `/watch?v=${username}/${permlink}`;
};

const FeedGridItem = ({ video }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  if (!video) {
    return (
      <Box justifyContent={"center"} alignItems={"center"} h="70vh" w={452}>
        <InfinitySpin width="200" color="#6DC5D7" />
      </Box>
    );
  }

  return (
    <GridItem
      w="100%"
      h="100%"
      p={1}
      m={1}
      backgroundColor={colorMode === "dark" ? "gray.900" : "white"}
      borderRadius={"10px"}
    >
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
            {video?.stats?.num_votes}
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
            {video?.stats?.total_hive_reward
              ? video.stats.total_hive_reward.toFixed(3)
              : "0.000"}
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
          {/* if(!spkvideo){
            return null
        } */}
          {toHHMMSS(video?.spkvideo?.duration ?? 0)}
        </Box>
        <Box height="13em !important" width="100% !important">
          <Image
            height="13em !important"
            width="100% !important"
            borderRadius={"10px"}
            objectFit="cover"
            alt="test"
            src={`https://images.hive.blog/320x0/${
              video.spkvideo?.thumbnail_url ?? ""
            }`}
            onClick={() => {
              redirect(video.permlink, video?.author?.username ?? "");
            }}
          />
        </Box>
      </Box>
      <VideosTitle
        title={`${video.title}`}
        author={video.author}
        permlink={`${video.permlink}`}
      />
      <Flex alignItems={"center"}>
        <Name username={`${video?.author?.username ?? ""}`} />
        <BsDot />
        <Text as="p" mt={4}>
          {moment(video.created_at).fromNow()}
        </Text>
      </Flex>
    </GridItem>
  );
};

export default FeedGridItem;
