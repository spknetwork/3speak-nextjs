import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import MenuButtons from "./MenuButtons";
import Views from "./Views";

const Reactions = () => {
  return (
    <Flex justifyContent={"center"}>
      <Flex justifyContent={"center"} alignItems="center" className="mr-4">
        <FaRegThumbsUp />
        <Text fontWeight={"bolder"} marginLeft={"10px"}>
          123
        </Text>
      </Flex>
      <Flex justifyContent={"center"} alignItems="center" marginLeft={"25px"}>
        <FaRegThumbsDown />
        <Text fontWeight={"bolder"} marginLeft={"10px"}>
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
