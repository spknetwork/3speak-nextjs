import { Avatar, Box, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { VideoDetails } from "types";
import { IoIosArrowForward } from "react-icons/io";

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
        gap={3}
      >
        <Flex alignItems="center" mt={2}>
          <h3>Community</h3>
        </Flex>
        <Flex alignItems={'center'}>
          <IoIosArrowForward />
        </Flex>
        <Flex
          justifyContent={"space-between"}
          alignItems="center"
          marginTop={"12px"}
          marginBottom={"10px"}
        >
          <Flex alignItems={"center"}>
            <Flex boxShadow={"lg"} borderRadius="50%">
              <Avatar
                name={props.videoDetails?.community?._id}
                src={props.videoDetails?.community?.images?.avatar}
              />
            </Flex>
            <Flex fontSize={"xl"} px={2} alignItems={"center"} fontWeight={"bold"}>
              {props.videoDetails?.community?.username}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Community;
