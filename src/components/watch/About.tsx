//TODO: remove the hashtags 

import { Box, Link, Text, Flex, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Community from "@/components/watch/Community";
import { InfinitySpin } from "react-loader-spinner";
import { ProfileInterface, VideoDetails, VideoInterface } from "types";
import CustomMarkdown from "@/helper/CustomMarkdown";
import ReactMarkdown from "react-markdown";

type Props = {
  getVideo: VideoDetails;
  bgColor: string;
  colorMode: string;
};

const About = ({ getVideo, ...props }: Props) => {
  const [showLess, setShowLess] = useState(true);

  //custom markdown function

  const showLessFunction = () => {
    setShowLess(!showLess);
  };

  console.log("getvideo from about", getVideo);
  if (!getVideo) {
    return (
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        h={"70vh"}
        w={"full"}
      >
        <InfinitySpin width="200" color="#6DC5D7" />
      </Flex>
    );
  }
  return (
    <Box
      marginBottom={"30px"}
      padding="15px"
      borderRadius={"2px"}
      transitionDuration={"0.4s"}
      background={props.bgColor}
      boxShadow={"xs"}
    >
      {/* TODO: filtering out body  */}
      <Box
        maxHeight={showLess ? "200px" : "initial"}
        overflow="hidden"
        paddingBottom={"10px"}
      >
        <span className="description">
          <Text color={props.colorMode === "dark" ? "white" : "black"}>
            <div>
              {/* Use dangerouslySetInnerHTML to insert the HTML */}
              {/* <div
                dangerouslySetInnerHTML={{
                  __html:
                    getVideo.body
                }}
              />*/}

              <CustomMarkdown content={getVideo?.body} />

            </div>
          </Text>
        </span>
        {/* <Text
          marginBottom={"5px"}
          color={props.colorMode === "dark" ? "white" : "black"}
          fontSize={"15px"}
          fontWeight="600"
        >
          {`Published on ${new Date(
            getVideo?.created_at
          ).toLocaleDateString()} at ${new Date(
            getVideo?.created_at
          ).toLocaleTimeString()}`}
        </Text> */}
        <Text
          marginTop={"18px"}
          color={props.colorMode === "dark" ? "white" : "black"}
          fontSize="15px"
          fontWeight={"600"}
        >
          Tags:
        </Text>
        <Box display={"flex"} flexWrap="wrap" flexDirection={"row"}>
          {getVideo.tags.slice(5).map((tag: any, index: number) => {
            return (
              <Box key={index}>
                <Link
                  href={"/tags/" + `${tag}`}
                  color={"blue.300"}
                  display={"inline-block"}
                >
                  #{tag}&nbsp;
                </Link>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box
        onClick={() => showLessFunction()}
        borderTop={"1px solid rgba(0,0,0,0.2)"}
        cursor="pointer"
      >
        <Text
          textAlign={"center"}
          fontWeight={"bold"}
          fontFamily={"system-ui"}
          color={props.colorMode === "dark" ? "white" : "black"}
        >
          {showLess ? "Show more" : "Show less"}
        </Text>
      </Box>
    </Box>
  );
};

export default About;
