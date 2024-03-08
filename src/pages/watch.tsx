// README: legacy redirect only

// export async function getServerSideProps(context: any) {
//   const [author, permlink] = context.query.v.split('/')
//   return {
//     redirect: {
//       permanent: false,
//       destination: `/@${author}/${permlink}`,
//     },
//     props:{},
//   };
// }

import Video from "@/components/watch/Video";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  useColorMode,
  useColorModeValue,
  Switch
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import About from "@/components/watch/About";
import Profile from "@/components/watch/Profile";
import Comment from "@/components/watch/Comment";
import MenuButtons from "@/components/watch/MenuButtons";
import Reactions from "@/components/watch/Reactions";
import Views from "@/components/watch/Views";
import Tags from "@/components/watch/Tags";
import Title from "@/components/watch/Title";
import VideoPlayer from "@/components/watch/VideoPlayer";
import Community from "@/components/watch/Community";
import { css } from "@emotion/react";
import { useState } from "react";
import MiniSidebar from "@/components/MiniSidebar/MiniSidebar";

export default function Watch() {
  const [count, setCount] = useState<number>(0);
  console.log(count);

  //for the dark mode
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex justifyContent={"right"} background={bgColor}>
      <MiniSidebar />
      <Flex
        width={"97%"}
        css={css`
          @media (max-width: 768px) {
            flex-direction: column;
          }

          @media (min-width: 769px) {
            flex-direction: row;
          }
        `}
        color={colorMode === "dark" ? "white": "dark"}
        padding={"10px"}
      >
        <Box flex="1">
        <Text position={"absolute"} >
            <Switch
              isChecked={colorMode === "dark"}
              onChange={toggleColorMode}
            />{" "}
            {colorMode === "dark" && <MoonIcon />}{" "}
            {colorMode !== "dark" && <SunIcon />}
          </Text>
          <Box borderRadius={4} boxShadow="base" mr={2} flex="1" bg={bgColor}>
            <Box
              m={5}
              bg={bgColor}
              p={4}
              paddingLeft="0px"
              paddingRight={"0px"}
              color={colorMode === "dark" ? "white": "dark"}
            >
              <VideoPlayer />
              <Box>
                <Flex flexDirection={"column"} bgColor={bgColor}>
                  <Box  bgColor={bgColor}>
                    <Title bgColor={bgColor} colorMode={colorMode} />
                    <Tags bgColor={bgColor} colorMode={colorMode}  />
                  </Box>
                  <Flex justifyContent={"end"} marginTop="1rem"  bgColor={bgColor}>
                    <Reactions />
                  </Flex>
                </Flex>
              </Box>
            </Box>
          </Box>
          <Box
            marginBottom={"30px"}
            borderRadius={4}
            boxShadow="base"
            mr={2}
            flex="1"
            bg={bgColor}
            >
            <Profile bgColor={bgColor} colorMode={colorMode}/>
          </Box>

          <Box
            marginBottom={"30px"}
            borderRadius={4}
            boxShadow="base"
            mr={2}
            flex="1"
            bg={bgColor}
          >
            <Community bgColor={bgColor} colorMode={colorMode}/>
          </Box>

          <Box borderRadius={4} boxShadow="base" mr={2} flex="1" bg={bgColor}>
            {/* published or about components */}
            <About bgColor={bgColor} colorMode={colorMode} />
          </Box>
          <Box>
            {/* comment */}
            <Comment bgColor={bgColor} colorMode={colorMode}/>
          </Box>
        </Box>
        {/* borderRadius={4} boxShadow="base" mr={2} flex="1" bg="white" */}
        {/* <Box
          w={{ base:  "100%", md: "33%", lg: "33%" }}
          bg="white"
          color={"black"}
          marginTop="15px"
          borderRadius={4}
          boxShadow="base"
          marginLeft={"10px"}
          paddingTop="10px"
          paddingX={'10px'}
        >
           <Video videoSrc="https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVcJpKJDN8sx7ZjXNkfrVDtAkjdi59a6bGJtSa9MJdsqxYnqALaV6iRcMCMd5TL4RfZMhnbb6e?format=jpeg&mode=cover&width=340&height=191" />
        </Box> */}
        <Box
          w={{ base: "100%", md: "33%", lg: "33%" }}
          bg={bgColor}
          color={colorMode==="dark" ? "white": "black"}
          marginTop="15px"
          borderRadius={4}
          boxShadow="base"
          marginLeft={"10px"}
          paddingTop="10px"
          paddingX={"10px"}
        >
          <Box margin={"15px"}>
            <Text
              as="h2"
              fontWeight={"bolder"}
              lineHeight="1.2"
              fontSize={"1.5rem"}
            >
              Suggested video you may like
            </Text>
          </Box>
          <Grid
            display={{
              base: "inline-table",
              md: "inline-table",
              lg: "inline-table",
            }}
            templateColumns="repeat(1, 1fr)"
            gap={2}
          >
            <GridItem
              marginTop={"1px !important"}
              m={5}
              w="100%"
              h="10"
              bg={bgColor}
              textColor={colorMode==="dark" ? "white": "black"}
            >
              <Video
                number_views="23"
                videoSrc="https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVcJpKJDN8sx7ZjXNkfrVDtAkjdi59a6bGJtSa9MJdsqxYnqALaV6iRcMCMd5TL4RfZMhnbb6e?format=jpeg&mode=cover&width=340&height=191"
              />
              <Video
                number_views="11"
                videoSrc="https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVim5xXXBHudVXW7uT6ErgMsQHTXm2ELwa6JxMMvR1j9aYic2jgGRz4wcXHkeUnAJM5CWiwria?format=jpeg&mode=cover&width=340&height=191"
              />
              <Video
                number_views="66"
                videoSrc="https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVhcN63NCz569HVsSov72VRbsEsSxSrf7JQJBhpsDNxyNfNKrnmLNvLJCfNaX26VjPcZpap3f4?format=jpeg&mode=cover&width=340&height=191"
              />
              <Video
                number_views="200"
                videoSrc="https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVeUsu1qEtX9RpZ8NAWnhCRjimECuPV5shWf4r96HKR9u7G1CQv26vfFSDsFs8k41YwWaDDg6J?format=jpeg&mode=cover&width=340&height=191"
              />
              <Video
                number_views="4"
                videoSrc="https://images.hive.blog/p/eAyTuXc4toTXvjczQpXyRFR18E7ALGyK7bKRqmpLVRT2K6Dw3vqp1HBU47x9jcw8bRw8xadHDYJ?format=jpeg&mode=cover&width=340&height=191"
              />
              <Video
                number_views="1"
                videoSrc="https://images.hive.blog/p/eAyTuXc4toTXvjczQpXyRFR18E7ALGyK7gdoY79fNxSmJmDgPua44kR8BdATGS4C3NTPtF7Swv6?format=jpeg&mode=cover&width=340&height=191"
              />
              <Video
                number_views="6"
                videoSrc="https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVbGs8rF69qxxfW7SdHLkQcmo3YEiD4agxV19oco2hcKTPS49UMjd93Xc8X8yvLreZtFoEEgr2?format=jpeg&mode=cover&width=340&height=191"
              />
            </GridItem>
          </Grid>
          <Box margin={"15px"} marginTop="35px">
            <Text
              as="h2"
              fontWeight={"bolder"}
              lineHeight="1.2"
              fontSize={"1.5rem"}
            >
              More from (username)
            </Text>
            <Text
              padding={"15px"}
              background="black"
              borderRadius={"10px"}
              color="white"
            >
              (username) has no more videos yet.
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}
