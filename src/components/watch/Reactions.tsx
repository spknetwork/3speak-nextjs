import { Button, Flex, Text, Tooltip, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import { VideoDetails } from "types";
import MenuButtons from "./MenuButtons";
import { useAuth } from "@/hooks/auth";

type Props = {
  bgColor: string;
  colorMode: string;
  getVideo: VideoDetails;
};

const Reactions = ({ bgColor, colorMode, getVideo }: any) => {
  const { authenticated } = useAuth(); //true

  const [likes, setLikes] = useState<number>(getVideo?.stats?.num_votes | 0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  //for the dislikes
  const [Dislikes, setDislikes] = useState<number>(
    getVideo?.stats?.num_votes | 10
  );
  const [isDisLiked, setDisLiked] = useState<boolean>(false);

  function handleLikes() {
    if (!authenticated) {
      return null;
    } else {
      if (!isLiked) {
        setLikes(likes + 1);
        setIsLiked(!isLiked);

        if (isDisLiked) {
          setDisLiked(false);
          setDislikes((prev) => prev + 1);
        }
      }
      if (isLiked) {
        setLikes(likes - 1);
        setIsLiked(!isLiked);
      }
    }
  }

  function handleDisLikes() {
    if (!isDisLiked) {
      setDislikes(Dislikes - 1);
      setDisLiked(!isDisLiked);

      if (isLiked) {
        setLikes(likes - 1);
        setIsLiked(false);
      }
    }

    if (isDisLiked) {
      setDislikes(Dislikes + 1);
      setDisLiked(!isDisLiked);
    }
  }

  const [FollowState, setFollowState] = useState<string | null>("follow");

  const TriggerRender = () => {
    setFollowState((prevState) =>
      prevState === "follow" ? "Unfollow" : "follow"
    );
  };

  return (
    <Flex justifyContent={['center']} gap={2}>
      <Flex
        alignItems={"center"}
        justifyContent={"space-evenly"}
        bg={bgColor}
        px={2}
        color={colorMode === "dark" ? "white" : "black"}
      >
        <Button
          mx={12}
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
      </Flex>
      <Flex justifyContent={"center"} alignItems="center" className="mr-4" gap={1}>
        <Tooltip label={authenticated ? "" : "You need to login!"}>
          <Flex
            cursor={authenticated ? "pointer" : "not-allowed"}
            onClick={handleLikes}
          >
            <Icon 
             as={isLiked ? FaThumbsUp : FaRegThumbsUp}
             boxSize={6}
            />
          </Flex>
        </Tooltip>
        {getVideo && getVideo.stats && getVideo.stats.num_votes > 0 && (
          <Text
            marginBottom={"0px !important"}
            fontWeight={"bolder"}
            marginLeft={"10px"}
            fontSize={"lg"}
          >
            {likes}
          </Text>
        )}
      </Flex>
      {}
      <Flex justifyContent="center" alignItems="center" marginLeft="24px">
        <Tooltip label={authenticated ? "" : "You need to login!"}>
          <Flex
            cursor={authenticated ? "pointer" : "not-allowed"}
            onClick={authenticated ? handleDisLikes : () => {}}
          >
            <Icon
              as={isDisLiked ? FaThumbsDown : FaRegThumbsDown}
              boxSize={6} 
            />
          </Flex>
        </Tooltip>
        {/* <Text
          marginBottom="0px !important"
          fontWeight="bolder"
          marginLeft="10px"
          fontSize="lg" 
        >
          {Dislikes}
        </Text> */}
      </Flex>
      {/* <Flex justifyContent={"center"} alignItems="center" marginLeft={"25px"}>
        <ViewIcon fontSize={"20px"} />
        <Text
          marginBottom={"0px !important"}
          fontWeight={"bolder"}
          marginLeft={"10px"}
        >
          38
        </Text>
      </Flex> */}
      <Flex justifyContent={"center"} alignItems="center" marginLeft={"15px"}>
        {/* views */}
        <MenuButtons bgColor={bgColor} colorMode={colorMode} />
      </Flex>
    </Flex>
  );
};

export default Reactions;
