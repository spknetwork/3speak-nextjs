import { GET_PROFILE, GET_TOTAL_COUNT_OF_FOLLOWING } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ProfileInterface, VideoInterface } from "types";

type Props = {
  author: string;
  bgColor: string;
  colorMode: string;
};

const Profile = ({ author,  bgColor, colorMode }: Props) => {
  const router = useRouter();

   const getUserProfile = useQuery(GET_PROFILE, {
    variables: { id: author },
  });

  
  const profile: ProfileInterface | undefined = getUserProfile.data?.profile;

  console.log("profile" , profile);
  
  const { loading, error, data } = useQuery(GET_TOTAL_COUNT_OF_FOLLOWING, {
    variables: { id: router.query.username },
  });

  useEffect(() => {
    if (!loading && !error && data) {
      console.log("GET_TOTAL_COUNT_OF_FOLLOWING", data);
      setfollowings_count(data.follows.followings_count);
      setfollowers_count(data.follows.followers_count);
    }
  }, [loading, data, error]);

  const [followings_count, setfollowings_count] = useState<any>(null);
  const [followers_count, setfollowers_count] = useState<any>(null);

  const [FollowState, setFollowState] = useState<string | null>("follow")
  
  const gotoProfile = () => {
    router.push(`/user/${profile?.username}`);
  };

  const TriggerRender = () => {
    setFollowState((prevState) => (prevState === "follow" ? "Unfollow" : "follow"))
  }
  return (
    <Flex justifyContent={"space-between"}>
      <Box
        fontFamily={"system-ui"}
        bg={bgColor}
        py={4}
        color={colorMode === "dark" ? "white" : "black"}
      >
        {/* src="https://bit.ly/dan-abramov" */}
        <Flex alignItems={"center"} gap={2}>
          <Avatar
            cursor={"pointer"}
            name={profile?.name || ""}
            alignSelf={"start"}
            src={profile?.images?.avatar}
            onClick={() => gotoProfile()}
          />
          <Flex flexDirection={"column"}>
            <Link
              fontSize={"15px"}
              fontWeight={"bolder"}
              cursor={"pointer"}
              onClick={() => gotoProfile()}
            >
              {profile?.username}
            </Link>
            <Flex justifyContent={"center"} alignItems={"center"}>
              <Text
                color={colorMode === "dark" ? "white" : "black"}
                fontSize={"14px"}
                marginRight="10px"
              >
                followers {followers_count}
              </Text>
              {/* need to make it functional  */}
              <Text
                color={colorMode === "dark" ? "white" : "black"}
                fontSize={"14px"}
              >
                following {followings_count}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Flex
        alignItems={"center"}
        bg={bgColor}
        p={4}
        color={colorMode === "dark" ? "white" : "black"}
      >
        <Button
          marginRight={"10px"}
          textTransform="uppercase"
          border={"none"}
          boxShadow="0 1px 4px rgb(0 0 0 / 40%)"
          transition={"all 0.4s"}
          lineHeight={"1.5"}
          background={
            colorMode === "dark"
              ? "black"
              : "#fff linear-gradient(180deg, white, #fff) repeat-x"
          }
          fontWeight={"bold"}
          fontSize={"14px"}
          fontFamily={"system-ui"}
          color={colorMode === "dark" ? "white" : "black"}
          onClick={TriggerRender}
        >
          {FollowState === "follow" ? "FOLLOW" : "UNFOLLOW"}
        </Button>
        {/* <Button
          marginRight={"10px"}
          textTransform="uppercase"
          border={"none"}
          boxShadow="0 1px 4px rgb(0 0 0 / 40%)"
          transition={"all 0.4s"}
          fontSize="0.7109375rem"
          lineHeight={"1.5"}
          background={
            colorMode === "dark"
              ? "black"
              : "#fff linear-gradient(180deg, white, #fff) repeat-x"
          }
          fontWeight={"400"}
          color={colorMode === "dark" ? "white" : "black"}
        >
          DONATE CRYPTO
        </Button> */}
      </Flex>
    </Flex>
  );
};

export default Profile;
