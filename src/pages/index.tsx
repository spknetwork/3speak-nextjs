import {
  Box,
  Flex,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { VideoInterface } from "types";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { css } from "@emotion/react";
import { Sidebar } from "@/components";
import MainLayout from "@/components/Layouts/main_layout";
import { videoData } from "../data/constData";

import { useQuery } from "@apollo/react-hooks";
import { GET_TRENDING_FEED } from "../graphql/queries";

import FeedGrid from "../components/feedgrid/FeedGrid";

const NewIndex = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const { colorMode, toggleColorMode } = useColorMode();
  const [videos, setVideos] = useState<VideoInterface[]>(videoData);
  const getTrendingFeed = useQuery(GET_TRENDING_FEED);

  return (
    <MainLayout>
      <Box bg={bgColor}>
        <Flex
          marginRight={"30px"}
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Box padding="20px">
            <Text as="h1" fontWeight={"300 !important"}>
              &nbsp;
            </Text>
          </Box>
          <Text>
            <Switch
              isChecked={colorMode === "dark"}
              onChange={toggleColorMode}
            />{" "}
            {colorMode === "dark" && <MoonIcon />}{" "}
            {colorMode !== "dark" && <SunIcon />}
          </Text>
        </Flex>
        {getTrendingFeed.loading ? (
          <h1>&nbsp;</h1>
        ) : (
          <FeedGrid videos={getTrendingFeed.data.trendingFeed.items} />
        )}
      </Box>
    </MainLayout>
  );
};

export default NewIndex;
