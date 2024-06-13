0//TODO: Add writeQuery graphql for the optimistic UI


import Video from "@/components/watch/video/Video";

import {
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  useColorMode,
  useColorModeValue,
  Switch,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import About from "@/components/watch/About";
import Profile from "@/components/watch/Profile";
import AllComments from "@/components/watch/Comment/AllComments";
import MenuButtons from "@/components/watch/MenuButtons";
import Reactions from "@/components/watch/Reactions";
// import Views from "@/components/watch/Views";
import Tags from "@/components/watch/Tags";
import Title from "@/components/watch/Title";
import VideoPlayer from "@/components/watch/VideoPlayer";
import Community from "@/components/watch/Community";
import { useState, useEffect, SetStateAction } from "react";
import MainLayout from "@/components/Layouts/main_layout";
import { useQuery } from "@apollo/client";
import {
  GET_PROFILE,
  GET_RELATED,
  GET_SOCIAL_POST,
  GET_VIDEO,
  GET_VIDEO_DETAILS,
} from "@/graphql/queries";
import { SpkVideoInterface, VideoDetails, VideoInterface } from "types";
import { useRouter } from "next/router";
import { useAppStore } from "@/lib/store";
import Suggestions from "@/components/suggestions/Suggestions";
import { InfinitySpin } from "react-loader-spinner";
import CommentParenting from "@/components/watch/Comment/CommentParenting";

export default function Watch() {
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");

  const router = useRouter();

  console.log("router", router.query.v);

  const author = ((router.query.v as string) ?? "cttpodcast/zjvcobqa").split(
    "/"
  )[0];
  const permlink = ((router.query.v as string) ?? "cttpodcast/zjvcobqa").split(
    "/"
  )[1];

  const getSuggestionFeed = useQuery(GET_RELATED, {
    variables: { author: author, permlink: permlink },
  });

  //call the query video details here
  const getVideoDetails = useQuery(GET_VIDEO_DETAILS, {
    variables: { author, permlink },
  });

  const videoDetails: VideoDetails = getVideoDetails?.data?.socialPost;

  //function for date formatting
  const dateFormatting = (data: string) => {
    const date = new Date(data);
    const year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let formattedMonth: string;

    switch (month) {
      case "01":
        formattedMonth = "Jan";
        break;
      case "02":
        formattedMonth = "Feb";
        break;
      case "03":
        formattedMonth = "Mar";
        break;
      case "04":
        formattedMonth = "Apr";
        break;
      case "05":
        formattedMonth = "May";
        break;
      case "06":
        formattedMonth = "Jun";
        break;
      case "07":
        formattedMonth = "Jul";
        break;
      case "08":
        formattedMonth = "Aug";
        break;
      case "09":
        formattedMonth = "Sep";
        break;
      case "10":
        formattedMonth = "Oct";
        break;
      case "11":
        formattedMonth = "Nov";
        break;
      case "12":
        formattedMonth = "Dec";
        break;
      default:
        formattedMonth = "";
    }
    const day = String(date.getDate()).padStart(2, "0");

    return `${formattedMonth} ${day}, ${year}`; 
  };

  return (
    <MainLayout>
      <Flex justifyContent={"right"} background={bgColor}>
        <Flex
          width={"97%"}
          flexDirection={["column", "row"]}
          color={colorMode === "dark" ? "white" : "dark"}
          padding={"10px"}
        >
          <Box flex="1">
            <Box
              borderRadius={4}
              boxShadow="base"
              mr={2}
              flex="1"
              bg={bgColor}
              maxW={"95%"}
            >
              <Box
                m={5}
                bg={bgColor}
                p={4}
                paddingLeft="0px"
                paddingRight={"0px"}
                color={colorMode === "dark" ? "white" : "dark"}
              >
                {/* iska kala color overlap kr rha hai   */}

                <Box>
                  <VideoPlayer author={author} permlink={permlink} />
                </Box>
                <Box>
                  <Flex flexDirection={"column"} bgColor={bgColor}>
                    <Box bgColor={bgColor}>
                      <Title getVideo={videoDetails} colorMode={colorMode} />
                      <Tags
                        videoDetails={videoDetails}
                        bgColor={bgColor}
                        colorMode={colorMode}
                      />
                    </Box>
                    <Flex>
                      <Text>{dateFormatting(videoDetails?.created_at)}</Text>
                    </Flex>
                    <Flex
                      justifyContent={"space-between"}
                      marginTop="1rem"
                      bgColor={bgColor}
                    >
                      <Profile
                        author={author}
                        bgColor={bgColor}
                        colorMode={colorMode}
                      />
                      <Reactions
                        bgColor={bgColor}
                        colorMode={colorMode}
                        getVideo={videoDetails}
                      />
                    </Flex>
                  </Flex>
                </Box>
              </Box>
            </Box>
            <Box
              marginBottom={"30px"}
              borderRadius={4}
              boxShadow="base"
              maxW={"95%"}
              w="full"
              pb={4}
              px={4}
              flex="1"
              bg={bgColor}
            >
              <Community
                bgColor={bgColor}
                colorMode={colorMode}
                videoDetails={videoDetails}
              />
            </Box>
            <Box
              borderRadius={4}
              boxShadow="base"
              flex="1"
              bg={bgColor}
              maxW={"95%"}
            >
              <About
                getVideo={videoDetails}
                bgColor={bgColor}
                colorMode={colorMode}
              />
            </Box>
            <Box
              marginBottom={"30px"}
              borderRadius={4}
              boxShadow={"base"}
              w="full"
              p={4}
              maxW={"95%"}
            >
              <AllComments
                author={author}
                permlink={permlink}
                bgColor={bgColor}
                colorMode={colorMode}
              />
            </Box>
          </Box>
          {getSuggestionFeed.loading ? (
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              h="70vh"
              w={452}
            >
              <InfinitySpin width="200" color="#6DC5D7" />
            </Flex>
          ) : (
            <Suggestions
              videos={getSuggestionFeed.data.relatedFeed.items}
              bgColor={bgColor}
              colorMode={colorMode}
            />
          )}
        </Flex>
      </Flex>
    </MainLayout>
  );
}
function dateFormatting(created_at: string): import("react").ReactNode {
    throw new Error("Function not implemented.");
}

