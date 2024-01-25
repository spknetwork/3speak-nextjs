import VideosTitle from "@/components/VideosTitle";
import Name from "@/components/user/Name";
import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { FIRST_UPLOAD_FEED } from "../graphql/queries";
import { VideoInterface } from "types";
const FirstTime = () => {
  const { loading, error, data } = useQuery(FIRST_UPLOAD_FEED);

  const [videos, setVideos] = useState<VideoInterface[]>([]);

  useEffect(() => {
    if (!loading && !error && data) {
      setVideos(
        data.feed.items
          .filter((e:any) => !!e.spkvideo)
          .map((e:any) => {
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
    <Box>
      <Box backgroundColor={"#E8E8E8"} padding="20px">
        <Text as="h1" fontWeight={"300 !important"}>
          FIRST TIME UPLOADS
        </Text>
      </Box>
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
        {!loading &&
          !error &&
          videos.map((video:VideoInterface, index:number) => (
            <GridItem w="100%" h="100%" key={index}>
            <Box  height="13em !important"
                  width="100% !important">
                     {/* backgroundColor={"#222 !important"} */}
                <Image
                  padding={"5px"}
                  height="13em !important"
                  width="100% !important"
                  borderRadius={'10px'}
                  alt="test"
                  src={`${video?.thumbnail}`}
                 
                  objectFit="cover"
                />
              </Box>
              
              <VideosTitle title={`${video?.title}`} />
              <Name username={`${video?.username}`} />
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
  );
};

export default FirstTime;
