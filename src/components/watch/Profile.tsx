import { ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Profile = ({ getVideo }: any) => {
  const [videoUrl, setvideoUrl] = useState<any>(null)
  const [videoUrlSelected, setvideoUrlSelected] = useState<any>(null)
  useEffect(() => {
    if (videoUrl) {
      // console.log("setvideoUrl4 final step",videoUrl)
    }

  }, [videoUrl])

  useEffect(() => {
    if (getVideo) {
      // console.log("getVideo in player 3", getVideo.spkvideo.play_url)
      if (getVideo.spkvideo.play_url) {
        const url = getVideo.spkvideo.play_url
        // Splitting the string by "ipfs://" and getting the first result
        const splitResult = url.split("ipfs://");

        // The first element after splitting might be an empty string if the string starts with "ipfs://"
        // So, we check if the first element is empty and select the second element in that case
        const result = splitResult[0] === "" ? splitResult[1] : splitResult[0];
        setvideoUrlSelected("https://ipfs-3speak.b-cdn.net/ipfs/" + result)
      }
      // console.log("ipfs://QmPX8YosD35YphprEi5apHzbCcXXzq1xZbDdFiv7qJVFXv/manifest.m3u8")
      setvideoUrl(getVideo.spkvideo)
    }
  }, [getVideo])

  useEffect(() => {
    console.log("videoUrlSelected", videoUrlSelected)
  }, [videoUrlSelected])
  // "https://ipfs-3speak.b-cdn.net/ipfs/QmWoqdoLtsF4obB5sfSUc3GEZGY87TmcJrt6JpH8bJqsuK/manifest.m3u8" thumbnail_url
  // "https://ipfs-3speak.b-cdn.net/ipfs/bafybeibqxbf652lmfbdf7zoht3pbhkx4m76agdwn5mnw33vjhlxrzvccoe/"
  // `${videoUrl.play_url}` ipfs://QmPX8YosD35YphprEi5apHzbCcXXzq1xZbDdFiv7qJVFXv/manifest.m3u8
  if (!videoUrl) {
    return <Box>getting video details</Box>;
  }
  return (
    <Flex justifyContent={"space-between"}>
      <Box bg="white" p={4} color="black">
        <Flex alignItems={"center"}>
          <Avatar
            name="Dan Abrahmov"
            alignSelf={"start"}
            src="https://bit.ly/dan-abramov"
          />
          <Flex flexDirection={"column"} className="ms-4">
            <Link fontWeight={"bolder"}>{getVideo.author.username}</Link>
            {/* <Flex justifyContent={"start"}>
              <Box bg="white" p={4} paddingLeft="0px" color="black">
                <Text marginBottom={"10px"} fontSize={"11px"}>
                  Community
                </Text>
                <Flex alignItems={"center"}>
                  <Avatar
                    size={"sm"}
                    name="Dan Abrahmov"
                    src="https://bit.ly/tioluwani-kolawole"
                  />
                  <Flex flexDirection={"column"} className="ms-2">
                    <Link fontWeight={"bolder"} fontSize={"11px"}>
                      Humanitas
                    </Link>
                  </Flex>
                </Flex>
              </Box>
            </Flex> */}
          </Flex>
        </Flex>
      </Box>
      <Flex alignItems={"center"} bg="white" p={4} color="black">
        <Button
          marginRight={"10px"}
          textTransform="uppercase"
          border={"none"}
          boxShadow="0 1px 4px rgb(0 0 0 / 40%)"
          transition={"all 0.4s"}
          fontSize="0.7109375rem"
          lineHeight={"1.5"}
          background="#fff linear-gradient(180deg, white, #fff) repeat-x"
          fontWeight={"400"}
          color={"#212121"}
        >
          FOLLOW 47
        </Button>
        <Button
          marginRight={"10px"}
          textTransform="uppercase"
          border={"none"}
          boxShadow="0 1px 4px rgb(0 0 0 / 40%)"
          transition={"all 0.4s"}
          fontSize="0.7109375rem"
          lineHeight={"1.5"}
          background="#fff linear-gradient(180deg, white, #fff) repeat-x"
          fontWeight={"400"}
          color={"#212121"}
        >
          DONATE CRYPTO
        </Button>
        <Button colorScheme="red">Buzz</Button>
      </Flex>
    </Flex>
  );
};

export default Profile;
