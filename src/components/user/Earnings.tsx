import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React from "react";

const Earnings = () => {
  return (
    <Box width={"100%"}>
      <SimpleGrid columns={2} spacing={10}>
        <Box bg="white" height="auto">
          <Card
            backgroundColor={"#1fbf8f!important"}
            borderRadius="0.25rem"
            border={"0 solid transparent"}
            backgroundClip="border-box"
            display={"flex"}
            flexDirection="column"
            boxShadow={"0 1px 4px rgba(0,0,0,0.4)"}
            position="relative"
          >
            <CardHeader
              padding={"0.75rem 1.25rem"}
              marginBottom="0"
              backgroundColor={"rgba(0,0,0,0.03)"}
              borderBottom="0 solid transparent"
            >
              <Heading
                size="md"
                fontFamily={"oswald,sans-serif"}
                fontSize="48px"
                fontWeight={"700"}
                color="#fff"
                lineHeight={"45px"}
                paddingTop="20px"
                letterSpacing={"-.8px"}
                textAlign="center"
                marginBottom={"0.75rem"}
              >
                0.0000 HIVE
              </Heading>
            </CardHeader>
            <CardBody textAlign={"center"} backgroundColor="#fff !important">
              <Text fontWeight={"bolder"}>Available HIVE balance</Text>
            </CardBody>
          </Card>
        </Box>

        <Card
          backgroundColor={"#161fc8!important"}
          borderRadius="0.25rem"
          border={"0 solid transparent"}
          backgroundClip="border-box"
          display={"flex"}
          flexDirection="column"
          boxShadow={"0 1px 4px rgba(0,0,0,0.4)"}
          position="relative"
        >
          <CardHeader
            padding={"0.75rem 1.25rem"}
            marginBottom="0"
            backgroundColor={"rgba(0,0,0,0.03)"}
            borderBottom="0 solid transparent"
          >
            <Heading
              size="md"
              fontFamily={"oswald,sans-serif"}
              fontSize="48px"
              fontWeight={"700"}
              color="#fff"
              lineHeight={"45px"}
              paddingTop="20px"
              letterSpacing={"-.8px"}
              textAlign="center"
              marginBottom={"0.75rem"}
            ></Heading>
          </CardHeader>
          <CardBody textAlign={"center"} backgroundColor="#fff !important">
            <Text fontWeight={"bolder"}>Available HBD Balance</Text>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default Earnings;
