import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Title = ({getVideo, ...props}:any) => {
  const [videoUrl, setvideoUrl] = useState<any>(null)
  const [videoUrlSelected, setvideoUrlSelected] = useState<any>(null)
  useEffect(() => {
    if (videoUrl) {
      // console.log("setvideoUrl4 final step",videoUrl)
    }
   
  },[videoUrl])

  useEffect(() => {
    if (getVideo) {
    // console.log("getVideo in player 3", getVideo.spkvideo.play_url)
    if (getVideo.spkvideo.play_url) {
      const url = getVideo.spkvideo.play_url
      // Splitting the string by "ipfs://" and getting the first result
      const splitResult = url.split("ipfs://");

      // The first element after splitting might be an empty string if the string starts with "ipfs://"
      // So, we check if the first element is empty and select the second element in that case
      const result = splitResult[0] === "" ? splitResult[1] : splitResult[0];
      setvideoUrlSelected("https://ipfs-3speak.b-cdn.net/ipfs/"+result)
    }
    // console.log("ipfs://QmPX8YosD35YphprEi5apHzbCcXXzq1xZbDdFiv7qJVFXv/manifest.m3u8")
    setvideoUrl(getVideo.spkvideo)
    }
  },[getVideo])

  useEffect(() => {
    console.log("videoUrlSelected", videoUrlSelected)
  },[videoUrlSelected])
  // "https://ipfs-3speak.b-cdn.net/ipfs/QmWoqdoLtsF4obB5sfSUc3GEZGY87TmcJrt6JpH8bJqsuK/manifest.m3u8" thumbnail_url
  // "https://ipfs-3speak.b-cdn.net/ipfs/bafybeibqxbf652lmfbdf7zoht3pbhkx4m76agdwn5mnw33vjhlxrzvccoe/"
  // `${videoUrl.play_url}` ipfs://QmPX8YosD35YphprEi5apHzbCcXXzq1xZbDdFiv7qJVFXv/manifest.m3u8
  if (!videoUrl) {
    return <Box>getting video details</Box>;
  }
  return (
    <Text
      fontSize={"20px"}
      color={props.colorMode==="dark"? "white": "dark"}
      fontWeight={"500"}
      textTransform="initial"
      marginTop={"0.5rem"}
      lineHeight={"38px"}
    >
      {getVideo.title}
    </Text>
  );
};

export default Title;
