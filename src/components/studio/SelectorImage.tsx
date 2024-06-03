import React from "react";

import { Flex, Image } from "@chakra-ui/react";

export function SelectorImage({src, selected, select}: {src: string; selected: boolean; select: () => void}) {
  return (
    <Flex
      onClick={select}
      minWidth={"150px"}
      marginX={{
        base: "0px",
        md: "0px",
        lg: "10px",
      }}
      height="100%"
      paddingY={{
        base: "5px",
        md: "5px",
        lg: "0px",
      }}
      border={
        selected
          ? "2px solid red"
          : undefined
      }
    >
      <Image
        objectFit={"cover"}
        borderRadius={"10px"}
        src={src}
        alt="Thumbnail preview"
      />
    </Flex>
  );
}
