
//TODO: fetch the data from the graphql api 
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
import {useQuery} from "@apollo/client";


const UserPage = () => {
    
    //get the user videos 
    const getMyVideos = useQuery()


  const [showFeed, setShowFeed] = useState<number>(1);
  const isMobile = useMediaQuery({ query: "(max-width: 1023px)" });
  const [showNav, setShowNav] = useState(true);
  const updateShowFeed = (number: number) => {
    setShowFeed(number);
  };

  useEffect(() => {
    console.log("isMobile", isMobile);
    if (isMobile) {
      setShowNav(true);
      console.log("showNav", showNav);
    } else {
      setShowNav(false);
      console.log("showNav", showNav);
    }
  }, [isMobile, showNav]);

  const [videos] = useState<VideoInterface[]>([
    {
      thumbnail:
        "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVijsuv81Cu6QUxATfwLCchp7dhexyXdq6vj7hSxy7PKLRNLf5CYPBTwYKRDj6dR95KAhZkjwL?format=jpeg&mode=cover&width=340&height=191",
      title:
        "The Adventure trail of Mount Naupa and Mind2Mind Talk with Lakwatserong Engineer",
      username: "thetrollingmind",
    },
    {
      thumbnail:
        "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVhbe9xjZvwDJDwq34KonBAhp6aDi5QWVMa8GKtBZHpfb4pz88JsvtNudXgZBf9vd4ahzvcP1p?format=jpeg&mode=cover&width=340&height=191",
      title: "Refreshing Communal Ranch in Bukidnon Philippines",
      username: "thetrollingmind",
    },
    {
      thumbnail:
        "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVb4cnggfP19UUoMFibN8JndfBo44LsTNKVZ5tXRYFs7vB9bWocqyN3CFG7xfRFuKAomRBmvQ6?format=jpeg&mode=cover&width=340&height=191",
      title: "Via Crucis at Camari Hill | Lenten Tradition",
      username: "thetrollingmind",
    },
    {
      thumbnail:
        "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVbFQdnkVpujsZq5ivaUS3RobVsvgoUMDXSTgZCHfbwNsgBSuTKvqmnzt9EUtxERKUQ5963fSE?format=jpeg&mode=cover&width=340&height=191",
      title: "Weekend Adventure- to the Mountain of Kan-irag",
      username: "thetrollingmind",
    },
    {
      thumbnail:
        "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVbFQdnkVpujsZq5ivaUS3RobVsvgoUMDXSTgZCHfbwNsgBSuTKvqmnzt9EUtxERKUQ5963fSE?format=jpeg&mode=cover&width=340&height=191",
      title: "Weekend Adventure- to the Mountain of Kan-irag",
      username: "thetrollingmind",
    },
  ]);

  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <MainLayout>
      <Box backgroundColor={bgColor}>
        <Box minHeight={"280px"} position={"relative"} bgColor={bgColor}>
          {/* <Image
            alt="image"
            src={"https://media.3speak.tv/user/thestrollingmind/cover.png"}
            objectFit="cover"
            objectPosition={"center"}
            maxHeight="500px"
            maxWidth={"100%"}
            height="auto"
          /> */}
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
              src="https://images.hive.blog/u/thestrollingmind/avatar"
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
          boxShadow= {colorMode === "dark" ?  "0 0 11px black": "0 0 11px #ececec"}
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
                thestrollingmind
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
                          backgroundColor: "#4a5568"
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
                    {/* <ListItem>
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
                    </ListItem> */}
                    <ListItem>
                      <Link
                        href="#"
                        _hover={{
                          // borderBottom: "2px solid red",npm i react-mentions
                          color: `${
                            colorMode === "dark" ? "whitesmoke" : "black"
                          }`,
                          backgroundColor: "#4a5568"
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

                    {/* <ListItem>
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
                    </ListItem> */}
                  </UnorderedList>
                </Box>
              )}
            </Flex>
            {/* <Link
            href="#"
            fontSize={"16px"}
            fontWeight="700"
            transition={"all 0.2s"}
            backgroundColor="transparent"
            textDecoration={"none !important"}
          >
            thestrollingmind
          </Link> */}
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
                    backgroundColor={"#4a5568"}
                    boxShadow={ colorMode === "dark" ? "0  1px 4px black": "0 1px 4px white"}
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

              {showFeed == 1 &&
                videos.map((item: VideoInterface, index: number) => (
                  <Flex
                    direction={"column"}
                    key={index}
                    className="col-xl-2 col-lg-3  col-6 p-2 mb-3"
                  >
                    <Box
                      id="parent"
                      opacity={"1"}
                      position="relative"
                      transition={"all .6s ease-in-out"}
                      textAlign="center"
                    >
                      <Flex
                        id="widget"
                        position={"absolute"}
                        left={"5px"}
                        bottom={"5px"}
                      >
                        <Box
                          width="35px"
                          paddingX={1}
                          background={"#e8e8e8 none repeat scroll 0 0"}
                          borderRadius="2px"
                          color="#000"
                          fontSize={"11px"}
                          fontWeight="500"
                          marginX={1}
                          display="flex"
                          justifyContent={"space-between"}
                        >
                          <Image
                            src="https://3speak.tv/img/play.svg"
                            alt="play"
                          ></Image>
                          <Text as={"span"}>20</Text>
                        </Box>
                        <Box
                          width="35px"
                          paddingX={1}
                          background={"#e8e8e8 none repeat scroll 0 0"}
                          borderRadius="2px"
                          color="#000"
                          marginX={1}
                          fontSize={"11px"}
                          fontWeight="500"
                          display="flex"
                          justifyContent={"space-between"}
                          alignItems="center"
                        >
                          <BiDollar />
                          <Text as={"span"}>10</Text>
                        </Box>
                      </Flex>
                      <Box
                        id="timestamp"
                        right={"5px"}
                        width="auto"
                        background={"#e8e8e8 none repeat scroll 0 0"}
                        borderRadius="2px"
                        bottom={"5px"}
                        color="#000"
                        fontSize={"11px"}
                        fontWeight="500"
                        padding={"0 6px"}
                        position="absolute"
                        display="flex"
                        justifyContent={"space-between"}
                      >
                        <Text as={"span"}>12:48</Text>
                      </Box>
                      <Link href="https://3speak.tv/watch?v=cttpodcast/zjvcobqa">
                        <Image
                          className="img-fluid"
                          borderColor={"transparent!important"}
                          background="linear-gradient(135deg,#171b20 1%,#343a40 100%)"
                          width={"100% !important"}
                          padding="5px"
                          maxHeight={"200px"}
                          height="auto"
                          objectFit="cover"
                          src={`${item.thumbnail}`}
                          alt="Dan Abramov"
                        />
                      </Link>
                    </Box>
                    <Box minHeight={"60px"}>
                      <Link
                        textDecoration={"none"}
                        href={`/watch?v=${item.username}`}
                      >
                        <Text
                          textDecoration={"none"}
                          fontSize={"13px"}
                          overflowWrap="break-word"
                          textOverflow={"ellipsis"}
                          overflow="hidden"
                          maxHeight={"2.8em"}
                          lineHeight="1.4em"
                          display={"block"}
                          marginTop="0.5rem !important"
                          fontWeight={"500"}
                        >
                          {item.title}
                        </Text>
                      </Link>
                      <Box
                        width={"calc( 100% - 1rem )"}
                        display="block"
                        position={"unset"}
                      >
                        <Flex
                          justifyContent={"justify !important"}
                          alignItems="center"
                        >
                          <Flex className="black_col mb-0">
                            <Link href="/user/cttpodcast">
                              <i className="fa fa-user"></i>
                              {item.username}
                            </Link>
                            <Text mt={1}>
                              <BsDot />
                            </Text>
                            <Flex className="mb-0">
                              <Text>a day ago</Text>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Box>
                    </Box>
                  </Flex>
                ))}
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </MainLayout>
  );
};

export default UserPage;
