// README: legacy redirect only

// export async function getServerSideProps(context: any) {
//   const [author, permlink] = context.query.v.split('/')
//   return {
//     redirect: {
//       permanent: false,
//       destination: `/@${author}/${permlink}`,
//     },
//     props:{},
//   };
// }

import Video from "@/components/watch/Video";
import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";

import About from "@/components/watch/About";
import Profile from "@/components/watch/Profile";
import Comment from "@/components/watch/Comment";
import MenuButtons from "@/components/watch/MenuButtons";
import Reactions from "@/components/watch/Reactions";
import Views from "@/components/watch/Views";
import Tags from "@/components/watch/Tags";
import Title from "@/components/watch/Title";
import VideoPlayer from "@/components/watch/VideoPlayer";
import Community from "@/components/watch/Community";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import MainLayout from "@/components/Layouts/main_layout";
import { useQuery } from "@apollo/client";
import { GET_PROFILE, GET_RELATED } from "@/graphql/queries";
import { VideoInterface } from "types";
import { useRouter } from "next/router";
import Suggestions from "@/components/suggestions/Suggestions";
import { InfinitySpin } from "react-loader-spinner";

export default function Watch() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  console.log("router", router.query.v);
  const username = ((router.query.v as string) ?? "cttpodcast/zjvcobqa").split(
    "/"
  )[0];
  const permlink = ((router.query.v as string) ?? "cttpodcast/zjvcobqa").split(
    "/"
  )[1];
  const getSuggestionFeed = useQuery(GET_RELATED, {
    variables: { author: username, permlink: permlink },
  });

  const getUserProfile = useQuery(GET_PROFILE, {
    variables: { id: username },
  });

  useEffect(() => {
    console.log("profile get", profile);
  }, [profile]);

  const [count, setCount] = useState<number>(0);
  const [getVideo, setVideoSelected] = useState<any>(null);
  console.log(count);

  const { video: videoSelected, setVideo } = useAppStore();
  useEffect(() => {
    setVideoSelected(videoSelected);
  }, [videoSelected]);

  useEffect(() => {
    if (getVideo) {
      console.log("getVideo 2", getVideo);
      // setVideo(null)
    }
  }, [getVideo]);
  return (
    <MainLayout>
      <Box background={"#EFF4F5"}>
        <Flex
          css={css`
            @media (max-width: 768px) {
              flex-direction: column;
            }

            @media (min-width: 769px) {
              flex-direction: row;
            }
          `}
          color="white"
          padding={"10px"}
        >
          <Box flex="1">
            <Box borderRadius={4} boxShadow="base" mr={2} flex="1" bg="white">
              <Box
                m={5}
                bg="white"
                p={4}
                paddingLeft="0px"
                paddingRight={"0px"}
                color="black"
              >
                {getVideo && <VideoPlayer getVideo={getVideo} />}

                <Box>
                  <Flex flexDirection={"column"}>
                    <Box>
                      <Title getVideo={getVideo} />
                      {videoSelected && <Tags getVideo={videoSelected} />}
                    </Box>
                    <Flex justifyContent={"end"} marginTop="1rem">
                      <Reactions getVideo={getVideo} />
                    </Flex>
                  </Flex>
                </Box>
              </Box>
            </Box>
            <Box
              marginBottom={"30px"}
              borderRadius={4}
              boxShadow="base"
              mr={2}
              flex="1"
              bg="white"
            >
              <Profile profile={profile} getVideo={getVideo} />
            </Box>

            <Box
              marginBottom={"30px"}
              borderRadius={4}
              boxShadow="base"
              mr={2}
              flex="1"
              bg="white"
            >
              <Community />
            </Box>

            <Box borderRadius={4} boxShadow="base" mr={2} flex="1" bg="white">
              <About getVideo={getVideo} />
            </Box>
            <Box>
              <Comment />
            </Box>
          </Box>

          {getSuggestionFeed.loading ? (
            <InfinitySpin width="200" color="#6DC5D7" />
          ) : (
            <Suggestions videos={getSuggestionFeed.data.relatedFeed.items} />
          )}
        </Flex>
      </Box>
    </MainLayout>
  );
}
