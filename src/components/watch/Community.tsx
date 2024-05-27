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
    <Flex justifyContent={"start"}>
      <Box
        bg={props.bgColor}
        color={props.colorMode === "dark" ? "white" : "black"}
      >
        <Text marginBottom={"10px"} fontSize={"20px"} marginTop={"12px"}>
          Community
        </Text>
        <Flex alignItems={"center"}>
          <Avatar
            name={props.videoDetails?.community?._id}
            src={props.videoDetails?.community?.images?.avatar}
          />
          <Flex flexDirection={"column"} className="ms-4">
            <Link fontWeight={"bolder"} fontSize={"11px"}>
              {}
            </Link>
          </Flex>
          <Text fontSize={"xl"}>{props.videoDetails?.community?.username}</Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Community;
