import { ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";


type Props = {
  bgColor: string,
  colorMode: string
}

const Profile = (props: Props) => {
  return (
    <Flex justifyContent={"space-between"}>
      <Box bg={props.bgColor} p={4} color={props.colorMode==="dark"? "white": "black"}>
        <Flex alignItems={"center"}>
          <Avatar
            name="Dan Abrahmov"
            alignSelf={"start"}
            src="https://bit.ly/dan-abramov"
          />
          <Flex flexDirection={"column"} className="ms-4">
            <Link fontWeight={"bolder"}>stellamartinez</Link>
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
          background="#fff linear-gradient(180deg, white, #fff) repeat-x"
          fontWeight={"400"}
          color={props.colorMode==="dark"? "#212121" : "white"}
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
