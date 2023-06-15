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
import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";

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

export default function Watch() {
  return (
    <Box background={"#EFF4F5"}>
      <Flex color="white" padding={"10px"}>
        <Box flex="1">
          <Box borderRadius={4} boxShadow="base" mr={2} flex="1" bg="white">
            <Box
              m={5}
              bg="white"
              p={4}
              paddingLeft="0px"
              paddingRight={"0px"}
              color="black"
            >
              <VideoPlayer />
              <Box>
                <Flex flexDirection={"column"}>
                  <Box>
                    <Title />
                    <Tags />
                  </Box>
                  <Flex justifyContent={"end"} marginTop="1rem">
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
            bg="white"
          >
            <Profile />
          </Box>

          <Box
            marginBottom={"30px"}
            borderRadius={4}
            boxShadow="base"
            mr={2}
            flex="1"
            bg="white"
          >
            <Community />
          </Box>

          <Box borderRadius={4} boxShadow="base" mr={2} flex="1" bg="white">
            {/* published or about components */}
            <About />
          </Box>
          <Box>
            {/* comment */}
            <Comment />
          </Box>
        </Box>
        {/* borderRadius={4} boxShadow="base" mr={2} flex="1" bg="white" */}
        <Box
          w="33%"
          bg="white"
          color={"black"}
          marginTop="15px"
          borderRadius={4}
          boxShadow="base"
          marginLeft={"10px"}
          paddingTop="10px"
        >
          <Grid templateColumns="repeat(1, 1fr)" gap={2}>
            <GridItem
              marginTop={"1px !important"}
              m={5}
              w="100%"
              h="10"
              bg="white.600"
            >
              <Video videoSrc="https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVcJpKJDN8sx7ZjXNkfrVDtAkjdi59a6bGJtSa9MJdsqxYnqALaV6iRcMCMd5TL4RfZMhnbb6e?format=jpeg&mode=cover&width=340&height=191" />
              <Video videoSrc="https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVim5xXXBHudVXW7uT6ErgMsQHTXm2ELwa6JxMMvR1j9aYic2jgGRz4wcXHkeUnAJM5CWiwria?format=jpeg&mode=cover&width=340&height=191" />
              <Video videoSrc="https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVhcN63NCz569HVsSov72VRbsEsSxSrf7JQJBhpsDNxyNfNKrnmLNvLJCfNaX26VjPcZpap3f4?format=jpeg&mode=cover&width=340&height=191" />
              <Video videoSrc="https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVeUsu1qEtX9RpZ8NAWnhCRjimECuPV5shWf4r96HKR9u7G1CQv26vfFSDsFs8k41YwWaDDg6J?format=jpeg&mode=cover&width=340&height=191" />
              <Video videoSrc="https://images.hive.blog/p/eAyTuXc4toTXvjczQpXyRFR18E7ALGyK7bKRqmpLVRT2K6Dw3vqp1HBU47x9jcw8bRw8xadHDYJ?format=jpeg&mode=cover&width=340&height=191" />
              <Video videoSrc="https://images.hive.blog/p/eAyTuXc4toTXvjczQpXyRFR18E7ALGyK7gdoY79fNxSmJmDgPua44kR8BdATGS4C3NTPtF7Swv6?format=jpeg&mode=cover&width=340&height=191" />
              <Video videoSrc="https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVbGs8rF69qxxfW7SdHLkQcmo3YEiD4agxV19oco2hcKTPS49UMjd93Xc8X8yvLreZtFoEEgr2?format=jpeg&mode=cover&width=340&height=191" />
            </GridItem>
          </Grid>
        </Box>
      </Flex>
    </Box>
  );
}
