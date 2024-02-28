import React from "react";
import { Flex, VStack, Text, Image, useColorModeValue, useColorMode} from "@chakra-ui/react";
import Link from "next/link";
//importing the data
import { MiniNavigationData } from "../../components/data/NavigationData";
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
      <VStack spacing={8}>
        {MiniNavigationData.map((item, index) => (
         <Link key={index} href={`${item.route!}`}>
         <Image 
           src={colorMode === "dark" ? item.img_light : item.img} 
           alt={"icon"} 
           cursor={"pointer"} 
           width="24px" 
           height="24px"
         />
       </Link>       
        ))}
      </VStack>
    </Flex>
  );
};

export default MiniSidebar;
