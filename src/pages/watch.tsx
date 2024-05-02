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
import { GET_PROFILE, GET_RELATED } from "@/graphql/queries";
import { VideoInterface } from "types";
import { useRouter } from "next/router";
<<<<<<< HEAD
import { useAppStore } from "@/lib/store";
=======
import Suggestions from "@/components/suggestions/Suggestions";
import { InfinitySpin } from "react-loader-spinner";
>>>>>>> origin/feature/gql-implementation

export default function Watch() {
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");

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
<<<<<<< HEAD
  }, [getVideo])

=======
  }, [getVideo]);
>>>>>>> origin/feature/gql-implementation
  return (
    <MainLayout>
      <Flex justifyContent={"right"} background={bgColor}>
        <Flex
          width={"97%"}
          css={css`
            @media (max-width: 768px) {
              flex-direction: column;
            }

            @media (min-width: 769px) {
              flex-direction: row;
            }
          `}
<<<<<<< HEAD
          color={colorMode === "dark" ? "white" : "dark"}
=======
          color="white"
>>>>>>> origin/feature/gql-implementation
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
<<<<<<< HEAD
                <VideoPlayer />
                <Box>
                  <Flex flexDirection={"column"} bgColor={bgColor}>
                    <Box bgColor={bgColor}>
                    <Title getVideo={getVideo} bgColor={bgColor} colorMode={colorMode} />
                      {videoSelected && (
                        <Tags getVideo={videoSelected} bgColor={bgColor} colorMode={colorMode}/>
                      )}
=======
                {getVideo && <VideoPlayer getVideo={getVideo} />}

                <Box>
                  <Flex flexDirection={"column"}>
                    <Box>
                      <Title getVideo={getVideo} />
                      {videoSelected && <Tags getVideo={videoSelected} />}
>>>>>>> origin/feature/gql-implementation
                    </Box>
                    <Flex
                      justifyContent={"space-between"}
                      marginTop="1rem"
                      bgColor={bgColor}
                    >
                      <Profile profile={profile} getVideo={getVideo} bgColor={bgColor} colorMode={colorMode} />
                      <Reactions />
                    </Flex>
                  </Flex>
                </Box>
              </Box>
            </Box>
            {/* community and profile comps  */}
            <Box
              marginBottom={"30px"}
              borderRadius={4}
              boxShadow="base"
              mr={2}
              flex="1"
            >
              <Profile profile={profile} getVideo={getVideo} bgColor={bgColor} colorMode={colorMode} />
            </Box>

            <Box
              marginBottom={"30px"}
              borderRadius={4}
              boxShadow="base"
              mr={2}
              flex="1"
              >
              <Community bgColor={bgColor} colorMode={colorMode} />
            </Box>

<<<<<<< HEAD
            <Box borderRadius={4} boxShadow="base" mr={2} flex="1" bg={bgColor}>
              {/* published or about components */}
              <About  getVideo={getVideo} bgColor={bgColor} colorMode={colorMode} />
            </Box>
            <Box>
              {/* comment */}
              <Comment bgColor={bgColor} colorMode={colorMode} />
            </Box>
          </Box>
          <Box
            w={{ base: "100%", md: "33%", lg: "33%" }}
            bg={bgColor}
            color={colorMode === "dark" ? "white" : "black"}
            marginTop="15px"
            borderRadius={4}
            boxShadow="base"
            marginLeft={"10px"}
            paddingTop="10px"
            paddingX={"10px"}
          >
            <Box margin={"15px"}>
              <Text
                as="h2"
                fontWeight={"bolder"}
                lineHeight="1.2"
                fontSize={"1.5rem"}
              >
                Suggested video you may like
              </Text>
            </Box>
            <Grid
              display={{
                base: "inline-table",
                md: "inline-table",
                lg: "inline-table",
              }}
              templateColumns="repeat(1, 1fr)"
              gap={2}
            >
              <GridItem
                marginTop={"1px !important"}
                mx={4}
                w="100%"
                h="10"
                bg={bgColor}
                color={colorMode === "dark" ? "white" : "black"}
              >
                <Video
                  number_views="23"
                  videoSrc="https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVcJpKJDN8sx7ZjXNkfrVDtAkjdi59a6bGJtSa9MJdsqxYnqALaV6iRcMCMd5TL4RfZMhnbb6e?format=jpeg&mode=cover&width=340&height=191"
                  bgcolor={bgColor}
                  colorMode={colorMode}
                />
                <Video
                  number_views="11"
                  videoSrc="https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVim5xXXBHudVXW7uT6ErgMsQHTXm2ELwa6JxMMvR1j9aYic2jgGRz4wcXHkeUnAJM5CWiwria?format=jpeg&mode=cover&width=340&height=191"
                  bgcolor={bgColor}
                  colorMode={colorMode}
                />
                <Video
                  number_views="66"
                  videoSrc="https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVhcN63NCz569HVsSov72VRbsEsSxSrf7JQJBhpsDNxyNfNKrnmLNvLJCfNaX26VjPcZpap3f4?format=jpeg&mode=cover&width=340&height=191"
                  bgcolor={bgColor}
                  colorMode={colorMode}
                />
                <Video
                  number_views="200"
                  videoSrc="https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVeUsu1qEtX9RpZ8NAWnhCRjimECuPV5shWf4r96HKR9u7G1CQv26vfFSDsFs8k41YwWaDDg6J?format=jpeg&mode=cover&width=340&height=191"
                  bgcolor={bgColor}
                  colorMode={colorMode}
                />
                <Video
                  number_views="4"
                  videoSrc="https://images.hive.blog/p/eAyTuXc4toTXvjczQpXyRFR18E7ALGyK7bKRqmpLVRT2K6Dw3vqp1HBU47x9jcw8bRw8xadHDYJ?format=jpeg&mode=cover&width=340&height=191"
                  bgcolor={bgColor}
                  colorMode={colorMode}
                />
                <Video
                  number_views="1"
                  videoSrc="https://images.hive.blog/p/eAyTuXc4toTXvjczQpXyRFR18E7ALGyK7gdoY79fNxSmJmDgPua44kR8BdATGS4C3NTPtF7Swv6?format=jpeg&mode=cover&width=340&height=191"
                  bgcolor={bgColor}
                  colorMode={colorMode}
                />
                <Video
                  number_views="6"
                  videoSrc="https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVbGs8rF69qxxfW7SdHLkQcmo3YEiD4agxV19oco2hcKTPS49UMjd93Xc8X8yvLreZtFoEEgr2?format=jpeg&mode=cover&width=340&height=191"
                  bgcolor={bgColor}
                  colorMode={colorMode}
                />
              </GridItem>
            </Grid>
            <Box margin={"15px"} marginTop="35px">
              <Text
                as="h2"
                fontWeight={"bolder"}
                lineHeight="1.2"
                fontSize={"1.5rem"}
              >
                More from (username)
              </Text>
              <Text
                padding={"15px"}
                background="black"
                borderRadius={"10px"}
                color="white"
              >
                (username) has no more videos yet.
              </Text>
            </Box>
          </Box>
=======
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
>>>>>>> origin/feature/gql-implementation
        </Flex>
      </Flex>
    </MainLayout>
  );
}
