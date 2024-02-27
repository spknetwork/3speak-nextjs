import { Box, Link, Text } from "@chakra-ui/react";
import React from "react";

const Tags = ({getVideo}:any) => {
  // console.log("getVideo TAGS", getVideo)
  const firstFive = getVideo?.tags.slice(0, 5);
  return (
    <Box
      display={"flex"}
      flexWrap="wrap"
      flexDirection={"row"}
      marginBottom={"0.5rem"}
    >
      {
        firstFive.map((tag:any, index:number) => {
          return (
            <Box key={index}>
        <Link href={"/tags/"+`${tag}`} color={"blue"} display={"inline-block"}>
          #{tag}&nbsp;
        </Link>
      </Box>
          )
        })
      }
      
      {/* <Box>
        <Link href="#" color={"blue"} display={"inline-block"}>
          #system&nbsp;
        </Link>
      </Box>
      <Box>
        <Link href="#" color={"blue"} display={"inline-block"}>
          #3speakspeaking
        </Link>
      </Box> */}
    </Box>
  );
};

export default Tags;
