//TODO: react markdown render

import { Box, Link, Text, Flex, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Community from "@/components/watch/Community";
import { InfinitySpin } from "react-loader-spinner";
import { ProfileInterface, VideoDetails, VideoInterface } from "types";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

type Props = {
  getVideo: VideoDetails;
  bgColor: string;
  colorMode: string;
};

const About = ({ getVideo, ...props }: Props) => {
  const [showLess, setShowLess] = useState(true);
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
      boxShadow={
        props.colorMode === "dark" ? "0 0 11px black" : "0 0 11px #ececec;"
      }
      transitionDuration={"0.4s"}
      background={props.bgColor}
    >
      <Box
        marginBottom={"30px"}
        borderRadius={4}
        // boxShadow="base"
        mr={2}
        flex="1"
        bg={props.bgColor}
      >
        <Community
          bgColor={props.bgColor}
          colorMode={props.colorMode}
          getVideo={getVideo}
        />
      </Box>

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
              <ReactMarkdown>
                {getVideo?.body}
              </ReactMarkdown>
              ,
            </div>
          </Text>
        </span>
        <Text
          marginBottom={"5px"}
          color={props.colorMode === "dark" ? "white" : "black"}
          fontSize={"15px"}
          fontWeight="600"
        >
          {/* TODO: change it from timestamp to date and time */}
          {`Published on ${new Date(
            getVideo?.created_at
          ).toLocaleDateString()} at ${new Date(
            getVideo?.created_at
          ).toLocaleTimeString()}`}
        </Text>
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
            //TODO: tags
            return (
              <Box key={index}>
                <Link
                  href={"/tags/" + `${tag}`}
                  color={"cyan"}
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
          color={props.colorMode === "dark" ? "white" : "black"}
        >
          {showLess ? "Show more" : "Show less"}
        </Text>
      </Box>
    </Box>
  );
};

export default About;
