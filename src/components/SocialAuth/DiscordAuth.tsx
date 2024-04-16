import { Button, Text } from "@chakra-ui/react";
import React from "react";
import { BsDiscord } from "react-icons/bs";

const DiscordAuth = ({ discordLogin, label }: any) => {
  return (
    <Button
      id="auth_btn"
      width={"100%"}
      variant={"outline"}
      colorScheme="gray"
      onClick={() => discordLogin()}
    >
      <BsDiscord size={"20px"} />{" "}
      <Text marginLeft={"10px"} marginBottom="0px">
        {label}
      </Text>
    </Button>
  );
};

export default DiscordAuth;
