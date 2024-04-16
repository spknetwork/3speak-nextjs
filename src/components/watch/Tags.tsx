import { Box, Link, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  bgColor: string;
  colorMode: string;
  getVideo: any;
};
const Tags = ({ getVideo, ...props }: Props) => {
  // console.log("getVideo TAGS", getVideo)
  const firstFive = getVideo?.tags.slice(0, 5);
  return (
    <Box
      display={"flex"}
      flexWrap="wrap"
      flexDirection={"row"}
      marginBottom={"0.5rem"}
    >
      {firstFive.map((tag: any, index: number) => {
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
  );
};

export default Tags;
