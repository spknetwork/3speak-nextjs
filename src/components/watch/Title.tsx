import { Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  bgColor: string,
  colorMode: string
}

const Title = (props:Props) => {
  return (
    <Text
      fontSize={"20px"}
      color={props.colorMode==="dark"? "white": "dark"}
      fontWeight={"500"}
      textTransform="initial"
      marginTop={"0.5rem"}
      lineHeight={"38px"}
    >
      (Esp/Eng) ¡Mis Tres hábitos para un día feliz!
    </Text>
  );
};

export default Title;
