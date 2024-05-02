import {
  Box,
  Flex,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { InfinitySpin } from "react-loader-spinner";
import MainLayout from "@/components/Layouts/main_layout";

import { useQuery } from "@apollo/react-hooks";
import { GET_TRENDING_FEED } from "../graphql/queries";

import FeedGrid from "../components/feedgrid/FeedGrid";

const TrendingPage = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const { colorMode, toggleColorMode } = useColorMode();
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
              Trending Content
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
          <InfinitySpin width="200" color="#6DC5D7" />
        ) : (
          <FeedGrid videos={getTrendingFeed.data.trendingFeed.items} />
        )}
      </Box>
    </MainLayout>
  );
};

export default TrendingPage;