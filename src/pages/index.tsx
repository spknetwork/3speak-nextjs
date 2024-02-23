import VideosTitle from "@/components/VideosTitle";
import Name from "@/components/user/Name";
import { Box, Flex, Grid, GridItem, Image, Switch, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { VideoInterface } from "types";
import { MdPlayArrow } from "react-icons/md";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { css } from "@emotion/react";
import { Sidebar } from "@/components";
import MainLayout from "@/components/Layouts/main_layout";
import { videoData } from "./constData";
const NewIndex = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('black', 'white');
  const { colorMode, toggleColorMode } = useColorMode();
  const [videos, setVideos] = useState<VideoInterface[]>(videoData);
  return (

    <MainLayout>

      <Box bg={bgColor} >

        <Flex marginRight={'30px'} justifyContent={'space-between'} alignItems='center'>
          <Box padding="20px">
            <Text as="h1" fontWeight={"300 !important"}>
              &nbsp;
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
          }} gap={10}
        >
          {/* {videos.length} */}
          {videos.map((video: VideoInterface, index: number) => (
            <GridItem w="100%" h="100%" key={index}>
              <Box cursor={'pointer'} position='relative'>
                <Box
                  display={'flex'}
                  justifyContent='center'
                  alignItems={'center'}
                  position={"absolute"}
                  bottom="5px"
                  color={"#000"}
                  fontSize="11px"
                  fontWeight={"500"}
                  left="5px"
                  background={"none 0px 0px repeat scroll rgb(232, 232, 232)"}
                  borderRadius="2px"
                  paddingLeft={"4px"}
                  paddingRight={"8px"}
                >
                  <MdPlayArrow size='15px' color="grey" />
                  <Text as='span' marginLeft={'2px'} fontSize='11px' fontWeight={'bold'}>{video.number_views}</Text>
                </Box>
                <Box
                  position={"absolute"}
                  bottom="5px"
                  color={"#000"}
                  fontSize="11px"
                  fontWeight={"bold"}
                  right="5px"
                  background={"none 0px 0px repeat scroll rgb(232, 232, 232)"}
                  borderRadius="2px"
                  padding={"0px 6px"}
                >
                  01:19
                </Box>
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

export default NewIndex;
