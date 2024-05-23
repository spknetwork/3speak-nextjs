import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { VideoDetails } from "types";

type Props = {
    getVideo: VideoDetails;
    colorMode: string;
}

const Title = ({getVideo, colorMode}:Props) => {
 
  return (
    <Text
      fontSize={"20px"}
      color={colorMode==="dark"? "white": "dark"}
      fontWeight={"500"}
      textTransform="initial"
      marginTop={"0.5rem"}
      lineHeight={"38px"}
    >
      {getVideo?.title}
    </Text>
  );
};

export default Title;
