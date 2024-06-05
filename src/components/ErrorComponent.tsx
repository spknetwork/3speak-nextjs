import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import Image from "next/image";

type Props = {
    errorMsg: string
};

const ErrorComponent = (props: Props) => {
  return (
    <Flex w="full" h="96vh" justifyContent={"center"} alignItems="center" position="relative">
      <Box>
        <Image src="/error.png" width={600} height={400} alt="error_image" />
      </Box>
      <Flex position="absolute" top={"80%"} left="40%">
      <Text fontSize={"2xl"} fontWeight="bold" color={"red"} >
        { props.errorMsg || "Error Occurred! Please visit another page."}
      </Text>
      </Flex>
    </Flex>
  );
};

export default ErrorComponent;
