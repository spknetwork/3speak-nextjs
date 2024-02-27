import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import MenuButtons from "./MenuButtons";
import Views from "./Views";

const Reactions = ({ getVideo }: any) => {
  return (
    <Flex justifyContent={"center"}>
      <Flex justifyContent={"center"} alignItems="center" className="mr-4">
        <FaRegThumbsUp />
        {
          getVideo?.stats.num_votes > 0 && (
            <Text marginBottom={'0px !important'} fontWeight={"bolder"} marginLeft={"10px"}>
              {getVideo?.stats.num_votes}
            </Text>
          )
        }
      </Flex>
      <Flex justifyContent={"center"} alignItems="center" marginLeft={"25px"}>
        <FaRegThumbsDown />
        <Text marginBottom={'0px !important'} fontWeight={"bolder"} marginLeft={"10px"}>
          10
        </Text>
      </Flex>
      <Flex justifyContent={"center"} alignItems="center" marginLeft={"25px"}>
        {/* views */}
        <Views />
      </Flex>
      <Flex justifyContent={"center"} alignItems="center" marginLeft={"5px"}>
        {/* views */}
        <MenuButtons />
      </Flex>
    </Flex>
  );
};

export default Reactions;
