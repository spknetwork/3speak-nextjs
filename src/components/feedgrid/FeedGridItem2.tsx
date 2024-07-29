//TODO: restructure the layout for the suggestions feed

import React, { useState } from "react";
import {
  Box,
  GridItem,
  Image,
  Link,
  Text,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdOutlineThumbUp } from "react-icons/md";
import { BiDollar } from "react-icons/bi";
import VideosTitle from "@/components/VideosTitle";
import Name from "@/components/user/Name";
import { Video } from "./Video";
import { ProfileInterface, VideoInterface } from "types";
import moment from "moment";
import { InfinitySpin } from "react-loader-spinner";
import { useColorMode } from "@chakra-ui/react";
import { BsDot } from "react-icons/bs";
import { Avatar } from "@chakra-ui/react";
import { GET_PROFILE } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { useGetMyQuery } from "@/hooks/getUserDetails";

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

const FeedGridItem2 = ({ video }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");

  const [showDollarComponent, setShowDollarComponent] = useState(true);
  if (!video) {
    return (
      <Box justifyContent={"center"} alignItems={"center"} h="70vh" w={452}>
        <InfinitySpin width="200" color="#6DC5D7" />
      </Box>
    );
  }

  const handleMouseOver = () => {
    setShowDollarComponent(false);
  };
  const handleMouseLeave = () => {
    setShowDollarComponent(true);
  };
  console.log("Video details", video);

  return (
    <GridItem
      w="100%"
      h="100%"
      p={1}
      m={1}
      borderRadius={"10px"}
      cursor={"pointer"}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <Flex>
        <Box cursor={"pointer"} position="relative">
          {showDollarComponent && (
            <Box>
              <Box
                display={"flex"}
                justifyContent="center"
                alignItems={"center"}
                position={"absolute"}
                bottom="5px"
                color={"#000"}
                left="5px"
                fontSize="8px"
                fontWeight={"500"}
                background={"none 0px 0px repeat scroll rgb(232, 232, 232)"}
                borderRadius="2px"
                paddingLeft={"4px"}
                paddingRight={"4px"}
              >
                <MdOutlineThumbUp size="12px" color="grey" />
                <Text as="span" fontWeight={"bold"}>
                  {video?.stats?.num_votes}
                </Text>
              </Box>

              <Box
                className="props"
                display={"flex"}
                justifyContent="center"
                alignItems={"center"}
                position={"absolute"}
                bottom="5px"
                left="60px"
                color={"#000"}
                fontSize="8px"
                fontWeight={"500"}
                background={"none 0px 0px repeat scroll rgb(232, 232, 232)"}
                borderRadius="2px"
                paddingRight={"2px"}
              >
                <BiDollar size="12px" color="black" />
                <Text as="span" fontSize="8px" fontWeight={"bold"}>
                  {video?.stats?.total_hive_reward
                    ? video.stats.total_hive_reward.toFixed(3)
                    : "0.000"}
                </Text>
              </Box>

              <Box
                position={"absolute"}
                bottom="5px"
                fontSize="8px"
                fontWeight={"bold"}
                left="120px"
                background={"none 0px 0px repeat scroll rgb(232, 232, 232)"}
                borderRadius="2px"
                padding={"0px 6px"}
              >
                {toHHMMSS(video?.spkvideo?.duration ?? 0)}
              </Box>
            </Box>
          )}
          <Box width={["auto", "48", "48", "48"]} aspectRatio={16 / 9}>
            <Image
              width="100% !important"
              borderRadius={"10px"}
              objectFit="cover"
              alt="test"
              aspectRatio={16 / 9}
              src={`https://images.hive.blog/320x0/${
                video.spkvideo?.thumbnail_url ?? ""
              }`}
              onClick={() => {
                redirect(video.permlink, video?.author?.username ?? "");
              }}
            />
          </Box>
        </Box>

        <Box px={2}>
          <VideosTitle
            title={`${video.title}`}
            author={video.author}
            permlink={`${video.permlink}`}
          />
          <Flex alignItems={"center"}>
            <Avatar
              size={"sm"}
              mr={2}
              src={video?.author?.profile?.images?.avatar}
            />
            {/* <Box>
                <BsDot />
              </Box> */}
            <Box pt={3}>
              <Name username={`${video?.author?.username ?? ""}`} />
            </Box>
            <BsDot />
            <Text fontSize={"8px"} mt={3}>{moment(video?.created_at).fromNow()}</Text>
          </Flex>
        </Box>
      </Flex>
    </GridItem>
  );
};

export default FeedGridItem2;
