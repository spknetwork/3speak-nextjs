//TODO: downvotes and views field not available
//TODO: make the UI optimistic
import { ViewIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import { VideoDetails } from "types";
import MenuButtons from "./MenuButtons";

type Props = {
  bgColor: string;
  colorMode: string;
  getVideo: VideoDetails;
};

const Reactions = ({ bgColor, colorMode, getVideo }: any) => {
  console.log("videoStats", getVideo);

  const [likes, setLikes] = useState<number>(getVideo?.stats?.num_votes | 0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  //for the dislikes
  const [Dislikes, setDislikes] = useState<number>(
    getVideo?.stats?.num_votes | 10
  );
  const [isDisLiked, setDisLiked] = useState<boolean>(false);

  /**
   * Function for likes
   */
  function handleLikes() {
    if (!isLiked) {
      setLikes(likes + 1);
      setIsLiked(!isLiked);

      if(isDisLiked){
        setDisLiked(false);
        setDislikes(prev => prev + 1)
      }
    }
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(!isLiked);
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

  return (
    <Flex justifyContent={"center"}>
      <Flex justifyContent={"center"} alignItems="center" className="mr-4">
        <Flex cursor="pointer" onClick={handleLikes}>
          {isLiked ? <FaThumbsUp /> : <FaRegThumbsUp />}
        </Flex>
        {getVideo && getVideo.stats && getVideo.stats.num_votes > 0 && (
          <Text
            marginBottom={"0px !important"}
            fontWeight={"bolder"}
            marginLeft={"10px"}
          >
            {likes}
          </Text>
        )}
      </Flex>
      <Flex justifyContent={"center"} alignItems="center" marginLeft={"25px"}>
      <Flex cursor="pointer" onClick={handleDisLikes}>
          {isDisLiked ? <FaThumbsDown /> : <FaRegThumbsDown />}
        </Flex>
        <Text
          marginBottom={"0px !important"}
          fontWeight={"bolder"}
          marginLeft={"8px"}
        >
          {Dislikes}
        </Text>
      </Flex>
      <Flex justifyContent={"center"} alignItems="center" marginLeft={"25px"}>
        {/* views */}
        <ViewIcon fontSize={"20px"} />
        <Text
          marginBottom={"0px !important"}
          fontWeight={"bolder"}
          marginLeft={"10px"}
        >
          38
        </Text>
      </Flex>
      <Flex justifyContent={"center"} alignItems="center" marginLeft={"15px"}>
        {/* views */}
        <MenuButtons bgColor={bgColor} colorMode={colorMode} />
      </Flex>
    </Flex>
  );
};

export default Reactions;
