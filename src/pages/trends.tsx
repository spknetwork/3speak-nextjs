import VideosTitle from "@/components/VideosTitle";
import Name from "@/components/user/Name";
import { Box, Flex, Grid, GridItem, Image, Switch, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { TRENDING_FEED } from "../graphql/queries";
import { VideoInterface } from "types";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import MainLayout from "@/components/Layouts/main_layout";
const NewComers2 = () => {
  const { loading, error, data } = useQuery(TRENDING_FEED);
  const bgColor = useColorModeValue('gray.100', 'gray.800');
  const { colorMode, toggleColorMode } = useColorMode();

  const [videos, setVideos] = useState<VideoInterface[]>([]);

  useEffect(() => {
    if (!loading && !error && data) {
      setVideos(
        data.feed.items
          .filter((e: any) => !!e.spkvideo)
          .map((e: any) => {
            console.log(e);
            return {
              title: e.title,
              username: e.author.username,
              thumbnail: e.spkvideo.thumbnail_url,
            };
          })
      );
    }
  }, [loading, data, error]);

  return (
    <MainLayout>
      <Box bg={bgColor}>
        <Flex marginRight={'30px'} justifyContent={'space-between'} alignItems='center'>
          <Box padding="20px">
            <Text as="h1" fontWeight={"300 !important"}>
              TRENDING VIDEOS
            </Text>
          </Box>
          <Text>
            <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} /> {colorMode === 'dark' && (<MoonIcon />)} {colorMode !== 'dark' && (<SunIcon />)}
          </Text>

        </Flex>
        <Grid
          padding={"20px"}
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(2, 1fr)",
            xl: "repeat(5, 1fr)",
          }}
          gap={10}
        >
          {/* {videos.length} */}
          {!loading &&
            !error &&
            videos.map((video: VideoInterface, index: number) => (
              <GridItem w="100%" h="100%" key={index}>
                <Box height="13em !important"
                  width="100% !important">

                  <Image
                    height="13em !important"
                    width="100% !important"
                    borderRadius={'10px'}
                    objectFit="cover"
                    alt="test"
                    src={`${video.thumbnail}`}
                  />
                </Box>

                <VideosTitle title={`${video.title}`} />
                <Name username={`${video.username}`} />
                <Text as="p" margin={"1px"}>
                  a day ago
                </Text>
                <Text fontWeight={"bold"} as="p">
                  $ 10.10
                </Text>
              </GridItem>
            ))}
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default NewComers2;
