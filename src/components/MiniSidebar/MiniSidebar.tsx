import React from "react";
import { Flex, VStack, Text, Image, useColorModeValue, useColorMode, Icon} from "@chakra-ui/react";
import Link from "next/link";
//importing the data
import {NAVIGATION} from "../../components/data/NavigationData" 
import { bgcolor } from "@mui/system";

type Props = {};

const MiniSidebar = (props: Props) => {
    const bgColor = useColorModeValue("gray.100", "gray.800");
    const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      justifyContent={"center"}
      height={"424"}
      w={16}
      position={"absolute"}
      left={0}
      top={64}
      mt={12}
      backgroundColor={colorMode === "dark" ? "gray.600" : "gray.300"}
      borderRadius={"xl"}
    >
      <VStack spacing={8} mt={8}>
        {NAVIGATION.map((item, index) => (
         <Link key={index} href={`${item.route!}`}>
         <Icon 
         width={"24px"}
         height={"24px"}
         as={item.icon}
         color={colorMode === "dark" ? "white": "black"}
         />
       </Link>       
        ))}
      </VStack>
    </Flex>
  );
};

export default MiniSidebar;
