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
import { GET_PROFILE, TRENDING_FEED } from "@/graphql/queries";
import { VideoInterface } from "types";
import { useRouter } from "next/router";

export default function Watch() {
  const router = useRouter();

  const { loading, error, data } = useQuery(TRENDING_FEED);
  const [videos, setVideos] = useState<VideoInterface[]>([]);
  const [profile, setProfile] = useState<any>(null);
  console.log("router",router.query.username)

  const { loading:loadingforProfile, error:errorforProfile, data:dataorProfile } = useQuery(GET_PROFILE, {
    variables: { id: router.query.username },
});
useEffect(() => {
  console.log("profile get", profile)
},[profile])
useEffect(() => {
  if (!loadingforProfile && !errorforProfile && dataorProfile) {
    console.log("setVideos data PROFILE", dataorProfile);
    if (dataorProfile) {
      setProfile(dataorProfile.profile)
    }
    // setVideos(
    //   data.trendingFeed.items
    //     .filter((e: any) => !!e.spkvideo)
    //     .map((e: any) => {
    //       console.log(e);
    //       return {
    //         title: e.title,
    //         username: e.author.username,
    //         thumbnail: e.spkvideo.thumbnail_url,
    //         spkvideo: e.spkvideo,
    //         author: e.author,
    //         permlink: e.permlink,
    //         tags: e.tags,
    //       };
    //     })
    // );
  }
}, [loadingforProfile, dataorProfile, errorforProfile]);
  
  useEffect(() => {
    if (!loading && !error && data) {
      console.log("setVideos data TRENDING_FEED", data);

      setVideos(
        data.trendingFeed.items
          .filter((e: any) => !!e.spkvideo)
          .map((e: any) => {
            console.log(e);
            return {
              title: e.title,
              username: e.author.username,
              thumbnail: e.spkvideo.thumbnail_url,
              spkvideo: e.spkvideo,
              author: e.author,
              permlink: e.permlink,
              tags: e.tags,
            };
          })
      );
    }
  }, [loading, data, error]);
  const [count, setCount] = useState<number>(0);
  const [getVideo, setVideoSelected] = useState<any>(null)
  console.log(count)

  const { video: videoSelected, setVideo } = useAppStore();
  useEffect(() => {
    setVideoSelected(videoSelected)

  }, [videoSelected])


  useEffect(() => {
    if (getVideo) {
      console.log("getVideo 2", getVideo)
      // setVideo(null)
    }
  }, [getVideo])
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

          color="white" padding={"10px"}>
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
                {getVideo && (
                  <VideoPlayer getVideo={getVideo} />
                )}

                <Box>
                  <Flex flexDirection={"column"}>
                    <Box>
                      <Title getVideo={getVideo} />
                      <Tags getVideo={videoSelected} />
                    </Box>
                    <Flex justifyContent={"end"} marginTop="1rem">
                      <Reactions  getVideo={getVideo}/>
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
              {/* published or about components */}
              <About getVideo={getVideo} />
            </Box>
            <Box>
              {/* comment */}
              <Comment />
            </Box>
          </Box>
          {/* borderRadius={4} boxShadow="base" mr={2} flex="1" bg="white" */}
          {/* <Box
          w={{ base:  "100%", md: "33%", lg: "33%" }}
          bg="white"
          color={"black"}
          marginTop="15px"
          borderRadius={4}
          boxShadow="base"
          marginLeft={"10px"}
          paddingTop="10px"
          paddingX={'10px'}
        >
           <Video videoSrc="https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVcJpKJDN8sx7ZjXNkfrVDtAkjdi59a6bGJtSa9MJdsqxYnqALaV6iRcMCMd5TL4RfZMhnbb6e?format=jpeg&mode=cover&width=340&height=191" />
        </Box> */}
          <Box
            w={{ base: "100%", md: "25%", lg: "33%" }}
            bg="white"
            color={"black"}
            marginTop="15px"
            borderRadius={4}
            boxShadow="base"
            marginLeft={"10px"}
            paddingTop="10px"
            paddingX={'10px'}
            paddingRight="25px"
            maxWidth={"25%"}
          >
            <Box margin={'15px'}>
              <Text
                as="h2"
                fontWeight={'bolder'}
                lineHeight='1.2'
                fontSize={'1.5rem'}
              >
                Suggested video you may like
              </Text>
            </Box>
            <Grid display={{ base: 'inline-table', md: 'inline-table', lg: 'inline-table' }} templateColumns="repeat(1, 1fr)" gap={2}>
              <GridItem
                marginTop={"1px !important"}
                m={5}
                w="100%"
                h="10"
                bg="white.600"
              >
                {!loading &&
                  !error &&
                  videos.map((video: VideoInterface, index: number) => (


                    <Video number_views='23' video={video} videoSrc={`${video.thumbnail}`} />

                  ))}
              </GridItem>
            </Grid>
            <Box margin={'15px'} marginTop='35px'>
              <Text
                as="h2"
                fontWeight={'bolder'}
                lineHeight='1.2'
                fontSize={'1.5rem'}
              >
                More from (username)
              </Text>
              <Text
                padding={'15px'}
                background='black'
                borderRadius={'10px'}
                color='white'
              >
                (username) has no more videos yet.
              </Text>
            </Box>
          </Box>
        </Flex>
      </Box>
    </MainLayout>

  );
}
