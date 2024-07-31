//TODO: refactor the code in this file today!
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  useColorModeValue,
  Link,
  Text,
  useDisclosure,
  Heading,
  Card,
  CardBody,
  SimpleGrid,
  CardHeader,
  useColorMode,
} from "@chakra-ui/react";
import Nav from "./components/indexComponents/Nav";
import Title from "./components/indexComponents/Title";
import UpperCards from "./components/indexComponents/UpperCards";
import NewsComponent from "./components/indexComponents/NewsComponent";
import TwitterFeed from "./components/indexComponents/TwitterFeed"
import { useAuth } from "@/hooks/auth";
import { useGetMyQuery } from "../../hooks/getUserDetails";

export default function StudioPage({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { authenticated } = useAuth() ?? {};

  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");

  const getUserDetails = useGetMyQuery();
  const username = getUserDetails?.profile?.username;

  useEffect(() => {
    if (authenticated === false && authenticated != null) {
      router.push("/auth/modals");
    }
  }, [authenticated, router]);

  if (authenticated === null) {
    return <Box> Loading ..</Box>;
  }

  return (
    <Box minH="100vh" bg={bgColor}>
      {/* import Nav Component  */}
      <Nav />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
        <Box paddingLeft={"1.5rem"} paddingRight="1.5rem">
          {/* imported the title component  */}
          <Title username={username} />
          {/* for 3 cards */}
          <UpperCards />
          <Box marginTop={"3%"}>
            <SimpleGrid columns={{ sm: 1, md: 1, lg: 2 }} spacing={10}>
              <NewsComponent />
              <TwitterFeed />
            </SimpleGrid>
            {/* for left content and right content */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
