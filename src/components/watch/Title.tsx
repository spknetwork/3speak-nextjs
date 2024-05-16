import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { VideoInterface } from "types";

type Props = {
    getVideo: VideoInterface;
    bgColor: string;
    colorMode: string;
}

const Title = ({getVideo, bgColor, colorMode}:Props) => {
  const [videoUrl, setvideoUrl] = useState<any>(null)
  const [videoUrlSelected, setvideoUrlSelected] = useState<any>(null)



  useEffect(() => {
    if (getVideo) {
    // console.log("getVideo in player 3", getVideo.spkvideo.play_url)
    if (getVideo?.spkvideo?.play_url) {
      const url = getVideo?.spkvideo?.play_url
      // Splitting the string by "ipfs://" and getting the first result
      const splitResult = url.split("ipfs://");

      // The first element after splitting might be an empty string if the string starts with "ipfs://"
      // So, we check if the first element is empty and select the second element in that case
      const result = splitResult[0] === "" ? splitResult[1] : splitResult[0];
      setvideoUrlSelected("https://ipfs-3speak.b-cdn.net/ipfs/"+result)
    }
    setvideoUrl(getVideo?.spkvideo)
    }
  },[getVideo])

  useEffect(() => {
    console.log("videoUrlSelected", videoUrlSelected)
  },[videoUrlSelected])

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
