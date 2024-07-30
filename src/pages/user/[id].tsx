//TODO: work on this page for the user details
import MainLayout from "@/components/Layouts/main_layout";
import About from "@/components/user/About";
import Achievements from "@/components/user/Achievements";
import Earnings from "@/components/user/Earnings";
import Livestream from "@/components/user/Livestream";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  ListItem,
  Text,
  UnorderedList,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { BiDollar } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";
import { VideoInterface } from "types";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  GET_PROFILE,
  GET_RELATED,
  GET_SOCIAL_POST,
  GET_SOCIAL_FEED_BY_CREATOR,
} from "@/graphql/queries";
import FeedGridItem from "@/components/feedgrid/FeedGridItem";
import Video from "@/components/feedgrid/FeedGrid";
import FeedGrid from "@/components/feedgrid/FeedGrid";
import { InfinitySpin } from "react-loader-spinner";


const UserPage = () => {
  const router = useRouter();
  const author = router.query.id as string;

  //get the user videos
  const getMyDetails = useQuery(GET_PROFILE, {
    variables: { id: author },
  });

  const getVideoData = useQuery(GET_SOCIAL_FEED_BY_CREATOR, {
    variables: { id: author },
  });

  const getUserVideos: VideoInterface[]  = getVideoData?.data?.socialFeed?.items;

  console.log("get my videos", getUserVideos);

  const [showFeed, setShowFeed] = useState<number>(1);
  const isMobile = useMediaQuery({ query: "(max-width: 1023px)" });
  const [showNav, setShowNav] = useState(true);
  const updateShowFeed = (number: number) => {
    setShowFeed(number);
  };

  useEffect(() => {
    ``;
    console.log("isMobile", isMobile);
    if (isMobile) {
      setShowNav(true);
      console.log("showNav", showNav);
    } else {
      setShowNav(false);
      console.log("showNav", showNav);
    }
  }, [isMobile, showNav]);

  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <MainLayout>
      <Box backgroundColor={bgColor}>
        <Box minHeight={"280px"} position={"relative"} bgColor={bgColor}>
            {/* TODO: What we have for cover image */}
          <Flex
            w={"full"}
            h={"32vh"}
            backgroundColor={"red"}
            backgroundImage="url('https://marketplace.canva.com/EAFEUwUPzkY/1/0/1600w/canva-black-modern-vlogger-youtube-banner-voJxGX5HW3Q.jpg')"
            backgroundSize={"cover"}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
          ></Flex>
          <Flex
            bottom={"0"}
            left="0"
            right={"0"}
            position="absolute"
            alignItems={"end"}
            padding="1rem 30px"
            justifyContent={{ base: "center", md: "center", lg: "start" }}
          >
            <Image
              alt="image"
              background={"#fff none repeat scroll 0 0"}
              src={`https://images.hive.blog/u/${author}/avatar`}
              border={"2px solid #fff"}
              borderRadius="50px"
              height={"90px"}
              width="90px"
            />
            <Link
              textDecoration={"none"}
              backgroundColor="transparent"
              transition={"all 0.2s"}
            >
              <Image
                alt="image"
                src="/images/rss.webp"
                width={"26px !important"}
                marginLeft="5px !important"
                height={"26px !important"}
                verticalAlign="bottom !important"
                border={"1px solid #fff !important"}
                borderRadius="10% !important"
                background={"rgba(255,255,255,.7) !important"}
                padding="2px !important"
              />
            </Link>
          </Flex>
        </Box>
        <Box
          padding={"0 0px "}
          boxShadow={
            colorMode === "dark" ? "0 0 1px black" : "0 0 11px #ececec"
          }
          background={"#fff none repeat scroll 0 0!important"}
        >
          {/* nav */}
          <Box
            padding={"10px"}
            paddingRight="0px"
            boxShadow="0 1px 2px transparent!important"
            border={"none"}
            display="flex"
            justifyContent={"flex-start"}
            alignItems="center"
            position={"relative"}
            flexFlow="row nowrap"
            flexDirection={{ base: "column", md: "column", lg: "row" }}
            bgColor={bgColor}
            color={colorMode === "dark" ? "whitesmoke" : "black"}
          >
            {/* flexDirection={{base:"column", md: "column", lg:"row"}} */}
            <Flex
              css={css`
                @media (max-width: 1023px) {
                  justify-content: space-between;
                  flex-direction: row;
                  align-items: center;
                }

                @media (min-width: 1024px) {
                  justify-content: start;
                  flex-direction: row;
                  align-items: center;
                }
              `}
              width="100%"
            >
              <Link
                href="#"
                fontSize={"16px"}
                fontWeight="700"
                transition={"all 0.2s"}
                backgroundColor="transparent"
                textDecoration={"none !important"}
              >
                {author}
              </Link>
              {isMobile && (
                <Button
                  variant={"ghost"}
                  onClick={() => setShowNav(!showNav)}
                  colorScheme="black"
                >
                  <HamburgerIcon boxSize={"3rem"} />
                </Button>
              )}
              {!isMobile && (
                <Box marginLeft={"10px"}>
                  {/* marginRight="auto !important" */}
                  <UnorderedList
                    width={"100%"}
                    listStyleType={"none"}
                    paddingLeft="0"
                    display={"flex"}
                    justifyContent={{ base: "start", md: "start", lg: "start" }}
                    marginBottom={"0px"}
                    marginLeft={{ base: "0px", md: "0px" }}
                    flexDirection={{ base: "column", md: "column", lg: "row" }}
                  >
                    <ListItem>
                      <Link
                        href="#"
                        _hover={{
                          // borderBottom: "2px solid red",npm i react-go   s
                          color: `${
                            colorMode === "dark" ? "whitesmoke" : "black"
                          }`,
                          backgroundColor: "#4a5568",
                        }}
                        _focus={{
                          // borderBottom: "2px solid red",
                          color: `${"white"} `,
                        }}
                        color={colorMode === "dark" ? "whitesmoke" : "black"}
                        borderColor={"red"}
                        textDecoration="none"
                        borderBottom={showFeed == 1 ? "2px solid red" : ""}
                        display={"block"}
                        margin="0 7px"
                        padding={"14px 7px"}
                        borderRadius={"10px 10px 0px 0px"}
                        onClick={() => updateShowFeed(1)}
                      >
                        Videos
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link
                        href="#"
                        _hover={{
                          // borderBottom: "2px solid red",npm i react-mentions
                          color: `${
                            colorMode === "dark" ? "whitesmoke" : "black"
                          }`,
                          backgroundColor: "#4a5568",
                        }}
                        _focus={{
                          // borderBottom: "2px solid red",
                          color: `${"white"} `,
                        }}
                        color={colorMode === "dark" ? "whitesmoke" : "black"}
                        borderColor={"red"}
                        textDecoration="none"
                        borderBottom={showFeed == 1 ? "2px solid red" : ""}
                        display={"block"}
                        margin="0 7px"
                        padding={"14px 7px"}
                        borderRadius={"10px 10px 0px 0px"}
                        onClick={() => updateShowFeed(3)}
                      >
                        About
                      </Link>
                    </ListItem>
                  </UnorderedList>
                </Box>
              )}
            </Flex>
            {!showNav && (
              <Box
                display={"flex"}
                flexBasis="auto"
                flexGrow={"1"}
                alignItems="center"
                width={{ base: "100%", md: "100%" }}
                flexDirection={{ base: "column", md: "column", lg: "row" }}
              >
                {isMobile && (
                  <Box
                    width={"100%"}
                    paddingLeft="0"
                    display={"flex"}
                    justifyContent={{ base: "start", md: "start", lg: "start" }}
                    marginBottom={"0px"}
                    marginLeft={{ base: "0px", md: "0px" }}
                    flexDirection={{ base: "column", md: "column", lg: "row" }}
                  >
                    {/* marginRight="auto !important" */}
                    <UnorderedList
                      width={"100%"}
                      listStyleType={"none"}
                      paddingLeft="0"
                      display={"flex"}
                      justifyContent={{
                        base: "start",
                        md: "start",
                        lg: "start",
                      }}
                      marginBottom={"0px"}
                      marginLeft={{ base: "0px", md: "0px" }}
                      flexDirection={{
                        base: "column",
                        md: "column",
                        lg: "row",
                      }}
                    >
                      <ListItem>
                        <Link
                          href="#"
                          _hover={{
                            borderBottom: "2px solid red",
                            color: `${"black"} `,
                          }}
                          _focus={{
                            color: `${"black"} `,
                          }}
                          color={showFeed == 1 ? "black" : "rgba(0,0,0,0.7)"}
                          borderColor={"red"}
                          textDecoration="none"
                          borderBottom={showFeed == 1 ? "2px solid red" : ""}
                          display={"block"}
                          margin="0 7px"
                          padding={"14px 0 !important"}
                          onClick={() => updateShowFeed(1)}
                        >
                          Videos
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link
                          href="#"
                          _hover={{
                            borderBottom: "2px solid red",
                            color: `${"black"} `,
                          }}
                          _focus={{
                            color: `${"black"} `,
                          }}
                          color={showFeed == 2 ? "black" : "rgba(0,0,0,0.7)"}
                          borderColor={"red"}
                          textDecoration="none"
                          borderBottom={showFeed == 2 ? "2px solid red" : ""}
                          display={"block"}
                          margin="0 7px"
                          padding={"14px 0 !important"}
                          onClick={() => updateShowFeed(2)}
                        >
                          Earnings
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link
                          href="#"
                          _hover={{
                            borderBottom: "2px solid red",
                            color: `${"black"} `,
                          }}
                          _focus={{
                            color: `${"black"} `,
                          }}
                          color={showFeed == 3 ? "black" : "rgba(0,0,0,0.7)"}
                          borderColor={"red"}
                          textDecoration="none"
                          borderBottom={showFeed == 3 ? "2px solid red" : ""}
                          display={"block"}
                          margin="0 7px"
                          padding={"14px 0 !important"}
                          onClick={() => updateShowFeed(3)}
                        >
                          About
                        </Link>
                      </ListItem>

                      <ListItem>
                        <Link
                          href="#"
                          _hover={{
                            borderBottom: "2px solid red",
                            color: `${"black"} `,
                          }}
                          _focus={{
                            color: `${"black"} `,
                          }}
                          color={showFeed == 5 ? "black" : "rgba(0,0,0,0.7)"}
                          borderColor={"red"}
                          textDecoration="none"
                          borderBottom={showFeed == 5 ? "2px solid red" : ""}
                          display={"block"}
                          margin="0 7px"
                          padding={"14px 0 !important"}
                          onClick={() => updateShowFeed(5)}
                        >
                          Achievements
                        </Link>
                      </ListItem>
                    </UnorderedList>
                  </Box>
                )}
                <Box
                  marginRight={{ base: "0px", md: "0px", lg: "10px" }}
                  display={"flex"}
                  justifyContent={{ base: "start", md: "start", lg: "end" }}
                  width={{ base: "100%", md: "100%" }}
                >
                  <Button
                    textTransform={"uppercase"}
                    border="none"
                    backgroundColor={
                      colorMode === "dark" ? "#4a5568" : "#D3D3D3"
                    }
                    color={colorMode === "dark" ? "white" : "black"}
                    boxShadow={
                      colorMode === "dark"
                        ? "0  1px 4px black"
                        : "0 1px 4px white"
                    }
                    transition="all 0.4s"
                    variant={"outline"}
                    colorScheme="white"
                    fontWeight={"100"}
                  >
                    Follow{" "}
                    <Text margin={"0px"} marginLeft="5px" fontWeight={"bold"}>
                      66.5k
                    </Text>
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
        <Flex padding={"15px"} justifyContent={"center"}>
          <Flex justifyContent="center">
            <Flex className="row" justifyContent={"center"}>
              {showFeed == 2 && <Earnings />}
              {showFeed == 3 && (
                // <About profile={} />
                <p>test</p>
              )}
              {showFeed == 4 && <Livestream />}
              {showFeed == 5 && <Achievements />}
              {showFeed == 1 && (
                getVideoData.loading ? (
                    <Flex justifyContent={"center"} alignItems={"center"} h="70vh">
                    <InfinitySpin width="200" color="#6DC5D7" />
                  </Flex>
                ) : (
                <FeedGrid
                  videos={getUserVideos}
                  bgColor={bgColor}
                  colorMode={colorMode}
                />
              ))}
            
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </MainLayout>
  );
};

export default UserPage;
