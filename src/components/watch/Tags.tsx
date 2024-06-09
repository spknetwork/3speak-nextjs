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
            <Box key={index}>
              <Link
                href={"/tags/" + `${tag}`}
                display={"inline-block"}
                color={props.colorMode === "dark" ? "blue.300" : "blue"}
              >
                #{tag}&nbsp;
              </Link>
            </Box>
          );
        })}
      </Box>
    </Flex>
  );
};

export default Tags;
