import { Box, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { VideoDetails, VideoInterface } from "types";

type Props = {
  bgColor: string;
  colorMode: string;
  videoDetails: VideoDetails | VideoInterface;
};

const Tags = ({ videoDetails, ...props }: Props) => {

  // console.log("getVideo TAGS", getVideo)
  const firstFive = videoDetails?.tags?.slice(0, 5);
  return (
    <Flex>
      <Box
        display={"flex"}
        flexWrap="wrap"
        flexDirection={"row"}
        marginBottom={"0.5rem"}
      >
        {firstFive?.map((tag: any, index: number) => {
          return (
            <Flex
             alignItems={"center"}
              key={index}
              backgroundColor={
                props.colorMode === "dark" ? "gray.500" : "gray.300"
              }
              px={2}
              mx={1}
              my={2}
              borderRadius={10}
              h={["10", "9", "8", "8"]}
              cursor={"pointer"}
              position={"relative"}
            >
              <Link
                href={"/tags/" + `${tag}`}
                display={"inline-block"}
                color={props.colorMode === "dark" ? "blue.50" : "blue.500"}       
                fontSize={["12px", "20px", "16px", "12px"]}        
              >
                #{tag}
              </Link>
            </Flex>
          );
        })}
      </Box>
    </Flex>
  );
};

export default Tags;
