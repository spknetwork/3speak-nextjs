import { Text, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  username: string;
};
const Name = (props: Props) => {
  const router = useRouter();
  const redirectUserPage = () => {
    router.push("/user");
  };
  return (
    <Text cursor={"pointer"} fontSize={"12px"} fontWeight={"bold"} onClick={() => redirectUserPage()}>
      {props.username}
    </Text>
  );
};

export default Name;
