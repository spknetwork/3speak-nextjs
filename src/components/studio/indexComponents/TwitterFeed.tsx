import React from "react";
import {
  Box,
  Card,
  CardHeader,
  Heading,
  CardBody,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

type Props = {};

const TwitterFeed = (props: Props) => {
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.100");

  return (
    <Box>
      <Card>
        <CardHeader
          padding={"0.75rem 1.25rem"}
          bgColor={colorMode === "dark" ? "#222731" : "gray.50"}
          borderBottom={"1px solid #e3e6f0"}
          paddingTop="1rem !important"
          paddingBottom={"1rem !important"}
          borderRadius="calc(0.35rem - 1px) calc(0.35rem - 1px) 0 0"
        >
          <Heading
            size="md"
            color={"#4e73df !important"}
            fontWeight="700 !important"
            fontSize={"1.2rem"}
            lineHeight="1.2"
          >
            Twitter Feed
          </Heading>
        </CardHeader>

        <CardBody
          flex={"1 1 auto"}
          padding="1.25rem"
          bgColor={colorMode === "dark" ? "#222731" : "gray.50"}
        ></CardBody>
      </Card>
    </Box>
  );
};

export default TwitterFeed;
