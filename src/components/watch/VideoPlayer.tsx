import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactJWPlayer from "react-jw-player";
import { InfinitySpin } from "react-loader-spinner";
import { VideoInterface } from "types";


type Props = {
  getVideo: VideoInterface;
};

const VideoPlayer = ({ getVideo }: Props) => {
  const [videoUrl, setvideoUrl] = useState<
    Props["getVideo"]["spkvideo"] | null
  >(null);
  const [videoUrlSelected, setvideoUrlSelected] = useState<string | null>(null);

  //loading state:
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!videoUrl) {
      setLoading(true);
    }
  }, [videoUrl]);

  useEffect(() => {
    if (getVideo) {
      // console.log("getVideo in player 3", getVideo)
      if (getVideo?.spkvideo?.play_url) {
        const url = getVideo.spkvideo.play_url;
        // Splitting the string by "ipfs://" and getting the first result
        const splitResult = url.split("ipfs://");

        // The first element after splitting might be an empty string if the string starts with "ipfs://"
        // So, we check if the first element is empty and select the second element in that case
        const result = splitResult[0] === "" ? splitResult[1] : splitResult[0];
        setvideoUrlSelected("https://ipfs-3speak.b-cdn.net/ipfs/" + result);
      }
      // console.log("ipfs://QmPX8YosD35YphprEi5apHzbCcXXzq1xZbDdFiv7qJVFXv/manifest.m3u8")
      setvideoUrl(getVideo?.spkvideo);
    }
  }, [getVideo]);

  useEffect(() => {
    console.log("videoUrlSelected", videoUrlSelected);
  }, [videoUrlSelected]);

  if (!videoUrl) {
    return (
        <Flex justifyContent={"center"} alignItems={"center"} h={"70vh"} w={652} backgroundColor={"black"}>
          <InfinitySpin width="200" color="#6DC5D7" />
        </Flex>
    );
  }

  return (
    <ReactJWPlayer
      licenseKey="64HPbvSQorQcd52B8XFuhMtEoitbvY/EXJmMBfKcXZQU2Rnn"
      customProps={{
        playbackRateControls: true,
        autostart: false,
      }}
      file={`${videoUrlSelected}`}
      image={`${videoUrl.thumbnail_url}`}
      id="botr_UVQWMA4o_kGWxh33Q_div"
      playerId={"1242424242"}
      playerScript="https://cdn.jwplayer.com/libraries/HT7Dts3H.js"
    ></ReactJWPlayer>
  );
};
// https://ipfs-3speak.b-cdn.net/ipfs/bafkreicg4s5rptacryg4w2mi6xxwcda5rfqr7nyxbbbf5ugrev6qmnodqe/
export default VideoPlayer;
