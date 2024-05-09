import { Box, Link, Text, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Community from "@/components/watch/Community";
import { InfinitySpin } from "react-loader-spinner";
import { VideoInterface } from "types";

type Props = {
  bgColor: string;
  colorMode: string;
  getVideo: VideoInterface;
};
const About = ({getVideo, ...props}: Props) => {

  const [showLess, setShowLess] = useState(true);
  const showLessFunction = () => {
    setShowLess(!showLess);
  };
  const [videoUrl, setvideoUrl] = useState<any>(null)
  const [videoUrlSelected, setvideoUrlSelected] = useState<any>(null)
  // let remaningTags:any = [];

  useEffect(() => {
    if (videoUrl) {
      // console.log("setvideoUrl4 final step",videoUrl)
    }

  }, [videoUrl])

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
        setvideoUrlSelected("https://ipfs-3speak.b-cdn.net/ipfs/" + result)
      }
      // console.log("ipfs://QmPX8YosD35YphprEi5apHzbCcXXzq1xZbDdFiv7qJVFXv/manifest.m3u8")
      setvideoUrl(getVideo?.spkvideo?.play_url)
      
    }
  }, [getVideo])

  useEffect(() => {
    console.log("videoUrlSelected", videoUrlSelected)
  }, [videoUrlSelected])
  // "https://ipfs-3speak.b-cdn.net/ipfs/QmWoqdoLtsF4obB5sfSUc3GEZGY87TmcJrt6JpH8bJqsuK/manifest.m3u8" thumbnail_url
  // "https://ipfs-3speak.b-cdn.net/ipfs/bafybeibqxbf652lmfbdf7zoht3pbhkx4m76agdwn5mnw33vjhlxrzvccoe/"
  // `${videoUrl.play_url}` ipfs://QmPX8YosD35YphprEi5apHzbCcXXzq1xZbDdFiv7qJVFXv/manifest.m3u8
  if (!videoUrl) {
    return (
        <Flex justifyContent={"center"} alignItems={"center"} h={"70vh"} w={"full"}>
          <InfinitySpin width="200" color="#6DC5D7" />
        </Flex>
    );
  }
  return (
    <Box
      marginBottom={"30px"}
      padding="15px"
      borderRadius={"2px"}
      boxShadow={
        props.colorMode === "dark" ? "0 0 11px black" : "0 0 11px #ececec;"
      }
      transitionDuration={"0.4s"}
      background={props.bgColor}
    >
      <Text
        marginBottom={"5px"}
        color={props.colorMode === "dark" ? "white" : "black"}
        fontSize={"15px"}
        fontWeight="600"
      >
        Published on Dec 25, 2022
      </Text>

      <Box
        maxHeight={showLess ? "200px" : "initial"}
        overflow="hidden"
        paddingBottom={"10px"}
      >
        <span className="description">
          <Text color={props.colorMode === "dark" ? "white" : "black"}>
            <div>
              {/* Use dangerouslySetInnerHTML to insert the HTML */}
              <div dangerouslySetInnerHTML={{ __html: videoUrl.body /* or sanitizedHtml if you sanitized it */ }} />
            </div>
          </Text>
        </span>
        <Text
          marginTop={"18px"}
          color={props.colorMode === "dark" ? "white" : "black"}
          fontSize="15px"
          fontWeight={"600"}
        >
          Tags:
        </Text>
        <Box display={"flex"} flexWrap="wrap" flexDirection={"row"}>
          {
            getVideo.tags.slice(5).map((tag: any, index:number) => {
              return (
                <Box key={index}>
                  <Link href={"/tags/" + `${tag}`} color={"blue"} display={"inline-block"}>
                    #{tag}&nbsp;
                  </Link>
                </Box>
              )
            })
          }

        </Box>
        <Box
          marginBottom={"30px"}
          borderRadius={4}
          // boxShadow="base"
          mr={2}
          flex="1"
          bg={props.bgColor}
        >
          <Community bgColor={props.bgColor} colorMode={props.colorMode} />
        </Box>
      </Box>

      <Box
        onClick={() => showLessFunction()}
        borderTop={"1px solid rgba(0,0,0,0.2)"}
        cursor="pointer"
      >
        <Text
          className="text-dark"
          textAlign={"center"}
          color={"white"}
        >
          {showLess ? "Show more" : "Show less"}
        </Text>
      </Box>
    </Box>
  );
};

export default About;
