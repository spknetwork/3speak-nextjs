import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { MdCancel } from "react-icons/md";


type Props = {
    label: string;  
    onDelete: (label: string) => void; 
};

const Chips = (props: Props) => {
  /**
   * Here data will be rendered in the styled manner as chips
   */

  return (
    <Flex
      backgroundColor={"gray.500"}
      px={2}
      mx={1}
      borderRadius={10}
      h={7}
      cursor={"pointer"}
      position={"relative"}
    >
      <Text>#{props.label}</Text>
      <Text position={"absolute"} top={-1} right={0} color={"white"}>
        <MdCancel size={"10px"} onClick={() => props.onDelete(props.label)} />
      </Text>
    </Flex>
  );
};

export default Chips;
