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

import { useQuery } from "@apollo/client";
import { GET_TRENDING_FEED } from "../graphql/queries";
import FeedGrid from "../components/feedgrid/FeedGrid";

const IndexPage = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const { colorMode, toggleColorMode } = useColorMode();
  const getTrendingFeed = useQuery(GET_TRENDING_FEED, { ssr: false });

  return (
    <MainLayout>
      <Box bg={bgColor} pt={8}>
        <Flex
          marginRight={"30px"}
          justifyContent={"space-between"}
          alignItems="center"
        >
        </Flex>
        {getTrendingFeed.loading ? (
          <Flex justifyContent={"center"} alignItems={"center"} h="90vh">
            <InfinitySpin width="200" color="#6DC5D7" />
          </Flex>
        ) : (
          <FeedGrid
            videos={getTrendingFeed.data.trendingFeed.items}
            bgColor={bgColor}
            colorMode={colorMode}
          />
        )}
      </Box>
    </MainLayout>
  );
};

export default IndexPage;
