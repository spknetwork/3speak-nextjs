import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { MdCancel } from "react-icons/md";

type Props = {
  label: string;
  onDelete: (label: string) => void;
  colorMode: string;
};

const Chips = (props: Props) => {
  /**
   * Here data will be rendered in the styled manner as chips
   */

  return (
    <Flex
      backgroundColor={props.colorMode === "dark" ? "gray.500" : "gray.300"}
      color={props.colorMode === "dark" ? "white" : "blue.600"}
      px={2}
      mx={1}
      borderRadius={10}
      h={7}
      cursor={"pointer"}
      position={"relative"}
    >
      <Text>#{props.label}</Text>
      <Text
        position={"absolute"}
        top={-1}
        right={0}
        color={props.colorMode === "dark" ? "white" : "black"}
        borderRadius={10}
      >
        <MdCancel size={"10px"} onClick={() => props.onDelete(props.label)} />
      </Text>
    </Flex>
  );
};

export default Chips;
