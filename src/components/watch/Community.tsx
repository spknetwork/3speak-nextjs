import { Avatar, Box, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { VideoDetails } from "types";

type Props = {
  videoDetails: VideoDetails;
  bgColor: string;
  colorMode: string;
};

const Community = (props: Props) => {
  return (
    <Flex justifyContent={"start"} alignItems="center" fontFamily={"system-ui"}>
      <Flex
        bg={props.bgColor}
        color={props.colorMode === "dark" ? "white" : "black"}
      >
        <Flex alignItems="center">
          <h3>Community</h3>
        </Flex>
        <Flex
          justifyContent={"space-between"}
          alignItems="center"
          px={4}
          marginTop={"12px"}
          marginBottom={"10px"}
        >
          <Flex alignItems={"center"} px={2}>
            <Flex boxShadow={"lg"} borderRadius="50%">
              <Avatar
                name={props.videoDetails?.community?._id}
                src={props.videoDetails?.community?.images?.avatar}
              />
            </Flex>
            <Flex fontSize={"xl"} px={2}>
              {props.videoDetails?.community?.username}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Community;
