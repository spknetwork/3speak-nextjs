import React from "react";
import { Flex, VStack, Text, Image } from "@chakra-ui/react";
import Link from "next/link";

//importing the data
import { MiniNavigationData } from "../../components/data/NavigationData";

type Props = {};

const MiniSidebar = (props: Props) => {
  return (
    <Flex
      justifyContent={"center"}
      h={96}
      w={16}
      position={"absolute"}
      left={0}
      top={64}
      backgroundColor={"gray.200"}
      borderRadius={"xl"}
    >
      <VStack spacing={4} m={2}>
        {MiniNavigationData.map((item) => (
          <Text key={"item"}>
            <Link href="/">
              <Image src={item.img} alt={"icon"} cursor={"pointer"} />
            </Link>
          </Text>
        ))}
      </VStack>
    </Flex>
  );
};

export default MiniSidebar;
