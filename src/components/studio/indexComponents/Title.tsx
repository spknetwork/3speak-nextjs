import React from "react";
import { Flex, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";

type Props = {
    username: string;
};

const Title = (props: Props) => {
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");
  return (
    <Flex
      marginBottom={"1.5rem"}
      justifyContent={"space-between"}
      alignItems="center"
    >
      {/* for title */}
      <Text
        as={"h1"}
        textTransform="capitalize"
        color={colorMode === "dark" ? "white" : "black"}
        fontWeight={"400 !important"}
        lineHeight="1.2"
      >
        Dashboard
      </Text>

      <Text
        as={"h3"}
        textTransform="inherit"
        fontSize={"1.75rem"}
        color={colorMode === "dark" ? "white" : "black"}
        fontWeight={"400"}
        lineHeight="1.2"
      >
        Welcome back {props.username}!
      </Text>
    </Flex>
  );
};

export default Title;
