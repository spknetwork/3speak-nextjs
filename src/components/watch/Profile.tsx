import { ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";

const Profile = () => {
  return (
    <Flex justifyContent={"space-between"}>
      <Box bg="white" p={4} color="black">
        <Flex alignItems={"center"}>
          <Avatar
            name="Dan Abrahmov"
            alignSelf={"start"}
            src="https://bit.ly/dan-abramov"
          />
          <Flex flexDirection={"column"} className="ms-4">
            <Link fontWeight={"bolder"}>stellamartinez</Link>
            <Flex justifyContent={"start"}>
              <Box bg="white" p={4} paddingLeft="0px" color="black">
                <Text marginBottom={"10px"} fontSize={"11px"}>
                  Community
                </Text>
                <Flex alignItems={"center"}>
                  <Avatar
                    size={"sm"}
                    name="Dan Abrahmov"
                    src="https://bit.ly/tioluwani-kolawole"
                  />
                  <Flex flexDirection={"column"} className="ms-2">
                    <Link fontWeight={"bolder"} fontSize={"11px"}>
                      Humanitas
                    </Link>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Flex alignItems={"center"} bg="white" p={4} color="black">
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
