import { GET_TOTAL_COUNT_OF_FOLLOWING } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { VideoInterface } from "types";


type Props = {
  bgColor: string,
  colorMode: string,
  profile: any,
  getVideo: VideoInterface
}

const Profile = ({profile, getVideo, ...props}: Props) => {
    const router = useRouter();
    const { loading, error, data } = useQuery(GET_TOTAL_COUNT_OF_FOLLOWING, {
      variables: { id: router.query.username },
  });
  
  useEffect(() => {
    if (!loading && !error && data) {
      console.log("GET_TOTAL_COUNT_OF_FOLLOWING", data);
      setfollowings_count(data.follows.followings_count)
      setfollowers_count(data.follows.followers_count)
      
    }
  }, [loading, data, error]);
    const [videoUrl, setvideoUrl] = useState<any>(null)
    const [followings_count, setfollowings_count] = useState<any>(null)
    const [followers_count, setfollowers_count] = useState<any>(null)
    
    const [videoUrlSelected, setvideoUrlSelected] = useState<any>(null)
    useEffect(() => {
      if (videoUrl) {
        // console.log("setvideoUrl4 final step",videoUrl)
      }
  
    }, [videoUrl])
  
    useEffect(() => {
      if (getVideo) {
        // console.log("getVideo in player 3", getVideo.spkvideo.play_url)
        if (getVideo?.spkvideo?.play_url) {
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
    // if (!videoUrl) {
    //   return <Box>getting video details</Box>;
    // }
  
    const gotoProfile = () => {
      router.push(`/user/${profile?.username}`)
    }
  return (
    <Flex justifyContent={"space-between"}>
      <Box cursor={"pointer"} bg={props.bgColor} p={4} color={props.colorMode==="dark"? "white": "black"} onClick={() => gotoProfile()}>
      {/* src="https://bit.ly/dan-abramov" */}
        <Flex alignItems={"center"}>
          <Avatar
            name="Dan Abrahmov"
            alignSelf={"start"}
            src={profile?.images?.avatar}
          />
          <Flex flexDirection={"column"} className="ms-2">
            <Link fontSize={'15px'}  fontWeight={"bolder"}>{getVideo?.author?.username}</Link>
            <Box display={'flex'} >
              <Text color={'grey'} fontSize={'12px'} marginRight='10px'>followers {followers_count}</Text>
              <Text color={'grey'} fontSize={'12px'}>following {followings_count}</Text>
            </Box>
          </Flex>
        </Flex>
      </Box>
      <Flex alignItems={"center"} bg={props.bgColor} p={4} color={props.colorMode==="dark"? "white": "black"}>
        <Button
          marginRight={"10px"}
          textTransform="uppercase"
          border={"none"}
          boxShadow="0 1px 4px rgb(0 0 0 / 40%)"
          transition={"all 0.4s"}
          fontSize="0.7109375rem"
          lineHeight={"1.5"}
          background={props.colorMode==="dark"?"black": "#fff linear-gradient(180deg, white, #fff) repeat-x"}
          fontWeight={"400"}
          color={props.colorMode==="dark"? "white" : "black"}
        >
          FOLLOW 
        </Button>
        <Button
          marginRight={"10px"}
          textTransform="uppercase"
          border={"none"}
          boxShadow="0 1px 4px rgb(0 0 0 / 40%)"
          transition={"all 0.4s"}
          fontSize="0.7109375rem"
          lineHeight={"1.5"}
          background={props.colorMode==="dark"?"black": "#fff linear-gradient(180deg, white, #fff) repeat-x"}
          fontWeight={"400"}
          color={props.colorMode==="dark"? "white" : "black"}
        >
          DONATE CRYPTO
        </Button>
      </Flex>
    </Flex>
  );
};

export default Profile;
