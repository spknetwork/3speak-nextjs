import { Avatar, Box, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  bgColor: string,
  colorMode: string 
}
const Community = (props: Props) => {
  return (
    <Flex justifyContent={"start"}>
      <Box bg={props.bgColor} p={4} color={props.colorMode==="dark" ? "white" : "black"}>
        <Text marginBottom={"10px"} fontSize={"11px"}>
          Community
        </Text>
        <Flex alignItems={"center"}>
          <Avatar name="Dan Abrahmov" src="https://bit.ly/tioluwani-kolawole" />
          <Flex flexDirection={"column"} className="ms-4">
            <Link fontWeight={"bolder"} fontSize={"11px"}>
              Humanitas
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Flex>
    // <div>
    //   <span className="ms-4">Humanitas</span>
    // </div>
  );
};

export default Community;
