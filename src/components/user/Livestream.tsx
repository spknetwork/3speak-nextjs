import {
  Flex,
  Grid,
  GridItem,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Box } from "../Box";

const Livestream = () => {
  return (
    <Box width={"100%"}>
      <Flex width={"100%"}>
        <Box width={"70%"} border="1px solid">
          <Image
            alt="test"
            src="/images/offline.png"
            width={"100%"}
            height="auto"
          />
        </Box>
        <Box width={"30%"} border="1px solid">
          <Flex
            width={"100%"}
            justifyContent="center"
            height={"100%"}
            alignItems={"center"}
          >
            Offline
          </Flex>
        </Box>
      </Flex>
      <Box
        padding={"15px"}
        backgroundColor="#fff"
        borderRadius={"2px"}
        boxShadow="0 0 11px #ececec"
        width={"100%"}
        marginBottom="30px !important"
      >
        <Box>
          <Text as="h2" fontSize={"18px"} color="#333" fontWeight={"500"}>
            Livestream by: thestrollingmind
          </Text>
          <Text as="p">1 viewer</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Livestream;
