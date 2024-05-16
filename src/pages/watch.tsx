//TODO: fetch comments and limit them to 2
//TODO: fetch body as description
//TODO: limit the total hive_rewards to 3 decimal zeroes

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
import Comment from "@/components/watch/Comment/Comment";
import MenuButtons from "@/components/watch/MenuButtons";
import Reactions from "@/components/watch/Reactions";
// import Views from "@/components/watch/Views";
import Tags from "@/components/watch/Tags";
import Title from "@/components/watch/Title";
import VideoPlayer from "@/components/watch/VideoPlayer";
import Community from "@/components/watch/Community";
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import MainLayout from "@/components/Layouts/main_layout";
import { useQuery } from "@apollo/client";
import { GET_PROFILE, GET_RELATED, GET_SOCIAL_POST } from "@/graphql/queries";
import { VideoInterface } from "types";
import { useRouter } from "next/router";
import { useAppStore } from "@/lib/store";
import Suggestions from "@/components/suggestions/Suggestions";
import { InfinitySpin } from "react-loader-spinner";

export default function Watch() {
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");

  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
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
  
  const getUserProfile = useQuery(GET_PROFILE, {
      variables: { id: author },
    });
    
    const getSocialPost = useQuery(GET_SOCIAL_POST, {
        variables: { author, permlink },
    });
    
    const getVideo: VideoInterface = getSocialPost?.data?.socialPost;
    
    console.log("getVideos", getVideo)
    
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
            <Box borderRadius={4} boxShadow="base" mr={2} flex="1" bg={bgColor}>
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
                  <VideoPlayer getVideo={getVideo} />
                </Box>
                <Box>
                  <Flex flexDirection={"column"} bgColor={bgColor}>
                    <Box bgColor={bgColor}>
                      <Title
                        getVideo={getVideo}
                        bgColor={bgColor}
                        colorMode={colorMode}
                      />
                      <Tags
                        tags={getVideo?.tags}
                        bgColor={bgColor}
                        colorMode={colorMode}
                      />
                    </Box>
                    <Flex
                      justifyContent={"space-between"}
                      marginTop="1rem"
                      bgColor={bgColor}
                    >
                      <Profile
                        profile={profile}
                        getVideo={getVideo}
                        bgColor={bgColor}
                        colorMode={colorMode}
                      />
                      <Reactions bgColor={bgColor} colorMode={colorMode} />
                    </Flex>
                  </Flex>
                </Box>
              </Box>
            </Box>
            <Box borderRadius={4} boxShadow="base" mr={2} flex="1" bg={bgColor}>
              <About
                getVideo={getVideo}
                bgColor={bgColor}
                colorMode={colorMode}
              />
            </Box>
            <Box>
              <Comment getVideo={getVideo} bgColor={bgColor} colorMode={colorMode} />
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
