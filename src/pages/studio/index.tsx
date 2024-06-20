//TODO: fixing this page
"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useAppStore } from "../../lib/store";
import { useRouter } from "next/router";

import {
  Box,
  Flex,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Heading,
  Card,
  CardBody,
  SimpleGrid,
  CardHeader,
  useColorMode,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { FaRegEye, FaUsers, FaVideo } from "react-icons/fa";
import { News } from "@/lib/slices/createStudioSlice";
import SidebarContent from "@/components/studio_sidebar/StudioSidebar";
import MobileNav from "@/components/studio_mobilenav/StudioMobileNav";
import { useAuth } from "@/hooks/auth";
import { useGetMyQuery } from "../../hooks/getUserDetails";

export default function StudioPage({ children }: { children: ReactNode }) {
  const { news, video_count, followers_count, views_count } = useAppStore();
  const [mNews, setMNews] = useState<News[]>([]);
  const [mVideoCount, setMVideoCount] = useState<Number>(0);
  const [mFollowersCount, setMFollowersCount] = useState<Number>();
  const [mViewsCount, setMViewsCount] = useState<Number>();

  const router = useRouter();
  const { authenticated } = useAuth() ?? {};

  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");

  const getUserDetails = useGetMyQuery();
  const username = getUserDetails?.profile?.username;

  // get the list of news
  useEffect(() => {
    setMNews(news);
  }, [news]);

  // get total videos
  useEffect(() => {
    setMVideoCount(video_count);
  }, [video_count]);

  // get total followers
  useEffect(() => {
    setMFollowersCount(followers_count);
  }, [followers_count]);

  // get total views count
  useEffect(() => {
    setMViewsCount(views_count);
  }, [views_count]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (authenticated === null) {
    return <Box>Loading...</Box>;
  }

  if (authenticated === false) {
    router.push("/auth/modals");
  }

  return (
    <Box minH="100vh" bg={bgColor}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        bgColor={bgColor}
        colorMode={colorMode}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent
            onClose={onClose}
            bgColor={bgColor}
            colorMode={colorMode}
          />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} bgColor={bgColor} colorMode={colorMode} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
        <Box paddingLeft={"1.5rem"} paddingRight="1.5rem">
          <Flex
            marginBottom={"1.5rem"}
            justifyContent={"space-between"}
            alignItems="center"
          >
            {/* for title */}
            <Text
              as={"h1"}
              textTransform="capitalize"
              fontSize={"1.75rem"}
              color="#5a5c69 !important"
              fontWeight={"400 !important"}
              lineHeight="1.2"
            >
              Dashboard
            </Text>

            <Text
              as={"h3"}
              textTransform="inherit"
              fontSize={"1.75rem"}
              color="#5a5c69 !important"
              fontWeight={"400 !important"}
              lineHeight="1.2"
            >
              Welcome back {username}!
            </Text>
          </Flex>
          <Box
            display={"flex"}
            flexWrap="wrap"
            flexDirection={{ sm: "column", md: "column", lg: "row" }}
          >
            {/* for 3 cards */}
            <Box
              width={"100%"}
              position="relative"
              paddingRight={"0.75rem"}
              paddingLeft={"0.75rem"}
              flex={"0 0 33.33333%"}
              marginTop=".5rem !important"
              maxWidth={{ sm: "100%", md: "100%", lg: "33.33333%" }}
            >
              <Card
                borderLeft={"0.25rem solid #4e73df !important"}
                paddingBottom="0.5rem !important"
                paddingTop={"0.5rem !important"}
                boxShadow="0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important"
              >
                <CardBody>
                  <Flex flexWrap={"wrap"} alignItems="center">
                    <Box
                      width={"100%"}
                      marginRight="0.5rem !important"
                      flexBasis={"0"}
                      flexGrow="1"
                      maxWidth={"100%"}
                    >
                      <Text
                        fontSize={".7rem"}
                        color="#4e73df !important"
                        fontWeight={"700 !important"}
                        // textTransform="uppercase !important"
                        marginBottom={"0.25rem !important"}
                      >
                        Uploaded Videos
                      </Text>
                      <Text
                        as={"h5"}
                        color="#5a5c69 !important"
                        fontWeight={"700 !important"}
                        marginBottom="0 !important"
                        fontSize={"1.25rem"}
                        lineHeight="1.2"
                      >
                        <>{mVideoCount}</>
                      </Text>
                    </Box>
                    <Box width={"auto"} flex="0 0 auto" maxWidth={"100%"}>
                      <FaVideo
                        color="#dddfeb !important"
                        fontWeight={"900"}
                        fontSize="2em"
                      />
                    </Box>
                  </Flex>
                </CardBody>
              </Card>
            </Box>

            <Box
              width={"100%"}
              position="relative"
              paddingRight={"0.75rem"}
              paddingLeft={"0.75rem"}
              flex={"0 0 33.33333%"}
              marginTop=".5rem !important"
              maxWidth={{ sm: "100%", md: "100%", lg: "33.33333%" }}
            >
              {/* <Box
                borderLeft={"0.25rem solid #4e73df !important"}
                paddingBottom="0.5rem !important"
                paddingTop={"0.5rem !important"}
                boxShadow="0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important"

              ></Box> */}
              <Card
                borderLeft={"0.25rem solid #1cc88a !important"}
                paddingBottom="0.5rem !important"
                paddingTop={"0.5rem !important"}
                boxShadow="0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important"
              >
                <CardBody>
                  <Flex flexWrap={"wrap"} alignItems="center">
                    <Box
                      width={"100%"}
                      marginRight="0.5rem !important"
                      flexBasis={"0"}
                      flexGrow="1"
                      maxWidth={"100%"}
                    >
                      <Text
                        fontSize={".7rem"}
                        color="#4e73df !important"
                        fontWeight={"700 !important"}
                        // textTransform="uppercase !important"
                        marginBottom={"0.25rem !important"}
                      >
                        Follower
                      </Text>
                      <Text
                        as={"h5"}
                        color="#5a5c69 !important"
                        fontWeight={"700 !important"}
                        marginBottom="0 !important"
                        fontSize={"1.25rem"}
                        lineHeight="1.2"
                      >
                        <>{mFollowersCount}</>
                      </Text>
                    </Box>
                    <Box width={"auto"} flex="0 0 auto" maxWidth={"100%"}>
                      <FaUsers
                        color="#dddfeb !important"
                        fontWeight={"900"}
                        fontSize="2em"
                      />
                    </Box>
                  </Flex>
                </CardBody>
              </Card>
            </Box>
            <Box
              width={"100%"}
              position="relative"
              paddingRight={"0.75rem"}
              paddingLeft={"0.75rem"}
              flex={"0 0 33.33333%"}
              marginTop=".5rem !important"
              maxWidth={{ sm: "100%", md: "100%", lg: "33.33333%" }}
            >
              {/* <Box
                borderLeft={"0.25rem solid #4e73df !important"}
                paddingBottom="0.5rem !important"
                paddingTop={"0.5rem !important"}
                boxShadow="0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important"

              ></Box> */}
              <Card
                borderLeft={"0.25rem solid #36b9cc !important"}
                paddingBottom="0.5rem !important"
                paddingTop={"0.5rem !important"}
                boxShadow="0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important"
              >
                <CardBody>
                  <Flex flexWrap={"wrap"} alignItems="center">
                    <Box
                      width={"100%"}
                      marginRight="0.5rem !important"
                      flexBasis={"0"}
                      flexGrow="1"
                      maxWidth={"100%"}
                    >
                      <Text
                        fontSize={".7rem"}
                        color="#4e73df !important"
                        fontWeight={"700 !important"}
                        // textTransform="uppercase !important"
                        marginBottom={"0.25rem !important"}
                      >
                        Views
                      </Text>
                      <Text
                        as={"h5"}
                        color="#5a5c69 !important"
                        fontWeight={"700 !important"}
                        marginBottom="0 !important"
                        fontSize={"1.25rem"}
                        lineHeight="1.2"
                      >
                        <>{mViewsCount}</>
                      </Text>
                    </Box>
                    <Box width={"auto"} flex="0 0 auto" maxWidth={"100%"}>
                      <FaRegEye
                        color="#dddfeb !important"
                        fontWeight={"900"}
                        fontSize="2em"
                      />
                    </Box>
                  </Flex>
                </CardBody>
              </Card>
            </Box>
          </Box>
          <Box marginTop={"3%"}>
            <SimpleGrid columns={{ sm: 1, md: 1, lg: 2 }} spacing={10}>
              <Box>
                <Card>
                  <CardHeader
                    padding={"0.75rem 1.25rem"}
                    backgroundColor="#f8f9fc"
                    borderBottom={"1px solid #e3e6f0"}
                    paddingTop="1rem !important"
                    paddingBottom={"1rem !important"}
                    borderRadius="calc(0.35rem - 1px) calc(0.35rem - 1px) 0 0"
                  >
                    <Heading
                      size="md"
                      color={"#4e73df !important"}
                      fontWeight="700 !important"
                      fontSize={"1rem"}
                      lineHeight="1.2"
                    >
                      News
                    </Heading>
                  </CardHeader>

                  <CardBody flex={"1 1 auto"} padding="1.25rem">
                    {mNews?.map((news, index) => (
                      <Box key={index}>
                        <Card
                          key={index}
                          marginTop={"4%"}
                          position="relative"
                          wordBreak="break-word"
                          backgroundClip={"border-box"}
                          border="1px solid #e3e6f0"
                          borderRadius={"0.35rem"}
                        >
                          <CardBody display={"flex"} flexDirection={"column"}>
                            <Link
                              color={"#4e73df"}
                              textDecoration="none"
                              backgroundColor={"transparent"}
                            >
                              <Text
                                as={"h4"}
                                marginBottom="0.5rem"
                                fontWeight={"400"}
                                lineHeight="1.2"
                                fontSize={"1.5rem"}
                              >
                                {news.title}
                              </Text>
                            </Link>
                            <Text textAlign={"left"} as={"small"}>
                              {news.description}
                            </Text>
                          </CardBody>
                        </Card>
                      </Box>
                    ))}
                  </CardBody>
                </Card>
              </Box>
              <Box>
                <Card>
                  <CardHeader
                    padding={"0.75rem 1.25rem"}
                    backgroundColor="#f8f9fc"
                    borderBottom={"1px solid #e3e6f0"}
                    paddingTop="1rem !important"
                    paddingBottom={"1rem !important"}
                    borderRadius="calc(0.35rem - 1px) calc(0.35rem - 1px) 0 0"
                  >
                    <Heading
                      size="md"
                      color={"#4e73df !important"}
                      fontWeight="700 !important"
                      fontSize={"1rem"}
                      lineHeight="1.2"
                    >
                      Twitter Feed
                    </Heading>
                  </CardHeader>

                  <CardBody flex={"1 1 auto"} padding="1.25rem"></CardBody>
                </Card>
              </Box>
            </SimpleGrid>
            {/* for left content and right content */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
