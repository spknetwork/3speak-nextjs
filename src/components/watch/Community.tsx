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
    <Flex justifyContent={"start"} alignItems="center">
      <Flex
        bg={props.bgColor}
        color={props.colorMode === "dark" ? "white" : "black"}
      >
        <Flex marginBottom={"10px"} fontSize={"20px"} marginTop={"12px"}>
          Community:
        </Flex>
        <Flex
          justifyContent={"space-between"}
          alignItems="center"
          px={4}
          marginTop={"12px"}
          marginBottom={"10px"}
        >
          <Flex alignItems={"center"} px={2}>
            <Avatar
              name={props.videoDetails?.community?._id}
              src={props.videoDetails?.community?.images?.avatar}
            />
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
