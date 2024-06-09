import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

type Props = {
    username: string;
}
const Name = (props: Props) => {
  const router = useRouter();
  const redirectUserPage = () => {
    router.push("/user")
  }
  return (
    <Flex>
      <Text cursor={'pointer'} onClick={() => redirectUserPage()}  fontWeight={"bold"} >
        {props.username}
      </Text>
    </Flex>
  );
};

export default Name;
