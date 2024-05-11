import { Box, Text } from "@chakra-ui/react";
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
    <div>
      <Text cursor={'pointer'} onClick={() => redirectUserPage()} margin={'1px'} fontWeight={"bold"} >
        {props.username}
      </Text>
    </div>
  );
};

export default Name;
