import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import Image, { ImageLoader } from "next/image";

//TODO: to specify the type
type Props = {
  colorMode: string;
  item: any;
  setCardData: any;
};

const CommunityChip = (props: Props) => {
  //function for betterment of the reload
  const handleLoader: ImageLoader = ({ src, width, quality }) => {
    const finalUrl = `https://images.hive.blog/u/${props.item.name}/avatar?size=icon&w=${width}&q=${quality || 75}`;
    return finalUrl
  };
  return (
    <Flex
      w={"full"}
      p={2}
      boxShadow={`0.5px 0.5px 0.5px 0.5px ${
        props.colorMode === "dark" ? "#3f444e" : "black"
      }`}
      _hover={{ backgroundColor: "#1a202c" }}
      _active={{ backgroundColor: "#1a202c" }}
      cursor="pointer"
      onClick={() => props.setCardData(props.item)}
    >
      <Image
        alt="hive blog"
        width={"35px"}
        height={"22px"}
        loader={handleLoader}
        src={
          "https://images.hive.blog/u/" + props.item.name + "/avatar?size=icon"
        }
      />
      <Flex
        px={8}
        w={"full"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Flex>
          <Text>{props.item.title}</Text>
        </Flex>
        <Flex>
          <Text>{`id: ${props.item.id}`}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CommunityChip;
