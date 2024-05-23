import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactJWPlayer from "react-jw-player";
import { InfinitySpin } from "react-loader-spinner";
import { SpkVideoInterface, VideoInterface } from "types";
import { GET_VIDEO } from "@/graphql/queries";
import { useQuery } from "@apollo/client";

type Props = { 
  author: string;
  permlink: string;
};

const VideoPlayer = ({ author, permlink }: Props) => {
  //call the query here
  const getVideo = useQuery(GET_VIDEO, {
    variables: { author, permlink },
    ssr: true,
  });

  console.log("spkvideo", getVideo.data?.socialPost?.spkvideo);
  
  const spkvideo: SpkVideoInterface = getVideo?.data?.socialPost.spkvideo;
  
  const [videoUrl, setvideoUrl] = useState<SpkVideoInterface | null>(null);
  const [videoUrlSelected, setvideoUrlSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  console.log("url", spkvideo?.play_url);

    useEffect(() => {   
      if (!videoUrl) {
        setLoading(true);
      }
    }, [videoUrl]);

    useEffect(() => {
      if (spkvideo) {
        // console.log("getVideo in player 3", getVideo)
        if (spkvideo?.play_url) {
          const url = spkvideo?.play_url;
          // Splitting the string by "ipfs://" and getting the first result
          const splitResult = url.split("ipfs://");

          // The first element after splitting might be an empty string if the string starts with "ipfs://"
          // So, we check if the first element is empty and select the second element in that case
          const result = splitResult[0] === "" ? splitResult[1] : splitResult[0];
          setvideoUrlSelected("https://ipfs-3speak.b-cdn.net/ipfs/" + result);
        }
        // console.log("ipfs://QmPX8YosD35YphprEi5apHzbCcXXzq1xZbDdFiv7qJVFXv/manifest.m3u8")
        setvideoUrl(spkvideo);
      }
    }, [spkvideo]);

    useEffect(() => {
      console.log("videoUrlSelected", videoUrlSelected);
    }, [videoUrlSelected]);

  if (!videoUrlSelected) {
    return (
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        h={"70vh"}
        w={"full"}
        backgroundColor={"black"}
      >
        <InfinitySpin width="200" color="#6DC5D7" />
      </Flex>
    );
  }

  return (
    <Box h={"auto"} w={"full"} position={"relative"}>
      <ReactJWPlayer
        licenseKey="64HPbvSQorQcd52B8XFuhMtEoitbvY/EXJmMBfKcXZQU2Rnn"
        customProps={{
          playbackRateControls: true,
          autostart: false,
        }}
        file={`${videoUrlSelected}`}
        image={`${spkvideo?.thumbnail_url}`}
        id="botr_UVQWMA4o_kGWxh33Q_div"
        playerId={"1242424242"}
        playerScript="https://cdn.jwplayer.com/libraries/HT7Dts3H.js"
      ></ReactJWPlayer>
    </Box>
  );
};
// https://ipfs-3speak.b-cdn.net/ipfs/bafkreicg4s5rptacryg4w2mi6xxwcda5rfqr7nyxbbbf5ugrev6qmnodqe/
export default VideoPlayer;
